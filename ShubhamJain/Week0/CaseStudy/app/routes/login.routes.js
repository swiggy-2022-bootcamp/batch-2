module.exports = (app, passport) => {
    var logger = require('../config/winston');
    const helper = require('../../helper');
    const login = require("../controllers/login.controller");
    var router = require("express").Router();

    logger.info("inside login routes");
    
    router.get("/", helper.checkAuthenticated, login.indexPage);
    router.get("/api/login", helper.checkNotAuthenticated, login.loginPage);
    
    router.post('/api/login', helper.checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/api/login',
        failureFlash: true
      }))

    router.delete("/api/logout",helper.checkAuthenticated, login.logoutUser);

    router.get("/api/health", login.health);

    app.use("",router)
}