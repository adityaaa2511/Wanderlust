const Listing=require("../models/listing");

module.exports.index=async (req,res)=>{
    const allData = await Listing.find({});
    res.render("listings/index.ejs",{allData});
}

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.getNewListing=async (req,res,next)=>{
    let {id}=req.params;
    const list=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        },
    }).populate("owner");
    if(!list){
        req.flash("error","Listing does not Exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
}

module.exports.editListing=async (req,res)=>{
    let {id}=req.params;
    const list=await Listing.findById(id);
    if(!list){
        req.flash("error","Listing does not Exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {list});
}

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
    }
    await listing.save();
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);

};

module.exports.newListing=async (req,res)=>{
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        newlisting.image={url,filename};
    }
    await newlisting.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findByIdAndDelete(id);
    console.log(listing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};