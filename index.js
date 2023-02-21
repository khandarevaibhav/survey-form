const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const formRouter = require("./routes/formRoutes");
const responseRouter = require("./routes/responseRoutes");
const app = express();
const cors = require("cors");
const { getAllForms } = require("./controllers/formController");
const { getAllResponses } = require("./controllers/responseController");




app.use((req,res,next)=>{
	console.log("HTTP METHOD - " + req.method + ", URL -" + req.url);
	next();
});
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/form", formRouter);
app.use("/response",responseRouter);

mongoose.connect(
    //"mongodb+srv://chinmay1819:c9403000981@cluster0.8j3na.mongodb.net/SurveyForms?retryWrites=true&w=majority"
    'mongodb+srv://vkpatil22:MongoAtlas2206@cluster0.ydcvsiy.mongodb.net/SurveyFormst?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started 5000 and connected to Database");
    });
  })
  .catch((err) => {
    console.log(err);
  });

  //getAllResponses("63f4875a46b54cb1221bfe1d")