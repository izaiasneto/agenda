const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('logged')
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

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();
    
        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(() => res.redirect('/login'));
            return;
        }
    
        req.flash('success', 'Successfully logged in.');
        req.session.user = login.user;
        req.session.save(() => res.redirect('/login'));
        return;
    } catch (e) {
        console.log(e);
        res.render('404');
    }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};