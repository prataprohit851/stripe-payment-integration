import React from "react";
import { useState } from "react";
import { planExport } from "./Plan";
import Stripe from "stripe";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { json } from "react-router-dom";

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        padding: "5px 10px",
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

function Payment(){
    const stripe = useStripe();
    const elements = useElements();

    var userEmail = "";
    
    const getEmail = async () => {
        var res = await fetch('/email', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const result = await res.json();
        userEmail = result.email
    }

    


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        
        if (!stripe || !elements) {
            return;
        }
        (async () => {
            const response = await fetch('/secret');
            const {client_secret: clientSecret} = await response.json();
                const result = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                    card: elements.getElement(CardElement),
                    }
                });
                if (result.error) {
                    console.log(result.error.message);
                    alert('payment failed');
                  } else {
                    if (result.paymentIntent.status === 'succeeded') {
                      alert('payment successful');

                    }
                  }
          })();
      };

    const createSubscription = async () =>{
        try {
            await getEmail();
            const paymentMethod = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement('card')
            });
            const responce = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    paymentMethod: paymentMethod.id
                })
            });
            if(!responce.ok) return alert('Payment unsuccessful');
            const data = await responce.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret);
            if(confirm.error) return alert('Payment unsuccessful');
            alert('Payment successful'); 
        } catch (error) {
            console.log(error);
            alert("Payment Failed, " + error.message);
        }
    }
    return (
        <div className="pay-box">
            <div className="pay-main-box">
                <div className="pay-first-box">
                    <h2>Complete Payment</h2>
                    <p className="pay-para">Enter your credit or debit card details below</p>

                    <span className="card-element"><CardElement options={CARD_ELEMENT_OPTIONS} /></span>

                    <br />
                    <button className="btn btn-primary payment-btn" onClick={handleSubmit}>Confirm payment</button>
                </div>
                <div className="pay-second-box">
                    <h2 className="pay-second-heading">Order Summary</h2>
                    <table id="table2" cellPadding="50px">
                        <tr  className="bottom-border">
                            <td>Plan Name</td>
                            <td>{planExport.code}</td>
                        </tr>
                        <tr className="bottom-border">
                            <td>Billing Cycle</td>
                            <td>{planExport.duration}</td>
                        </tr>
                        <tr>
                            <td>Plan Price</td>
                            <td>&#8377;{planExport.price}/{(planExport.duration === 'Monthly') ? 'mo' : 'yr'}</td>
                        </tr>
                    </table>
                

                </div>
            </div>
        </div>
    );
}

export default Payment;




