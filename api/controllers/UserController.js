
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {

	//NUEVO USUARIO
	'new': function (req, res) {
		res.locals.flash = _.clone(req.session.flash);
        res.view();
        req.session.flash = {};
    },

    index: function (req, res) {
            User.find(function foundUser (err, users) {
            if(err){
            	return res.redirect('/user/new');	
            } 
            res.view({
               	users: users
            });
        });
    },

    create: function(req, res, next) {
            User.create(req.params.all(), function userCreated(err, user) {
            if (err){
            	req.session.flash = {
            		err: err.invalidAttributes
            	}
                //TODO SHOW VALIDATION MESSAGE
                //return next(err.invalidAttributes);
                //console.log('flash->', req.session.flash);
            	//return res.negotiate(err);
            	return res.redirect('/user/new');	
            } 
            res.redirect('/user/show/' + user.id); 
            req.session.flash = {};
        });
    },

    show: function(req, res, next) {
        User.findOne(req.param('id'), function foundUser (err, user){
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
        });
    },

    edit: function(req, res, next){
        User.findOne(req.param('id'), function foundUser (err, user){
            if(err) return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
        });
    },

    update: function(req, res, next){
        User.update(req.param('id'), req.params.all(), function userUpdated (err){
            if(err){
                return res.redirect('user/edit/'+req.param('id'));
            }

            res.redirect('user/show/'+req.param('id'));
        });
    },

	login: function (req, res) {
    	res.view();
  	},

  	logout: function (req, res){
    	req.session.user = null;
    	req.session.flash = 'You have logged out';
    	res.redirect('user/login');
  	},

  	'facebook': function (req, res, next) {
	     passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
	        function (err, user) {
	            req.logIn(user, function (err) {
	            if(err) {
	                req.session.flash = 'There was an error';
	                res.redirect('user/login');
	            } else {
	                req.session.user = user;
	                res.redirect('/');
	            }
	        });
	    })(req, res, next);
  	},

  	'facebook/callback': function (req, res, next) {
	     passport.authenticate('facebook',
	        function (req, res) {
	            res.redirect('/user/dashboard');
	        })(req, res, next);
	 }
	
};

