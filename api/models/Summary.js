const mongoose = require('mongoose')
const {Schema, model} = mongoose

const SummarySchema = new Schema({
    paragraph: {type: String, required: true},
    summary: {type: String, required: true},
    author: {type:Schema.Types.ObjectId, ref:'User'},
},{
    timestamp:true,
});

const SummaryModel = model('Summary', SummarySchema);
module.exports = SummaryModel;