const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const SALT_ROUNDS = 10;

const {
	createAdmin,
	getAllAdmins,
	getAdminbyUsername
} = require("../db/helpers/admins");

// GET - /api/admins - get all admins
router.get("/", async (req, res, next) => {
	try {
		const admins = await getAllAdmins();
		res.send(admins);
	} catch (error) {
		console.log("error from router get", error);
		next(error);
	}
});

// POST - /api/admins/register - create a new admin
router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const admin = await createAdmin({ username, password: hashedPassword });
		delete admin.password;

		const token = jwt.sign(admin, JWT_SECRET);

		res.cookie("token", token, {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});

		delete admin.password;
		res.send({ token, admin });

	} catch (error) {
		next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const admin = await getAdminbyUsername(username);
		const validPassword = await bcrypt.compare(password, admin.password);
		if (validPassword) {
			const token = jwt.sign(admin, JWT_SECRET);

			res.cookie("token", token, {
				sameSite: "strict",
				httpOnly: true,
				signed: true
			});
			delete admin.password;
			res.send({ token, admin });
		}
	} catch (error) {
		throw new Error(`failed to login: ${error.message}`)
	}
});

router.post("/logout", async (req, res, next) => {
	try {
		res.clearCookie("token", {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
		res.send({
			loggedIn: false,
			message: "Logged Out",
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;