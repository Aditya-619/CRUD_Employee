const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        default: null
    }
});

module.exports = model('User', userSchema);