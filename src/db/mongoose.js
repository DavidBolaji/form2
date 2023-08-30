const mongoose = require("mongoose");
let server = process.env.MONGODB_URI_LOCAL;
if (process.env.ENV === "prod") {
  server = process.env.MONGODB_URI_PROD;
}

const con = async () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(server, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true
      });

    mongoose.connection.on('connected', () => {
        console.log('database connected')
    })
}

module.exports = con;
