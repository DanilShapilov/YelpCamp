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
      price,
      images: [
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629259762/YelpCamp/yynjfkkt60ura4lly5ii.png",
          "filename": "YelpCamp/yynjfkkt60ura4lly5ii"
        },
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629258457/YelpCamp/hep6dmonirigds5w452l.png",
          "filename": "YelpCamp/hep6dmonirigds5w452l"
        },
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629258457/YelpCamp/yidymoxaeyxonirm1fdl.jpg",
          "filename": "YelpCamp/yidymoxaeyxonirm1fdl"
        },
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629257155/YelpCamp/hz4mo2jfxubukrzafhzx.jpg",
          "filename": "YelpCamp/hz4mo2jfxubukrzafhzx"
        },
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629198374/YelpCamp/jcxiwzpbqoqjthqlzj7j.jpg",
          "filename": "YelpCamp/jcxiwzpbqoqjthqlzj7j"
        },
        {
          "url": "https://res.cloudinary.com/ds225/image/upload/v1629198372/YelpCamp/jxydk6r90lpthwbcmucc.jpg",
          "filename": "YelpCamp/jxydk6r90lpthwbcmucc"
        }
      ]
    })
    await camp.save()
  }
}
seedDB().then(() => {
  mongoose.connection.close()
})