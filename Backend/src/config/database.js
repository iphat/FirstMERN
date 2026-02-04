const mongoose = require('mongoose');

async function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("DB connected")
})
.catch((err) => {
    console.log(err);
})
}

module.exports = connectDb;