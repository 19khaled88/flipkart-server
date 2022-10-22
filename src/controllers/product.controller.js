const Product = require('../models/product')
const slugify = require('slugify')
exports.createProduct = async (req, res) => {
  try {
    // res.status(200).json({ file: req.files, body: req.body })
    const {
      name,
      price,
      description,
      quantity,
      category,
      offer,
      createdBy,
    } = req.body

    let productPicture = []
    if (req.files.length > 0) {
      productPicture = req.files.map((file) => {
        return { img: file.filename }
      })
    }

    // if(req.file){
    //   console.log(req.file)
    //   product.productPicture.img = process.env.API_LINK + '/public/'+ req.file.filename
    // }

    const product = new Product({
      name: name,
      slug: slugify(name),
      price,
      description,
      productPicture,
      quantity,
      offer,
      category,
      createdBy: req.user.id,
    })

    const savedProduct = await Product.create(product)
    res.status(200).json({
      savedProduct,
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const getProduct = await Product.find({})
    res.status(200).json({
      getProduct,
    })
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}
