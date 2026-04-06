const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    year: { type: Number, required: true },
    Department: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    Age: { type: Number, required: true }
}, { timestamps: true });

UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.__v;
    delete user._id; // Mask typical mongo object ID, leverage custom userId
    return user;
};

module.exports = mongoose.model('User', UserSchema);
