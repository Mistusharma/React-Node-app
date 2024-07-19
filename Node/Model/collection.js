
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const collectionObject = mongoose.Schema({
    collection_id:{
        type:String
    },
    updated_at:{
        type:String
    },
    body_html:{
        type:String
    },
    default_product_image:{
        type:Object//String
    },
    handle:{
        type:String
    },
    image:{
        type:Object
    },
    title:{
        type:String
    },
    sort_order:{
        type:String
    },
    published_at:{
        type:String
    },
    published: {
        type: Boolean
    }
},
{collection :'collectionObject'});
collectionObject.plugin(mongoosePaginate);
module.exports = mongoose.model('collectionObject', collectionObject);