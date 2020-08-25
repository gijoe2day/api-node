const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

//Posts Routes Import
const postsRoutes = require("./routes/posts");

//body parser middleware
app.use(express.json());

//connect to mongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Use routes
app.use("/posts", postsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});
