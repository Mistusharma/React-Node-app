const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const products = mongoose.Schema({
    id:{
        type:Number
    },
    title:{
        type:String
    },
    body_html:{
        type:String
    },
    vendor:{
        type:String
    },
    product_type:{
        type:String
    },
    created_at:{
        type:String
    },

    handle:{
        type:String
    },
    updated_at:{
        type:String
    },
    published_at:{
        type:String
    },
    template_suffix:{
        type:String
    },
    published_scope:{
        type:String
    },
    tags:{
        type:String
    },
    admin_graphql_api_id:{
        type:String
    },
    options:{
        type:Array
    },
    variants:{
        type:Array
    },
    images:{
        type:Array
    },
    image:{
        type:Object
    }
})
products.plugin(mongoosePaginate);
module.exports = mongoose.model('allProducts', products);