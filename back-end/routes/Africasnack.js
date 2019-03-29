const router = require("express").Router();
const africansnackList = require("../data/africansnack.json");
const multer = require("multer");
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: "./africansnack/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadPic = multer({ storage }); 

router.get("/", (req, res) => {
    res.json(africansnackList);
  });

  router.post("/", uploadPic.single("file"), (req, res) => {
    const newSnack={
      id : uuidv4(),
      name : req.body.name,
      description : req.body.description,
      image:"http://localhost:8080/" + req.file.originalname,
      country:req.body.country,
      price:req.body.price,
      flavour:req.body.flavour,
      comments: []
    }
    africansnackList.unshift(newSnack)
    res.json(africansnackList);
  });

  router.get("/:id", (req, res) => {
    let snackitem = africansnackList.find(item=>{
      return item.id === req.params.id;
    });
    res.json(snackitem);
  });

  router.get("/:id/comments", (req, res) => {
    let snackitem = africansnackList.find(item=>{
      return item.id === req.params.id;
    });
    res.json(snackitem.comments);
  });

  router.post("/:id/comments", (req, res) => {
    let snackitem = africansnackList.find(item=>{
      return item.id === req.params.id;
    });

    const newComment={
      name:req.body.name,
      comment:req.body.comment,
      id:req.body.id,
      date:req.body.date
    }
    snackitem.comments.unshift(newComment)
    res.json(snackitem.comments);
  });
module.exports = router;