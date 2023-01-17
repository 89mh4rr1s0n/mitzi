const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body

  const transformedItems = items.map(item => ({
    price_data: {
      currency: 'gbp',
      unit_amount: (item.price * 100),
      product_data: {
        description: item.description,
        name: item.title,
        images: [item.thumbnail]
      }
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 299, currency: 'gbp' },
          display_name: 'standard shipping',
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
    cancel_url: `${process.env.HOST}/cart`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.thumbnail))
    }
  })

  res.status(200).json({
    id: session.id
  })
}