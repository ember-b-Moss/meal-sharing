const express = require("express");
const router = express.Router();
const knex = require("../database");


//GET api/meals/ query parameters
router.get("/", async (req, res) => {
  try {
    let result;
    let maxPrice = req.query.maxPrice;
    let maxPriceParse = parseInt(maxPrice);
    const availableReservations = req.query.availableReservations;
    let someTitle = req.query.title;
    let createdAfter = req.query.createdAfter;
    let limit = req.query.limit;

    if (maxPrice) {
      // api/meals?maxPrice=90
      result = await knex("meal").where("price", "<", maxPriceParse).select();
      
    } else if (availableReservations) {
      //api/meals?availableReservations=true
      result = await knex
        .from("meal")        
        .leftJoin("reservation", { "meal.id": "reservation.meal_id" })
        .groupBy("meal.id")        
        .having(knex.raw('meal.max_reservation > coalesce(sum(reservation.number_of_guests), 0)'))
        .select("meal.*");

    } else if (someTitle) {
      //api/meals?title=per
      result = await knex("meal")
        .where("title", "like", `%${someTitle}%`)
        .select();
    } else if (createdAfter) {
      // api/meals?createdAfter=2019-04-05
      result = await knex("meal")
        .where("created_date", ">", createdAfter)
        .select();
    } else if (limit) {
      //api/meals?limit=4
      let limitParse = parseInt(limit);
      result = await knex("meal").limit(limitParse).select();
    } else {
      // api/meals/	GET	Returns all meals	GET api/meals
      result = await knex("meal").select();
    }

    res.json(result);
  } catch (error) {
    response.status(500).send(`error occured-${error.message}`);
  }
});

router.post("/", async (request, response) => {
  try {
    //console.log(request.body);
    request.body.created_date = new Date();
    const newMeal = await knex("meal").insert(request.body);
    response.json(newMeal);
  } catch (error) {
    response.status(500).send(`error occured-${error.message}`)
    
  }
});

 //api/meals/{id}	GET	Returns meal by id	GET api/meals/2
 router.get("/:id", async (request, response) => {
  try {
    //console.log(request.params.id)
    const mealById = await knex('meal')
      .select()
      .where({ id: request.params.id})
      if (mealById.length == 0) {
        response.status(404).send(`Meal with the corresponding id is not found`)
      } 
      response.json(mealById[0])
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
}); 

//api/meals/{id}	PUT	Updates the meal by id	PUT api/meals/2
router.put("/:id", async (request, response) => {
  try {
    console.log(request.body.id)
    const updatedMeal = await knex('meal')
      .where({ id: request.params.id})
      .update(request.body)
      if (updatedMeal.length == 0) {
        response.status(404).send("Meal with the corresponding id is not found")
      } 
      response.json(updatedMeal)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

//api/meals/{id}	DELETE	Deletes the meal by id	DELETE meals/2
router.delete("/:id", async (request, response) => {
  try {
    console.log(request.body.id)
    const deleteMeal = await knex('meal')
      .where({ id: request.params.id})
      .del()
      if (deleteMeal.length == 0) {
        response.status(404).send("Meal with the corresponding id is not found")
      } 
      response.json(deleteMeal)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

module.exports = router;


