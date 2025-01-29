const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventsDB').then((res) => {
    console.log('connected to db success');
}).catch((err) => {
    console.log(err);
});