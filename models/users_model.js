/**
 * Created by Nawfal on 26-Oct-15.
 */



var mongoose = require('mongoose'),
    schema = mongoose.Schema;
var UserSchema = new schema({
    username: {type: String, unique: true},
    email: String,
    color: String,
    hashed_password: String
});

mongoose.model('User',UserSchema);