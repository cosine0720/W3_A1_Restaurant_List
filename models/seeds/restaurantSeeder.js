const Restaurant = require('../restaurant') // 載入 restaurant model
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json').results

db.once('open', () => {
  console.log('running restaurantSeeder script...')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})
