const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true }, // Primary key with auto-increment
    name: { type: String, required: true },
    phoneNo: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    role: { 
        type: String, 
        enum: ['admin', 'member'], 
        default: 'member' 
    }, // Role-based access
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Apply auto-increment plugin to user_id
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);
