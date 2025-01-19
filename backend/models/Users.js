const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    endWorkTime: { type: Number, required: true, },
    machine: { type: Array },
    phone: { type: String, required: true, },
    salary: { type: Number, required: true, },
    startWorkTime: { type:  Number, required: true, },
})

const userAddSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value && value.length >= 3;
            },
            message: 'Imię i nazwisko musi zawierać co najmniej 3 znaki'
        }
    },
    machine: { type: Array },
    phone: { type: String, required: true },
    salary: { type: String, required: true },
    startWorkTime: {
        type: Number, required: true, validate: {
            validator: function (value) {
                return value && value.toISOString() !== '1970-01-01T00:00:00.000Z';
            },
        }
    },
    endWorkTime: {
        type: Number, required: true, validate: {
            validator: function (value) {
                return value && value.toISOString() !== '1970-01-01T00:00:00.000Z';
            },
        }
    },
})

const UserModel = mongoose.model('users', userSchema, 'users')
const UserAddModel = mongoose.model('userAdd', userAddSchema, 'users')

module.exports = { UserModel, UserAddModel }