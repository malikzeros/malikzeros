const indexPage = async (req, res) => {
  res.render("index", {
    title: "Page Title",
    malik: [
      {edu: "musim"},
      {edu: "makan"},
    ],
  });
};

module.exports = {
  indexPage,
};
