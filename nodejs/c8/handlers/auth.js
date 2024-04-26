const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    AccountLogin,
    AccountSignUp,
    AccountReset,
    validate
} = require("../pkg/accounts/validate");

const accounts = require("../pkg/accounts");
const config = require("../pkg/config");

const register = async(req, res) => {
    try{
        await validate(req.body, AccountSignUp);
        const exists = await accounts.getByUsername(req.body.username);
        if(exists){
            return res.status(400).send("Account with this username already exists!");
        }
        //console.log("req.body.password", req.body.password); // plain text 123 ke ni go prikaze kako 123
        req.body.password = bcrypt.hashSync(req.body.password);
        //console.log("req.body.password", req.body.password); // passwordot ke mi e hashed, odnosno enkriptiran, nema da e plain text 123
        const acc = await accounts.create(req.body);
        return res.status(201).send(acc);
    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
}

const login = async(req, res) => {
    try{
        await validate(req.body, AccountLogin);

        const {username, password} = req.body;

        const account = await accounts.getByUsername(username);

        if (!account){
            return res.status(400).send("Account not found!");
        }

        if(!bcrypt.compareSync(password, account.password)){
            return res.status(400).send("Incorect password");
        }

        const payload = {
            fullname: account.fullname,
            username: account.username,
            id: account._id,
            expiry: new Date().getTime()/ 1000 + 7 * 24 * 60 * 60 //7 days in the future, 1 week
        }
        const token = jwt.sign(payload, config.getSection("development").jwt);
        return res.status(200).send(token);

    }catch(err){
        console.log(err);
        return res.status(err.status).send(err.error);
    }
}

const refreshToken = async(req, res) => {
    //req.body -> {"email": test2@gmail.com}
    //req.params -> :id
    //req.auth - express-jwt with jsonwebtoken sharing secret
    //req.query - ?123

    const payload = {
        ...req.auth,
        exp: new Date().getTime()/ 1000 + 7 * 24 * 60 * 60
    }

    const token = jwt.sign(payload, config.getSection("development").jwt);
        return res.status(200).send(token);
};

const resetPassword = async(req, res) => {
    await validate(req.body, AccountReset);
    const { username, old_password, new_password } = req.body;

    const userAccount = await accounts.getByUsername(username);

    if(!bcrypt.compareSync(old_password, userAccount.password)){
        return res.status(400).send("Incorect password");
    }

    const newPasswordHashed = bcrypt.hashSync(new_password);

    if(old_password === new_password){
        return res.status(400).send("New password cannot be the same as the old password");
    }

    const passwordChanged = await accounts.setNewPassword(
        userAccount._id.toString(),
        newPasswordHashed
    );

    return res.status(200).send(passwordChanged);

}

const forgotPassword = async( req, res) => {
    //za naredniot modul kade sto ke koristime third-pary api od mailgun
    // isto taka ako sakate moze da koristite sendgrid 
}

module.exports = {
    login,
    register,
    refreshToken,
    resetPassword
}