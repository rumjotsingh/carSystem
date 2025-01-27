const cars = [
  {
    engine: "V8",
    company: "Ford",
    color: "Red",
    mileage: 12,
    image: {
      url: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Ford/Endeavour/11580/1710203310359/front-left-side-47.jpg",
      filename: "carListing",
    },

    price: 5000000,
    description: "This is a Ford Endeavour",
  },
  {
    engine: "Electric",
    company: "Tesla",
    color: "White",
    mileage: 800,
    image: {
      url: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Cybertruck/7236/1574859399554/front-left-side-47.jpg",
      filename: "carListing",
    },

    price: 75000000,
    description: "This is a Tesla Cybertruck",
  },
];
export default { data: cars };
