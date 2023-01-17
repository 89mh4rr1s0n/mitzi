/* eslint-disable import/no-anonymous-default-export */
import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// connect to firebase
const serviceAccount = require('../../mitzi-shop-firebase-adminsdk-hrtwx-b8789e91d3.json')
const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

const endpointSecret = process.env.STRIPE_SIGNING_SECRET

const fulfillOrder = async (session) => {
  console.log('fulfilling order!')
  console.log(`this is the session total: ${session.amount_total}, images: shipping: ${session.total_details.amount_shipping}`)

  return app.firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      console.log(`Success!: order ${session.id} has been added to the DB`)
    }).end()
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString()
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`).end()
    }

    // handle checkout session completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // fulfill the order -- push the event to the firebase database
      return fulfillOrder(session)
      .then(() => res.status(200))
      .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}