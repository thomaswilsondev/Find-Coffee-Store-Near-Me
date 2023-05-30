// Route /api/coffee/I/Love/you => [...slug] = I love yoou

export default (req, res) => {
  res.status(200).json({ name: "hi slug" });
};
