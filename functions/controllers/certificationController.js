const db = require("../db").default;
const Certification = require("../models/certification");

const getAllCertifications = async (req, res)=>{
  try {
    const certifications = await db.collection("certifications");
    const data = await certifications.get();
    const certificationsArray = [];
    if (data.empty) {
      res.status(404).send("No Certification record found");
    } else {
      data.forEach((doc)=>{
        const certification = new Certification(
            doc.id,
            doc.data().list,
        );
        certificationsArray.push(certification);
      });
      res.send(certificationsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllCertifications,
};
