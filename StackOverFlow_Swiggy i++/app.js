var express       = require('express'),
    app           = express(),
    bodyparser    = require('body-parser'),
    mongoose      = require('mongoose'),
	flash         = require('connect-flash'),
    passport      = require('passport'),
    localStrategy = require('passport-local'),
	methodOverride= require('method-override'),
    Question    = require("./models/question.js"),
    Comment       = require("./models/comment.js"),
	User          = require("./models/user.js");


var commentRoutes    = require("./routes/comments.js"),
	questionRoutes = require("./routes/questions.js"),
	authRoutes       = require("./routes/index.js");
	
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/stack_overflow");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

app.use(require("express-session")({
	secret: "This is the best app",
	resave: false,
	saveUninitialized: false
}))

//Passport Configration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();	
})

app.use("/question/:id/comments",commentRoutes);
app.use("/question",questionRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 3600,function(req,res){
	console.log("StackOverflow server started");
})
