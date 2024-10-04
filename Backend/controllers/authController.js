const db = require("../helpers/database");
const { hashPassword, comparePassword } = require("../helpers/auth");
const {bcrypt} = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const { error } = require("console");

const test = (req, res) => {
  res.json("test is working");
};

// REGISTER
const registerAdmin = async (req, res) => {
  try {
    const sql = "INSERT INTO admin (`name`, `phone_nr`,`email`, `password` ) VALUES (?)";
    const { name, phone_nr, email, password } = req.body;
    //Check if name was entered
    if (!name) {
      return res.json({
        Error: "Name Required",
      });
    }
    if(!phone_nr){
      return res.json({
        Error: "Phone Number Required and should have 10 digits"
      })
    }
    if(!email){
      res.json({
        Error: "Email Required"
      })
    }
    if (!password || password.length <= 6) {
      return res.json({
        Error: "Password is required and should be at least 6 characters long",
      });
    }
    const hashedPassword = await hashPassword(req.body.password);
    const values = [req.body.name, req.body.phone_nr, req.body.email, hashedPassword, ];

    console.log(values); // Check if email, password, name are correct

    db.query(sql, [values], (err, result) => {
      if (err) return res.json(err);
      console.log("success");
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIN

const loginAdmin = async (req, res) => {
  try {
    const sql = "SELECT * FROM admin WHERE email = ? ";
    db.query(sql, [req.body.email], async (err, data) => {
      if (err) {console.log(err);
        return res.json({ Error: "Login Error" });}
      if (data.length > 0){
        const match = await comparePassword (req.body.password, data[0].password)
        if(match){
            const email = data[0].email;
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'})
            res.cookie("token", token)
            return res.json({Status: "Success"})
        } else {
            res.json('passwords do not match')
        }
      } else {
        return res.json({Error: "Email address does not exist"})
      }
    });
  } catch (error) {
    console.error(error);
  res.status(500).json({ Error: "An error occurred during login." });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        
        return res.json({ Error: "Token is not correct" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};





//CARS

const showCars = (req, res) => {
  const sql = "SELECT * FROM cars ORDER BY license_plate"
  db.query(sql, (err, results) => {
        if (err) return res.json({ Error: err.message });
        return res.json(results);
    });
}

const licensePlatePattern = /^(?:[A-Z]{2}\d{2}[A-Z]{3}|B\d{2,3}[A-Z]{3})$/;


function isValidLicensePlate(plate) {
    return licensePlatePattern.test(plate);
}


//ADD
const addCar = (req, res) => {
  try{
  const sql = "INSERT INTO cars(`license_plate` , `nr_pass`) VALUES(?)"
  const nr_pass = crypto.randomInt(10000, 100000)
  console.log(nr_pass);
  const  {license_plate} = req.body;
  if (!isValidLicensePlate(license_plate)) {
      return res.status(400).json({ error: "License Plate is not valid" });
    }
  const values = [license_plate, nr_pass]
  console.log(values);
  db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.json(err);}
      return res.json({ Status: "Success" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
}




//DELETE

const deleteCar = (req, res) => {
  try{
    const sql = "DELETE FROM cars WHERE license_plate = ?"
    const license_plate = req.params.license_plate;
    console.log(license_plate);
    const values = [license_plate]
    db.query(sql, values, (err, result) => {
      if(err){
        return res.json(err)
      }
      return res.json({Status: "Success"})
    })
  } catch( err ){
    console.log(err);
    res.status(500).json({Error: "Server Error: " + err.message })
  }
}

//LOGS

const showLogs = (req, res) => {
  const sql = "SELECT * FROM logs"
  db.query(sql, (err, result) => {
    if(err){
      return res.status(400).json({ error: "Error in Query"})
    }else{
      return res.json(result)
      return res.json({Status: "Success"})
    }
  })
}


module.exports = {
  test,
  registerAdmin,
  loginAdmin,
  verifyUser,
  showCars,
  addCar,
  deleteCar,
  showLogs
};
