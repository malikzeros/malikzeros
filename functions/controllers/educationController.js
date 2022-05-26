const db = require("../db").default;
const Education = require("../models/education");
const addEducation = async (req, res) => {
  try {
    const data = req.body;
    await db.collection("education").doc().set(data);
    res.send("Record saved Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const getAllEducations = async (req, res)=>{
  try {
    const educations = await db.collection("education");
    const data = await educations.get();
    const educationsArray = [];
    if (data.empty) {
      res.status(404).send("No Education record found");
    } else {
      data.forEach((doc)=>{
        const education = new Education(
            doc.id,
            doc.data().year,
            doc.data().university,
            doc.data().graduate,
        );
        educationsArray.push(education);
      });
      res.send(educationsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const perobaan = async (req, res)=>{
  try {
    const educations = await db.collection("education");
    // const data = await educations.where('university','==', 'SMAN 1 CERME').get();
    const data = await educations.orderBy("university").startAt("SMA").endAt("SMA\uf8ff").get();
    const educationsArray = [];
    if (data.empty) {
      res.status(404).send("No Education record found");
    } else {
      data.forEach((doc)=>{
        const education = new Education(
            doc.id,
            doc.data().year,
            doc.data().university,
            doc.data().graduate,
        );
        educationsArray.push(education);
      });
      res.send(educationsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addEducation,
  getAllEducations,
  perobaan,
};
