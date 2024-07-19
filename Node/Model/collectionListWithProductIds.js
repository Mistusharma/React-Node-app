const mongoose = require('mongoose');
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const collectionListWithProductIds = mongoose.Schema({
    collectionId:{
        type:String
    },
    collectionHandle:{
        type:String
    },
    id:{
        type:Number
    }
},{collection :'collectionListWithProductIds'});
collectionListWithProductIds.plugin(aggregatePaginate);

module.exports = mongoose.model('collectionListWithProductIds', collectionListWithProductIds);