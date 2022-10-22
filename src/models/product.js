const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: { type: String },
    productPicture: [{ img: { type: String } }],
    reviews: [
      {
        userId: { type: ObjectId, ref: 'User' },
        review: String,
      },
    ],
    category: { type: ObjectId, ref: 'Category' },
    createdBy: { type: ObjectId, ref: 'User' },
    updatedAt: Date,
  },
  { timestamps: true },
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
