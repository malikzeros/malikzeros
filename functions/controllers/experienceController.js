const db = require("../db").default;
const Experience = require("../models/experience");

const getAllExperiences = async (req, res)=>{
  try {
    const experiences = await db.collection("experience");
    const data = await experiences.get();
    const experiencesArray = [];
    if (data.empty) {
      res.status(404).send("No Experience record found");
    } else {
      data.forEach((doc)=>{
        const experience = new Experience(
            doc.id,
            doc.data().company,
            doc.data().date,
            doc.data().desc,
            doc.data().job,
        );
        experiencesArray.push(experience);
      });
      res.send(experiencesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllExperiences,
};
