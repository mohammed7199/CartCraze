const mongoose = require('mongoose')
const ConfigureDB = async () => {
   try {
      // establish connection to database
      await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
      console.log('connected to your void, start dumping data here...')
   } catch (e) {
      console.log('HEHE! Your Brain is malfunctioning.. check it out', e)
   }
}

module.exports = ConfigureDB