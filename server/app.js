require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({extended : true}));



app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, '../client', 'build')));
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});


app.listen(process.env.PORT);


const mongoose = require('mongoose');

async function dbConnect(){

    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true } )
    .then(() => console.log('Connected Successfully'))
    .catch((err) => { console.error(err); });

}
dbConnect();

const RegisterSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    plan:{
        type: String,
        required: true
    }
});

const User = mongoose.model('user', RegisterSchema);

var userEmail = "";
var userPlan = "";

app.post("/register", function(req, res){
    console.log(req.body);
    const data = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        plan: "no-plan"
    })
    
    
    data
    .save()
    .then((result) => {
      userEmail = result.email;
      userPlan = 'no-plan';
      res.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    })
});

app.post("/login", function (req, res){
  console.log(req.body);

    User.findOne({ email: req.body.email })
      .then((user) => {
        console.log(user);
        if(user.password == req.body.password){
            userEmail = user.email;
            userPlan = user.plan;
            return res.status(200).send({
                message: "Login Successful",
                email: user.email,
                plan: user.plan
            });
        }
        else{
          return res.status(401).send({
            message: "Wrong Password"
        });
        }
        })
      .catch((e) => {
        res.status(404).send({
          message: "Email not found",
          e,
        });
    });
});


const lib = require('./PriceCalculator.js');

var userRequestedPlan = {
  "duration": "",
  "code": ""
};

var price = 0;
  
app.post("/plan", function(req, res){

  userRequestedPlan.duration = req.body.duration;
  userRequestedPlan.code = req.body.code;

  price = lib.calculator(userRequestedPlan);
  console.log(price);

  return res.status(200).send({
    message: "Captured",
    price
  });
});

app.post("/payment", function(req, res){
  console.log(req.body.num, req.body.exp, req.body.cvc);
});


app.post('/email', function(req, res){
  console.log(userEmail)
  res.send({
    email: userEmail
  })
});




////////////////////////////

const Stripe = require('stripe');
const { ConnectionClosedEvent } = require('mongodb');
const exp = require("constants");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)


app.get('/secret', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: lib.calculator(userRequestedPlan)*100,
    currency: 'inr',
    payment_method_types: ['card'],
    metadata: {
      integration_check: 'accept_a_payment',
    },
  });
  res.json({client_secret: paymentIntent.client_secret});
});




// app.post('/secret', async (req, res) => {

//   console.log(req.body);

//   const customer = await stripe.customers.create({
//     email: userEmail,
//     description: 'Kastomerrrrr',
//     type: 'card',
//     card: req.body.card
//   });
//   console.log(customer);

//   const paymentMethod = await stripe.paymentMethods.create({
//     type: 'card',
//     paymentMethodType: 'card'
//   });

//   const customer = await stripe.customers.create({
//     email: "prataprohit851@gmail.com",
//     payment_method: paymentMethod.id,
//   });

//   const subscription = await stripe.subscriptions.create({
//     customer: customer.id,
//     items: [
//       {price: 'price_1Nj9V2SA0m2bOS36RpFE5ZC2'},
//     ],
//   });
//   res.status(200).send(json({client_secret: subscription.client_secret}));
// });