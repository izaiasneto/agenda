const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login'));
            return;
        }
    
        req.flash('success', 'User has been created successfully');
        req.session.save(() => res.redirect('/login'));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};