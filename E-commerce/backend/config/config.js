const mongoose = require('mongoose')
require('colors')
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MONGO CONNECTED ${conn.connection.host}`.underline.blue);
    } catch (error) {
        console.error(`ERROR:${error.message}`.red);
        process.exit(1)
    }
}

module.exports = connectDb