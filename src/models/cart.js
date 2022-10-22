const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const cartSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: 'User', required: true },
    cartItems: [
      {
        product: { type: ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
