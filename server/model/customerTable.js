const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const customerSchema = new mongoose.Schema({
    customerId: { type: Number, unique: true }, // Primary Key with auto-increment
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Apply auto-increment plugin to customerId
customerSchema.plugin(AutoIncrement, { inc_field: 'customerId' });

module.exports = mongoose.model('Customer', customerSchema);
