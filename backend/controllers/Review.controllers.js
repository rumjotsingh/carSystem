import mongoose from "mongoose";
import Review from "../models/review.js";
import CarsModel from "../models/carListing.js";

export const AddReviewsController = async (req, res) => {
  try {
    const { comment, rating, carListingId } = req.body;
    const userId = req.user.userId;

    if (!comment || !rating || !carListingId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(carListingId)) {
      return res.status(400).json({ message: "Invalid Car Listing ID." });
    }

    const carListing = await CarsModel.findById(carListingId).select("_id").lean();
    if (!carListing) {
      return res.status(404).json({ message: "Car listing not found." });
    }

    const newReview = await new Review({
      comment,
      rating,
      createdAt: new Date(),
      author: userId,
      car: carListingId,
    }).save();

    // Atomic push review ID into car's reviews
    await CarsModel.updateOne(
      { _id: carListingId },
      { $push: { reviews: newReview._id } }
    );

    res.status(200).json({ success: true, newReview, message: "Review Successfully Added." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { carId } = req.body;
    const userId = req.user.userId;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(reviewId) || !mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid ID(s) provided." });
    }

    const review = await Review.findById(reviewId).select("author").lean();
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (review.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this review." });
    }

    // Atomic delete & pull review from car
    await Promise.all([
      Review.deleteOne({ _id: reviewId }),
      CarsModel.updateOne({ _id: carId }, { $pull: { reviews: reviewId } }),
    ]);

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getCarDetails = async (req, res) => {
  try {
    const { carId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid Car ID." });
    }

    const car = await CarsModel.findById(carId)
      .populate({
        path: "reviews",
        select: "comment rating createdAt",
        populate: { path: "author", select: "name email" },
      })
      .lean();

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Error retrieving car details:", error);
    res.status(500).json({ message: "Failed to retrieve car details." });
  }
};
