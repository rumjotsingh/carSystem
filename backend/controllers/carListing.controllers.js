import CarsModel from "../models/carListing.js";
import fs from "fs";
import path from "path";
export const GetAllCarsController = async (req, res) => {
  try {
    let cars = await CarsModel.find({})
      .populate("owner")
      .populate({
        path: "reviews",
        populate: { path: "author", select: "name email" },
      });
    return res.status(200).json({ cars });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getSingleCarController = async (req, res) => {
  try {
    let { id } = req.params;
    const car = await CarsModel.findById(id).populate({
      path: "reviews",
      populate: { path: "author", select: "name email" }, // Populate the author details
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    } else {
      return res.status(200).json(car);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const createCarListing = async (req, res) => {
  try {
    const { engine, company, description, color, mileage, price } = req.body;
    const { filename, path } = req.file;
    const id = req.user.userId;
    const errors = [];
    if (!engine || typeof engine !== "string") {
      errors.push("Engine is required and must be a string.");
    }
    if (!company || typeof company !== "string") {
      errors.push("Company is required and must be a string.");
    }
    if (!description || typeof description !== "string") {
      errors.push("Description is required and must be a string.");
    }
    if (!color || typeof color !== "string") {
      errors.push("Color is required and must be a string.");
    }
    if (!mileage || isNaN(mileage) || mileage <= 0) {
      errors.push("Mileage is required and must be a positive number.");
    }
    if (!price || isNaN(price) || price <= 0) {
      errors.push("Price is required and must be a positive number.");
    }
    if (!filename || !path) {
      errors.push("Image file is required.");
    }
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }
    const newCar = new CarsModel({
      engine,
      company,
      description,
      color,
      mileage,
      price,
      image: {
        url: path,
        filename: filename,
      },
      owner: id,
    });
    await newCar.save();
    return res.status(200).json({ newCar });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteCarController = async (req, res) => {
  try {
    const carId = req.params.id;
    const userId = req.user.userId;
    const car = await CarsModel.findById(carId).populate({
      path: "reviews",
      populate: { path: "author", select: "name email" }, // Populate the author details
    });
    if (!car) {
      return res.status(404).json({ message: "Car listing not found" });
    }
    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this car listing",
      });
    }
    await CarsModel.findByIdAndDelete(carId);
    return res
      .status(200)
      .json({ message: "Car listing deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const EditCarController = async (req, res) => {
  try {
    const carId = req.params.id;
    const userId = req.user.userId;
    const car = await CarsModel.findById(carId);
    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this car listing",
      });
    }
    const { engine, company, description, color, mileage, price } = req.body;
    const id = req.user.userId;
    let imageUpdate = {};
    if (req.file) {
      const imageUrl = path.join("uploads", req.file.filename);
      const filename = req.file.filename;
      const imagepath = req.file.path;
      if (car.image && fs.existsSync(car.image.path)) {
        fs.unlinkSync(car.image.path);
      }
      imageUpdate = {
        image: {
          url: imageUrl,
          filename: filename,
        },
      };
    }
    const updatedCar = await CarsModel.findByIdAndUpdate(
      carId,
      {
        ...imageUpdate,
        engine: engine,
        company: company,
        description: description,
        color: color,
        mileage: mileage,
        price: price,
        owner: id,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res
      .status(200)
      .json({ message: "Car updated successfully", data: updatedCar });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update car", error: err.message });
  }
};
export const CarSearchController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query cannot be empty" });
    }
    const results = await CarsModel.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
