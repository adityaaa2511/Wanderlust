const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const {saveoriginalurl}=require("../middlewares.js");
const userController=require("../controllers/users.js");
// const {userSchema}=require("../schema.js");

// const validateuser=(req,res,next)=>{
//     let {error}=userSchema.validate(req.bosy);
//     if(error){
//         req.flash("error",error.message);
//         res.render("users/signup.ejs");
//     }
//     else{
//         next();
//     }
// }


//can router.route() to combine the HTTP requests
router
.route("/signup")
.get(userController.signupUser)
.post(wrapAsync(userController.registerUser))

router
.route("/login")
.get(userController.loginUser)
.post(saveoriginalurl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
    }),
    userController.redirectUser
)

router.get("/logout",userController.logoutUser);

module.exports=router;