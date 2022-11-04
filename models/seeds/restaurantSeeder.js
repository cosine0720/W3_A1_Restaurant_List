const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 載入  model
const Restaurant = require('../restaurant')
const User = require('../user')

const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

// 建立種子 User
const SEED_USER = [
  {
    name: '郝美',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user) => {
      const { name, email, password, restaurantIndex } = user
      console.log('running restaurantSeeder script...')
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
          return User.create({
            name,
            email,
            password: hash
          })
        })
        .then((user) => {
          console.log('現在建立的user是：', user)
          const restaurants = restaurantIndex.map((index) => {
            const restaurant = restaurantList[index]
            restaurant.userId = user._id
            console.log(`restaurantIndex.map 中，跑第 ${index} 個餐廳：`, restaurant)
            return restaurant
          })
          console.log('create!!!---------------------------------------', restaurants)
          return Restaurant.create(restaurants) // 一次輸出三間餐廳，並且包在一個陣列裡
        })
    })
  )
    .then(() => {
      console.log('restaurant list seeder created successfully!!!!!')
      process.exit()
    })

    .catch((error) => console.log(error))
})
