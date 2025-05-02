const express = require("express");
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

router.post("/",(req, res) => {
    res.status(200).send("Creating a user!!");
})

//Route 1 : Endpoint to create a user
//(link, validationArray, callback) -> using the express validator
router.post("/createUser", [ body("name", "Minimum length of the name field is 3.").isLength({min: 3}), body("email", "Enter a valid email").isEmail(), body("password", "Minimum length of the password field is 5").isLength({min: 5}) ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) res.status(400).json(errors);
    else {
        /* 
        METHOD 1 :
        const data = await User.create(req.body);
        data.save();
        res.status(200).json(data); 
        
        METHOD 2 :
        */
       if(! ( await User.findOne({email : req.body.email} ))) {
        //Hashing password along with adding salt, using bcryptjs.
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        //Creating a user using the User schema and saving it to the DB.
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        .then((val) => {
            //val.save();  //Data gets automatically saved.
            res.status(200).json({success: true, value: val});
        })
        .catch((err) => {
            res.status(500).json({success: false, error: "Internal server error"});
        })
    }
    else res.status(400).json({success: false, error: "Email already exists!"});
    }
})

//Route 2 : Endpoint to login a user
router.post("/login",async (req, res) => {
    if(await User.findOne({email: req.body.email})) {
        const user = await User.findOne({email: req.body.email});
        //Checking if the hash of the entered password matches the hashed password, stored in DB.
        if(bcrypt.compareSync(req.body.password, user.password)) {
            //payload
            const data = {
                id: user.id
            }
            //Creating a unique authentication token for the user using ID field.
            const authToken = jwt.sign(data, process.env.JWT_SECRET); //jwt.sign(payload, secret, options)
            //
            res.status(200).json({success: true, token: authToken});
        }
        else res.status(400).json({success: false, error: "Incorrect credentials!"});
    }
    else res.status(400).json({success: false, error: "Incorrect credentials!"});
});

//Route 3 : Endpoint to fetch a user
router.get("/getUser", fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Internal server error!", error: error});
    }
})

module.exports = router;