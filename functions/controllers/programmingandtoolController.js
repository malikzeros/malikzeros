const db = require("../db").default;
const Programmingandtool = require("../models/programmingandtool");

const getAllProgrammingandtools = async (req, res)=>{
  try {
    const programmingandtools = await db.collection("programmingandtool");
    const data = await programmingandtools.get();
    const programmingandtoolsArray = [];
    if (data.empty) {
      res.status(404).send("No Programming and Tool record found");
    } else {
      data.forEach((doc)=>{
        const programmingandtool = new Programmingandtool(
            doc.id,
            doc.data().list,
        );
        programmingandtoolsArray.push(programmingandtool);
      });
      res.send(programmingandtoolsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllProgrammingandtools,
};
