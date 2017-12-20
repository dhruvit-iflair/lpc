var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoleSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('Role', RoleSchema);