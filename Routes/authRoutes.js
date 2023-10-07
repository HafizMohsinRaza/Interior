const router = require('express').Router();
const passport = require('passport');


router.get("/login/success",(req,res) => {
    console.log(req,"sahil22")
    if(req.user){
        res.status(200).json({
            success:true,
            message:"successfull",
            user:req.user
            // jwt:"gsds"
        })
    }
    else{
        console.log("user not exist")
    }
});

router.get("/login/failed",(req,res) => {
    res.status(401).json({
        success:false,
        message:"failure"
    })
})

// router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
//     // Redirect the user to the frontend URL with the login success data
//     res.redirect('http://frontend-url.com/success');
//   });

// router.get('/login/success/done',(req,res) => {
//     console.log(req.session)
//     if (req.session.user) {
//         // Render the login success page
//         res.render('login-success', { user: req.session.user });
//       } else {
//         // Redirect the user to the login page
//         res.redirect('/login');
//       }
// })

function isLogedIn(req,res,next){
    req.user ? next() : res.sendStatus(401)
}


router.get('/google',passport.authenticate('google',{scope:['email',"profile"]}));

// router.get("/google/callback", passport.authenticate('google',{
//     successRedirect:"http://localhost:3000",
//     failureRedirect:"/login/failed"
// }))

router.get("/google/callback", passport.authenticate('google',{
    successRedirect:"/auth/protected",
    failureRedirect:"/login/failed"
}))

router.get('/protected',isLogedIn , (req,res) => {
    let name = req.user.displayName;
    res.send(`Hello there are ${name}`)
    console.log(req.user)
})

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);



module.exports = router