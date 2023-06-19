const mongoose = require('mongoose');
//add database url
const url = "database url cluster"
mongoose.set("strictQuery", true);
const dbcon = async () => {
    await mongoose.connect(url)
        .then(() => {
            console.log("Connected to Mongo Successfully"); 
        })
        .catch((error) => {
            console.log('Check your internet connection', error);
        });

}
dbcon();