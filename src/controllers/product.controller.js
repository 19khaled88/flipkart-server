const Product = require('../models/product')
const Category = require('../models/category')
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
    const getProduct = await Product.find({}).select('name price quantity')
    res.status(200).json({
      getProduct,
    })
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}

exports.getProductDetails = async (req, res) => {
  try {
    const data = await Product.find({}).populate('category')
    res.status(200).json({
      data,
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

exports.getBySlug = async (req, res) => {
  const { slug } = req.params
  
   Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) return res.status(400).json({ error })
      if (category) {
       Product.find({ category: category._id }).exec((error, products) => {
        if (error) return res.status(400).json({ error })
        if(products.length > 0){
          res.status(200).json({ 
            products,
            productByPrice:{
              under5k:products.filter((product)=>product.price <= 5000),
              under10k:products.filter((product)=>product.price > 5000  && product.price <= 10000),
              under15k:products.filter((product)=>product.price > 10000 && product.price <= 15000),
              under20k:products.filter((product)=>product.price > 15000 && product.price <= 20000),
              under25k:products.filter((product)=>product.price > 20000 && product.price <= 25000),
              under30k:products.filter((product)=>product.price > 25000 && product.price <= 30000),
              under35k:products.filter((product)=>product.price > 30000 && product.price <= 35000),
              under40k:products.filter((product)=>product.price > 35000 && product.price <= 40000),
            }
           })
        }
          
        })
      }
    })
}
