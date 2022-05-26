const db = require("../db").default;
const About = require("../models/about");

const getAllAbouts = async (req, res) => {
  try {
    const abouts = await db.collection("about");
    const data = await abouts.get();
    const aboutsArray = [];
    if (data.empty) {
      res.status(404).send("No About record found");
    } else {
      data.forEach((doc)=>{
        const about = new About(
            doc.id,
            doc.data().address,
            doc.data().email,
            doc.data().facebook,
            doc.data().github,
            doc.data().linkedin,
            doc.data().name,
            doc.data().phone,
            doc.data().twitter,
            doc.data().youtube,
        );
        aboutsArray.push(about);
      });
      res.send(aboutsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllAbouts,
};
