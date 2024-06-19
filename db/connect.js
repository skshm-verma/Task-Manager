const mongoose = require('mongoose');

const connectDb = (url) => {
   return mongoose.
        connect(url)
        .then(() => { console.log('connected to the db..') })
        .catch((error) => { console.log(error) });
}

module.exports = connectDb