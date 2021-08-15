const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console.error, 'connection error:'))
db.once('open', () => {
  console.log('Database connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '6118f82f6a03110728cefd45',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia assumenda obcaecati aliquid tempore neque cum cumque temporibus voluptates ipsa soluta qui officia quasi doloremque, architecto nemo repudiandae? Fugiat, architecto sed.',
      price
    })
    await camp.save()
  }
}
seedDB().then(() => {
  mongoose.connection.close()
})