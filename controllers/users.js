const User=require("../models/user");

module.exports.signupUser=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.registerUser=async (req,res)=>{
    try{

        let {username,email,password}=req.body;
        const newuser= new User({
            email:email,
            username:username
        })
        const registereduser=await User.register(newuser,password);
        console.log(registereduser);
        req.login(registereduser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","User registered successfully");
            res.redirect("/listings");
        })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.loginUser=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.redirectUser=async (req,res)=>{
    req.flash("success","Welcome to WanderLust!");
    let redirecturl=res.locals.redirecturl||"/listings";
    res.redirect(redirecturl);
}

module.exports.logoutUser=(req,res)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You have successfully logged out!");
        res.redirect("/listings");
    })
}