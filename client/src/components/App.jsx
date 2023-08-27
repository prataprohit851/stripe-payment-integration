import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Plan from "./Plan";
import Payment from "./Payment";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


require("dotenv").config();

const stripePromise = loadStripe("pk_test_51Nj9LsSA0m2bOS36gMLlZ2BFMEggG27kFx0jpekblhU4AJI3VbhMFs4BtKTyxIwY8nn88YXrNZKo49685AxX0nx700cofhVaMJ");

function App(){
    return (
      <Router>
          <Routes>

            <Route path="/" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/plan" element={<Plan />} />

            <Route path="/payment" element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>} />

          </Routes>
        </Router>
    );
}

export default App; 