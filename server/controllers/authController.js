const bcrypt = require('bcryptjs');

const register = async(req, res) => {
    const {email, password} = req.body;
    const db = req.app.get('db');
    const {session} = req;

    let user = await db.user.check_user(email);
    user = user[0];
    if(user){
        return res.status(400).send('User already exists')
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newUser = await db.user.register_user(email, hash);
    newUser = newUser[0];
    delete newUser.password; //Change the sql command to not return the password
    session.user = newUser; //See how to refactor this section of code
    res.status(201).send(session.user);
},
const login = async(req, res) => {
    const {email, password} = req.body;
    const db = req.app.get('db');
    const {session} = req;
    let user = await db.user.check_user(email);
    user = user[0];
    if(!user){
        return res.status(400).send('Email not found')
    }
    const foundUser = bcrypt.compareSync(password, user.password);
    if(foundUser){
        delete user.password;
        session.user = user;
        res.status(202).send(session.user);
    } else {
        res.status(400).send('Incorrect Password');
    }
},
const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
},
const getSessionUser = (req, res) => {
    const {user} = req.session;
    if(user){
        res.status(200).send(user);
    } else {
        res.send('') //figure out a better way to do this
    }
}

module.exports = {
    register,
    login,
    logout,
    getSessionUser
};