const express = require("express");
const {
  signupPost,
  logInPost,
  chessPlayerTop,
  ratingHistory,
  postData,
  CsvData,
} = require("../AllPart/data");
const router = express.Router();

/**
 * @swagger
 * /top-players:
 *   get:
 *     summary: Retrieves a list of the top 50 classical chess players
 *     description: Retrieves a list of the top 50 classical chess players
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   perfs:
 *                     type: object
 *                     properties:
 *                       classical:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: number
 *                           progress:
 *                             type: number
 *                   patron:
 *                     type: boolean
 *                   rating_history:
 *                     type: array
 *                     items:
 *                       type: array
 *                       items:
 *                         type: number
 */

/**
 * @swagger
 * /player/{username}/rating-history:
 *   get:
 *     summary: Retrieves the rating history of a specific player
 *     description: Retrieves the rating history of a specific player identified by their username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the player whose rating history is to be retrieved
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 perfs:
 *                   type: object
 *                   properties:
 *                     classical:
 *                       type: object
 *                       properties:
 *                         rating:
 *                           type: number
 *                         progress:
 *                           type: number
 *                 patron:
 *                   type: boolean
 *                 rating_history:
 *                   type: array
 *                   items:
 *                     type: array
 *                     items:
 *                       type: number
 */

/**
 * @swagger
 * /players/rating-history-csv:
 *   get:
 *     summary: Retrieves the rating history of players in CSV format
 *     description: Retrieves the rating history of players in CSV format
 *     responses:
 *       '200':
 *         description: Successful operation. Returns the rating history of players in CSV format.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               example: "id,username,perfs,patron,rating_history\n123,user1,{\"classical\":{\"rating\":1500,\"progress\":50}},true,[[1500,1510,1520],[1530,1540,1550]]\n456,user2,{\"classical\":{\"rating\":1600,\"progress\":60}},false,[[1600,1610,1620],[1630,1640,1650]]\n"
 */

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new player entry
 *     description: Create a new player entry with the specified details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               username:
 *                 type: string
 *               perfs:
 *                 type: object
 *                 properties:
 *                   classical:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                         required: true
 *                       progress:
 *                         type: number
 *               patron:
 *                 type: boolean
 *               rating_history:
 *                 type: array
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *     responses:
 *       '200':
 *         description: Player entry created successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the user (YYYY-MM-DD)
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request. Invalid input data.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and password
 *     description: Login with the provided email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized. Invalid email or password.
 */



router.get("/", (req, res) => {
  res.send("get data done");
});



router.post("/signup", signupPost);
router.post("/login", logInPost);
router.get("/top-players", chessPlayerTop);
router.get("/player/:username/rating-history", ratingHistory);
router.post("/post", postData);
router.get("/players/rating-history-csv", CsvData);

module.exports = { router };
