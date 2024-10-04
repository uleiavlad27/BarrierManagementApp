const express = require('express') 
const dotenv = require('dotenv').config()
const cors = require('cors')
const db = require('mysql2')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
