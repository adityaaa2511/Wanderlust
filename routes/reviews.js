const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const{validatereview, isLoggedIn, isAuthor}=require("../middlewares.js");
const reviewController=require("../controllers/reviews.js");

router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.addReview));

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));


module.exports=router;