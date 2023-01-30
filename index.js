//external imports
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
const app = express();




// setting port 
const port = process.env.PORT || 5000;

// setting middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



// checking the user is authenticated or not using passport
app.use(passport.initialize())
require('./passport')(passport)


// connect with mongodb 
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6tsru7t.mongodb.net/billing-dashboard?retryWrites=true&w=majority`)
    .then(() => console.log('App Connected'))
    .catch(err => console.log(err));



app.use('/api/users', require('./routers/userRouter'));
app.use('/api', require('./routers/billingRouter'))




// setting initial route 
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our Dashboard'
    })
});


// listening our port
app.listen(port, () => {
    console.log(`Application is listening at : 5000`)
});

