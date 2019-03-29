const router = require("express").Router();
const oceansnackList = require("../data/oceaniasnack.json");
const multer = require("multer");
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: "./oceansnack/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const uploadPic = multer({ storage }); 

router.get("/", (req, res) => {
  res.json(oceansnackList);
});

router.post("/", uploadPic.single("file"), (req, res) => {
  console.log(req.file);
  const newSnack = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    image: "http://localhost:8080/" + req.file.originalname,
    country: req.body.country,
    price: req.body.price,
    flavour: req.body.flavour,
    comments: []
  };
  console.log(newSnack)
  oceansnackList.unshift(newSnack);
  res.json(oceansnackList);
});

router.get("/:id", (req, res) => {
  let snackitem = oceansnackList.find(item => {
    return item.id === req.params.id;
  });
  res.json(snackitem);
});

router.get("/:id/comments", (req, res) => {
  let snackitem = oceansnackList.find(item => {
    return item.id === req.params.id;
  });
  res.json(snackitem.comments);
});

router.post("/:id/comments", (req, res) => {
  let snackitem = oceansnackList.find(item => {
    return item.id === req.params.id;
  });

  const newComment = {
    name: req.body.name,
    comment: req.body.comment,
    id: req.body.id,
    date: req.body.date
  };
  snackitem.comments.unshift(newComment);
  res.json(snackitem.comments);
});
module.exports = router;
