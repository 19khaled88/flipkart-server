const slugify = require('slugify')
const Category = require('../models/category')

function createCategoryList(categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined)
  } else {
    category = categories.filter((cat) => cat.parentId == parentId)
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategoryList(categories, cate._id),
    })
  }

  return categoryList
}
exports.createCategory = async (req, res) => {
  try {
    const categoryObj = {
      name: req.body.name,
      slug: slugify(req.body.name),
    }

    // if(req.body.categoryImage){
    //   console.log(req.body)
    //   categoryObj.categoryImage = process.env.API_LINK + '/public/'+ req.body.categoryImage
    // }
    if (req.file) {
      categoryObj.categoryImage =
        process.env.API_LINK + '/public/' + req.file.filename
    }
    if (req.body.parentId) {
      categoryObj.parentId = req.body.parentId
    }
    const getFile = req
    const category = new Category(categoryObj)
    category.save((error, category) => {
      if (error) return res.status(400).json({ error: error })
      if (category) {
        return res.status(200).json({ category })
      }
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find({})
    if (category) {
      const categoryList = createCategoryList(category)
      res.status(200).json({
        categoryList,
      })
    }
  } catch (error) {
    res.status(400).json({
      error,
    })
  }
}
