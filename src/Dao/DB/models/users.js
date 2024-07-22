import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const collection = 'users';

const StringAndRequired = {
    type: String,
    required: true
}

const userSchema = new mongoose.Schema({
    name: StringAndRequired,
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: StringAndRequired,
    userType:{
        type: String,
        default: 'user',
        enum: ['user', 'editor', 'admin']
    }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
};

const userModel = mongoose.model(collection,userSchema);

export default userModel;