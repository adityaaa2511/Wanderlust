const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const DB_URL=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(DB_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    // initdata.data=initdata.data.map((obj)=>({...obj,owner:"6756a24a36726e2bdf289f3f"}));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();