const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation")
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    //console.log(request.body);
    request.body.created_date = new Date();
    const newReservation = await knex("reservation").insert(request.body);
    response.json(newReservation);
  } catch (error) {
    response.status(500).send(`error occured-${error.message}`)
  }
});

router.get("/:id", async (request, response) => {
  try {
    //console.log(request.params.id)
    const reservationById = await knex('reservation')
      .select()
      .where({ id: request.params.id})
      if (reservationById.length == 0) {
        response.status(404).send(`Reservation with the corresponding id is not found`)
      } 
      response.json(reservationById[0])
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

router.put("/:id", async (request, response) => {
  try {
    //console.log(request.body.id)
    const updatedReservation = await knex('reservation')
      .where({ id: request.params.id})
      .update(request.body)
      if (updatedReservation.length == 0) {
        response.status(404).send("Reservation with the corresponding id is not found")
      } 
      response.json(updatedReservation)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

router.delete("/:id", async (request, response) => {
  try {
    //console.log(request.body.id)
    const deleteReservation = await knex('reservation')
      .where({ id: request.params.id})
      .del()
      if (deleteReservation.length == 0) {
        response.status(404).send("Reservation with the corresponding id is not found")
      } 
      response.json(deleteReservation)
  } catch (error) {
    response.status(400).send(`Bad request, ${id} is not a number`)
  }
});

module.exports = router;

