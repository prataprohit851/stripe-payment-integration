import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Nj9LsSA0m2bOS36mm5z4p1ULdHySLs8cmIMmjugQC2KwF5WyiZTWnTk1jFnKjw6amcVEQaT3BovraImSZsinjyV005labXSht");

export default async function handler(req, res){
  try {
    if(req.method != 'POST') return res.status(400);
    const {email, paymentMethod} = req.body;
    
    //create customer
    const customer = await stripe.customers.create({
      email, 
      payment_method:paymentMethod, 
      invoice_settings:{default_payment_method:paymentMethod}
    })

    //product
    //create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items:[{
        price: "price_1Nj9V2SA0m2bOS36RpFE5ZC2"
      }],
      payment_settings:{
        payment_method_options:['card'],
        save_default_payment_method: "on_subscription"
      },
      expand: ['latest_invoice.payment_intent']
    })
    //send back client secret
    res.json({
      message: "subscription successfull",
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({message : "Internal server error"});
  }
}