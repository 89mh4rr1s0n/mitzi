const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body

  // console.log(items)
  // console.log(email)

  const transformedItems = items.map(item => ({
    // title: item.title,
    price_data: {
      currency: 'gbp',
      unit_amount: (item.price * 100) /* * item.quantity*/,
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.images[item.images.length -1]]
      }
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // shipping_rates: ['shr_1MHAUcD0KoL8F0sKoHvt6o7D'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 299, currency: 'gbp' },
          display_name: 'standerd shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA']
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      // images: JSON.stringify(items.map((item) => item.images))
    }
  })

  res.status(200).json({
    id: session.id
  })
}