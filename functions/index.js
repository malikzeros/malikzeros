const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const engines = require("consolidate");

const {addEducation, getAllEducations, perobaan} = require("./controllers/educationController");
const {getAllAbouts} = require("./controllers/aboutController");
const {getAllCertifications} = require("./controllers/certificationController");
const {getAllExperiences} = require("./controllers/experienceController");
const {getAllProgrammingandtools} = require("./controllers/programmingandtoolController");
const {getAllWorkflows} = require("./controllers/workflowController");
const {indexPage} = require("./controllers/IndexPageController");


const app = express();
app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.get("/", indexPage);
app.post("/education", addEducation);
app.get("/educations", getAllEducations);
app.get("/abouts", getAllAbouts);
app.get("/certifications", getAllCertifications);
app.get("/experiences", getAllExperiences);
app.get("/programmingandtools", getAllProgrammingandtools);
app.get("/workflows", getAllWorkflows);
app.get("/search", perobaan);
app.get("/api/login", (_req, res)=>{
  const user ={
    id: 1,
    username: "malik",
    email: "malikzeros@gmail.com",
  };
  jwt.sign({user}, "secretkey", (_err, token)=>{
    res.json({
      token,
    });
  });
});
app.get("/api", verifyToken, (_req, res)=>{
  res.json({
    message: "welcome to the api",
  });
});
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
  // verify a token symmetric - synchronous
  // const decoded = jwt.verify(token, "shhhhh");
  // console.log(decoded.foo) // bar

  // verify a token symmetric
  // jwt.verify(token, "shhhhh", function(err, decoded) {
  //   console.log(decoded.foo) // bar
  // });
}
exports.app = functions.https.onRequest(app);
