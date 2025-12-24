// const express = require("express");
// const router = express.Router();

// const {
//   getRestaurants,
//   addRestaurant
// } = require("../controllers/restaurantController");

// // GET recommended restaurants
// router.get("/", getRestaurants);

// // ADD restaurant
// router.post("/", addRestaurant);
// // Get all restaurants
// router.get("/", async (req, res) => {
//   const restaurants = await Restaurant.find();
//   res.json(restaurants);
// });

// // Get single restaurant by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.id);

//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     res.json(restaurant);
//   } catch (error) {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// });

// module.exports = router;







const express = require("express");
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

const router = express.Router();
const {
  getRestaurants,
  addRestaurant
} = require("../controllers/restaurantController");

// GET recommended restaurants
router.get("/", getRestaurants);

// ADD restaurant
router.post("/", addRestaurant);
// Get all restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

// Get single restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log("RAW ID RECEIVED ->", id);
  console.log("ID LENGTH ->", id.length);
  console.log(
    "IS VALID ObjectId ->",
    mongoose.Types.ObjectId.isValid(id)
  );

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.json(restaurant);
});


module.exports = router;
