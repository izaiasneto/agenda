exports.middlewareGlobal = (req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdn.jsdelivr.net");
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err && 'EBADCSRFTOKEN' === err.code) {
    return res.render('404');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Access denied. Log in to proceed.');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};
