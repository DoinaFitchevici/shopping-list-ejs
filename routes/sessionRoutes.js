const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  logonShow,
  registerShow,
  registerDo,
  logoff,
} = require("../controllers/sessionController");

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: API to manage user sessions.
 */

/**
 * @swagger
 * /sessions/register:
 *   get:
 *     summary: Show the registration form
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: The registration form.
 */
router.route("/register").get(registerShow);

/**
 * @swagger
 * /sessions/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully registered.
 *       400:
 *         description: Bad request.
 */
router.route("/register").post(registerDo);

/**
 * @swagger
 * /sessions/logon:
 *   get:
 *     summary: Show the logon form
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: The logon form.
 */
router.route("/logon").get(logonShow);

/**
 * @swagger
 * /sessions/logon:
 *   post:
 *     summary: Logon a user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged on.
 *       401:
 *         description: Unauthorized.
 */
router.route("/logon").post(
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sessions/logon",
    failureFlash: true,
  })
);

/**
 * @swagger
 * /sessions/logoff:
 *   post:
 *     summary: Logoff a user
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: The user was successfully logged off.
 */
router.route("/logoff").post(logoff);

module.exports = router;
