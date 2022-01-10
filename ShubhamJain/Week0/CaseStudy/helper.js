exports.checkAuthenticated = (req, res , next) => {
    if (req.isAuthenticated()) {
        return next()
      }
    
      res.redirect('/api/login')
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
      }
      next()
}