exports.indexPage = (req, res) =>{
    res.render('index.ejs', { name: req.user.name })
}

exports.loginPage = (req, res) => {
    res.render('login.ejs');
}

exports.logoutUser = (req, res) => {
    req.logOut()
    res.redirect('/api/login')
}

exports.health = (req, res) => {
    req.logOut()
    res.send({message: "Server is online!"})
}
