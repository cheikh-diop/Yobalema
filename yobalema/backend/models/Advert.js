var mongoose = require('mongoose');


var AdvertSchema = new mongoose.Schema({
        title:String,
        type: String,
        description: String,
        mark: String,
        model: String,
        image_url: String,
        date_time: String,
        current_date:String,
        address: {
            street: String,
            city: String,
            code_city: Number,
            country: String,
            latitude: Number,
            longitude: Number,
        }
    });
    AdvertSchema.index({'$**': 'text'});
    module.exports = mongoose.model('advert',AdvertSchema);
