const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
 .then(() => {
    return firstRecipe = Recipe.create({
    title: "Ciorba de perisoare",
    level: 'Easy Peasy',
    ingredients: [
      "2-3 beef bones",
      "4 L water + 2 tsp salt",
      "2-3 carrots",
      "1-2 parsley roots",
      "1 parsnip root",
      "1 slice celery root",
      "2 tbsp oil",
      "1 large onion",
      "½ of red bell pepper",
      "500 ml tomato broth or 3-4 fresh tomatoes",
      "diced chickpeas",
      "1 teaspoon dried thyme",
      "salt",
      "500 g ground meat",
      "50 g rice",
      "1 small chopped onion",
      "1 tablespoon oil",
      "salt, freshly ground pepper",
      "chopped parsley, dill, lovage, chervil",
      "1 teaspoon dried thyme",
      "1 egg white, raw",
      "300 g of sour cream for thickening the soup",
      "2-3 fresh egg yolks (raw)",
      "lemon juice and borș",
      "a handful of greens (parsley and dill leaves)"
      ],
    cuisine: "Romanian",
    dishType: "soup",
    image: "http://lh3.ggpht.com/_JSSqn84FcT0/TU0cfAANRQI/AAAAAAAAKuI/7pS_XIpXkII/s1600-h/ciorba-de-perisoare-123.jpg",
    duration: 100,
    creator: "some unknown grandma ages ago",
    created: new Date()
    })
  })
  .then((firstRecipe) => console.log("First recipe created:", firstRecipe.title))
  .then(() => {
    return Recipe
      .insertMany(data)
      .then((data) => data.forEach((recipe) => console.log("Recipe added:", recipe.title)))
      .catch((error) => console.log("Something went wrong", error));
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  .then(() => {
    console.log("The duration of the recipe 'Rigatoni alla Genovese' was updated to 100.");
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  .then(() => {
    console.log("The recipe 'Carrot cake' was deleted.");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Something went wrong", error)
  })
