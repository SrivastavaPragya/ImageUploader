const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.0fjyio3.mongodb.net/ImageLoader").then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log(e);
});
