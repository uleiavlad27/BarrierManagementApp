const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, registerAdmin, loginAdmin, verifyUser, showCars, addCar, deleteCar, showLogs } = require('../controllers/authController')



//middleware
router.use(
    cors({
        credentials: true,
        "origin": 'http://localhost:3000'
    })
)

router.get('/', test)
router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

router.get('/main', verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: "Success"});
})


router.get('/cars', showCars)
router.post('/cars', addCar)
router.delete('/cars/:license_plate', deleteCar)

router.get('/logs', showLogs)

module.exports = router