const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config')
// bla bla

const register = async ({ amount, username, password }) => {
    if (username.length < 4){
        throw {message: 'username too short'}
    }
    if (password.length < 4){
        throw {message: 'password too short'}
    }
   

    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);
    const user = new User({ amount, username, password: hash });
    
    return await user.save();
}

const login = async ({username, password}) => {
    let user = await User.findOne({username});
    if (!user) {
        throw {message: 'Invalid user'}
    }
    let isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) throw {message: 'Wrong password'}

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET);
    return token;
}

module.exports = { register, login };