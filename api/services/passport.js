var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

function findById(id, fn) {
  User.findOne(id).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByFacebookId(id, fn) {
  User.findOne({
    facebookId: id
  }).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: "988706041183885",
    clientSecret: "35594af50cfa1e51ffd9fa9b7a3e0b02",
    callbackURL: "http://localhost:1337/user/facebook/callback",
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {

    findByFacebookId(profile.id, function (err, user) {

      // Create a new User if it doesn't exist yet
      if (!user) {
        User.create({

          facebookId: profile.id

          // You can also add any other data you are getting back from Facebook here 
          // as long as it is in your model

        }).done(function (err, user) {
          if (user) {
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {
            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

      // If there is already a user, return it
      } else {
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      }
    });
  }
));