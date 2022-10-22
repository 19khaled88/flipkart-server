const slugify = require('slugify')
const Cart = require('../models/cart')

exports.addToCart = async (req, res) => {
  try {
    Cart.find({ user: req.user.id }).exec((error, cart) => {
      if (error) return res.status(400).json({ error })
      if (cart.length > 0) {
        const product = req.body.cartItems.product
        const arrayToObj = cart.find((items) => items)

        const isAdded = arrayToObj.cartItems.find(
          (item) => item.product == product,
        )

        if (isAdded) {
          Cart.findOneAndUpdate(
            {
              user: req.user.id,
              'cartItems.product': product,
            },
            {
              $set: {
                'cartItems.$': {
                  ...req.body.cartItems,
                  quantity: isAdded.quantity + req.body.cartItems.quantity,
                },
              },
            },
            {
              returnOriginal: false,
            },
          ).exec((error, cart) => {
            if (error) res.status(400).json({ error })
            if (cart) {
              return res.status(200).json({ cart })
            }
          })
        } else {
          Cart.findOneAndUpdate(
            { user: req.user.id },
            {
              $push: {
                cartItems: req.body.cartItems,
              },
            },
          ).exec((error, _cart) => {
            if (error) return res.status(400).json({ error })
            if (_cart) {
              return res.status(200).json({ _cart })
            }
          })
        }
      } else {
        const cart = new Cart({
          user: req.user.id,
          cartItems: req.body.cartItems,
        })
        cart.save((error, cart) => {
          if (error) return res.status(400).json({ error })
          if (cart) {
            return res.status(200).json({ cart })
          }
        })
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error,
    })
  }
}
