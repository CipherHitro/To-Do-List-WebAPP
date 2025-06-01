const User = require('../models/user')
const {setUser} = require('../services/auth')
const bcrypt = require('bcryptjs')

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(password, salt);
    // console.log(hash);
    
    await User.create({
        name,
        email,
        password: passHash
    })
    return res.render('login')

}
async function handleUserLogin(req, res) {
    const { email , password} = req.body;

    const user = await User.findOne({email})

    if(!user) {
        return res.render('login', {error : "Invalid credentials"})

    }
    const authUser = bcrypt.compareSync(password, user.password); 
    if(!authUser){
        return res.render('login', {error : "Invalid credentials"})
    }
    const token = setUser(user);
    res.cookie('uid', token)
    return res.redirect('/');

}

module.exports = {
    handleUserSignup, 
    handleUserLogin
}