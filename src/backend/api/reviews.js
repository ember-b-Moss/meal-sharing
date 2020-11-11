const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const reviews = await knex("review")
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    //console.log(request.body);
    request.body.created_date = new Date();
    const newReview = await knex("review").insert(request.body);
    response.json(newReview);
  } catch (error) {
    response.status(500).send(`error occured-${error.message}`)
  }
});

router.get("/:id", async (request, response) => {
  try {
    //console.log(request.params.id)
    const reviewById = await knex('review')
      .select()
      .where({ id: request.params.id})
      if (reviewById.length == 0) {
        response.status(404).send(`Review with the corresponding id is not found`)
      } 
      response.json(reviewById[0])
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

router.put("/:id", async (request, response) => {
  try {
    //console.log(request.body.id)
    const updatedReview = await knex('review')
      .where({ id: request.params.id})
      .update(request.body)
      if (updatedReview.length == 0) {
        response.status(404).send("Review with the corresponding id is not found")
      } 
      response.json(updatedReview)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

router.delete("/:id", async (request, response) => {
  try {
    //console.log(request.body.id)
    const deleteReview = await knex('review')
      .where({ id: request.params.id})
      .del()
      if (deleteReview.length == 0) {
        response.status(404).send("Review with the corresponding id is not found")
      } 
      response.json(deleteReview)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

module.exports = router;
