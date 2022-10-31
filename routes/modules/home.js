const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  Restaurant.find({})
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurantsData => res.render('index', { restaurantsData }))
    .catch(err => console.log(err))
})

// 搜尋功能
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }

  // 搜尋餐廳名稱關鍵字 || 餐廳種類關鍵字
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', { restaurantsData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router
