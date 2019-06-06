var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
    projectName: String,
    cards: [{ front: String, back: String }]
});

//create model
var Project = mongoose.model('Project', cardSchema);

module.exports = Project