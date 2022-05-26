const db = require("../db").default;
const Workflow = require("../models/workflow");

const getAllWorkflows = async (req, res)=>{
  try {
    const workflows = await db.collection("workflow");
    const data = await workflows.get();
    const workflowsArray = [];
    if (data.empty) {
      res.status(404).send("No Workflow record found");
    } else {
      data.forEach((doc)=>{
        const workflow = new Workflow(
            doc.id,
            doc.data().list,
        );
        workflowsArray.push(workflow);
      });
      res.send(workflowsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllWorkflows,
};
