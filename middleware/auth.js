const passport = require('./passport')

function jwtAuthHandler(req, res, next) {
  passport.authenticate('jwt', { session: false }, (info, user, error) => {
    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }
    if (!user) {
      res.status(401).json({ error: info.message });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
}


const localAuthHandler = (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, info, user) => {
    if (!user) {
      res.status(401).json(info)
      return
    }
    req.user = user
    next(error, user, info)
  })(req, res, next)
}

module.exports = { localAuthHandler, jwtAuthHandler }