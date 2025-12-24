// const Restaurant = require("../models/Restaurant");

// // GET ALL / FILTER / RECOMMEND
// exports.getRestaurants = async (req, res) => {
//   try {
//     const { location, cuisine, rating } = req.query;

//     let query = {};

//     if (location) query.location = location;
//     if (cuisine) query.cuisine = cuisine;
//     if (rating) query.rating = { $gte: Number(rating) };

//     const restaurants = await Restaurant.find(query);
//     res.json(restaurants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ADD RESTAURANT (for testing)
// exports.addRestaurant = async (req, res) => {
//   try {
//     const restaurant = new Restaurant(req.body);
//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


const Restaurant = require("../models/Restaurant");

const getRestaurants = async (req, res) => {
  try {
    const { location, cuisine, rating } = req.query;

    let query = {};

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (cuisine) {
      query.cuisine = { $regex: cuisine, $options: "i" };
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET /api/restaurants
const getRestaurant = async (req, res) => {
  const { location, cuisine, rating, search } = req.query;

  let filter = {};

  if (location) filter.location = location;
  if (cuisine) filter.cuisine = cuisine;
  if (rating) filter.rating = { $gte: Number(rating) };
  if (search)
    filter.name = { $regex: search, $options: "i" }; // case-insensitive

  const restaurants = await Restaurant.find(filter);
  res.json(restaurants);
};
const addRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getRestaurants,
   getRestaurant,
  addRestaurant
};
