const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middlewares.js");
const listingContoller=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

//INDEX ROUTE
router.get("/", wrapAsync(listingContoller.index));

//NEW ROUTE
router.get("/new", isLoggedIn,listingContoller.renderNewForm);



//SHOW ROUTE
router.get("/:id",wrapAsync(listingContoller.getNewListing));

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingContoller.editListing));


//UPDATE ROUTE
router.put("/:id", isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting,wrapAsync(listingContoller.updateListing));

//CREATE ROUTE
router.post("/",isLoggedIn,upload.single('listing[image]'),validatelisting,wrapAsync(listingContoller.newListing));


//DESTROY ROUTE
router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingContoller.deleteListing));

module.exports=router;