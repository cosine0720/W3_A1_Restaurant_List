const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽餐廳詳細資料
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('show', { restaurantData }))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  Restaurant.findByIdAndUpdate(_id, req.body) // findByIdAndUpdate 與 findOneAndUpdate 差別？
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})

// 刪除特定餐廳
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurantId
  return Restaurant.findOneAndDelete({ _id, userId }) 
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
