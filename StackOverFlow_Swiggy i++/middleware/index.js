var Question = require("../models/question");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkUserOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Question.findById(req.params.id, function(err, foundQuestion){
           if(err){
			   req.flash("error","Question not found");
               res.redirect("back");
           }  else {
               // does user own the Question?
            if(foundQuestion.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
				req.flash("error","You don't have permission to do that.");
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error","You need to be logged in to do that")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                next();
            } else {
				req.flash("error","You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
		req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error","You need to be logged in to do that")
    res.redirect("/login");
}

module.exports = middlewareObj;