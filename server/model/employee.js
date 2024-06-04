const { Schema, model } = require('mongoose');

function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    const randomString = Math.random().toString(36).substring(2, 8); // Generate random string

    return timestamp + randomString;
}

const allowedImageFormats = ['jpg', 'png'];

const employeeSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true,
        default: generateUniqueId
    },
    name: {
        type: String,
        required: true
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
    mobile: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[6-9]\d{9}$/.test(value);
            },
            message: props => `${props.value} is not a valid mobile number.`
        }
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    course: {
        type: String,
        required: true,
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Employee', employeeSchema);