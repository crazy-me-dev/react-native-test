const express = require('express')
const app = express()
const port = 3000

const fetchAllReviews = () => {
  const fs = require('fs')
  const rawData = fs.readFileSync('helpful-reviews.json')
  const reviews = JSON.parse(rawData)

  return reviews
}

const categorizeProducts = (reviews) => {
  let products = {}
  reviews.forEach(review => {
    if (products[review.asin] === undefined) {
      products[review.asin] = {
        asin: review.asin,
        title: review.product_title,
        image: review.main_image_url,
        helpfulTotal: review.helpful,
        reviews: [review]
      }
    } else {
      const currentProductInfo = products[review.asin]
      currentProductInfo.helpfulTotal = Math.round((currentProductInfo.helpfulTotal + review.helpful) * 1000) / 1000
      currentProductInfo.reviews = [...currentProductInfo.reviews, review]
    }
  })

  return products
}

const reviews = fetchAllReviews()
console.log("Reviews => ", reviews.length)

const arguments = process.argv
const command = arguments[2]
const params = arguments[3]
const products = categorizeProducts(reviews)

if (command === "test1") {
  
  const res = Object.entries(products).filter(([asid, product]) => {
    return product.reviews.length === parseInt(params)
  })
  console.log(res)
} else if (command === "test2") {
  const sortedReviews = reviews.sort((review1, review2) => {
    if (review1.helpful > review2.helpful) {
      return -1
    } else if (review1.helpful < review2.helpful) {
      return 1
    } else {
      return products[review2.asin].reviews.length - products[review1.asin].reviews.length
    }
  })

  console.log(sortedReviews.slice(0, parseInt(params)).map(review => ({
    ...review,
    productReviews: products[review.asin].reviews.length
  })))
} else if (command === "test3") {
  const productsArray = Object.entries(products).map(([asid, product]) => product)
  console.log(productsArray.slice(0, parseInt(params)))
}

app.get('/products', (req, res) => {
  const productsArray = Object.entries(products).map(([asid, product]) => product)
  const fetchedArray = productsArray.map(product => ({
    asin: product.asin,
    title: product.title,
    image: product.image,
    reviewsTotal: product.reviews.length,
    helpfulAver: Math.round(product.helpfulTotal / product.reviews.length * 100) / 100,
  })).sort((p1, p2)=>p2.helpfulAver - p1.helpfulAver)

  if (req.query.count !== undefined && req.query.count > 0) {
    res.send(fetchedArray.slice(0, req.query.count))
  } else {
    res.send(fetchedArray)
  }
})

app.get('/products/:asin', (req, res) => {
  const asin = req.params.asin
  const product = products[asin]
  if (product) {
    res.send(product)
  } else {
    res.status(500).send('No product found')
  }
})

app.listen(port, () => {
  console.log("Listing on port " + port)
})