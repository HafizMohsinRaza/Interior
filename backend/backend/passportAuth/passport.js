const passport = require('passport');
const {UserAuth} = require('../Models/UserAuthModel');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const GOOGLE_CLIENT_ID = "716360279926-k5ikq10lbk9u6se2ou39e0ilug6mvlj4.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

const FACEBOOK_APP_ID = "994556091917661";
const FACEBOOK_APP_SECRET = "ee5a535f399166085d560407a8df0904";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request , accessToken, refreshToken,email, profile,done) {
      done(null,profile,accessToken)
    // console.log(accessToken)
    // console.log(profile.photos[0].value)
    // console.log(email)
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    // try {
    //     const user = await UserAuth.findOne({googleId:profile.id});
    //     if(!user){
    //         const newUser = new UserAuth({
    //             username: profile.displayName,
    //             email: profile.emails[0].value,
    //             googleId: profile.id,
    //             pic:profile.photos[0].value,
    //             token:accessToken,
    //             role:"Customer"
    //         });
    //         await newUser.save();
    //         // console.log(newUser);
            
    //         done(null,profile)
    //     }else{
    //         done(null,user)
    //         // console.log(user)
    //     }
    // } catch (error) {
    //     done(err,null)
    // }
  }
));

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser((user,done) => {
    done(null,user)
})

// passport.deserializeUser((id, done) => {
//     UserAuth.findById(id)
//       .then(user => {
//         done(null, user);
//       })
//       .catch(err => {
//         done(err, null);
//       });
// });