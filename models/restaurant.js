const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User', // 定義參考對象是 User model
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
