const router = require("express").Router();
const User = require("../models/users");
const Post = require("../models/posts");
// Create

router.post("/newpost", async (req, res) => {
  const newpost = new Post(req.body);
  try {
    if (newpost.username) {
      const savedpost = await newpost.save();
      res.status(200).json(savedpost);
    } else {
      res.status(400).json("Pless enter username");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// update Post


router.put("/up/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


//dalated

router.delete('/del/:id',async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
try{
await post.delete()
res.status(200).json("post completed deleted....")
}catch(err){
    res.status(500).json(err)
}
        }else{
res.status(401).json('you can deleted just only accunt')
        }

    }catch(err){
        res.status(500).json(err)
    }
})

//get post 

router.get('/getpost/:id',async(req,res)=>{
    const post = await  Post.findById(req.params.id)
    if(post.id === req.params.id){
        res.status(200).json(post)
    }else{
        res.status(404).json('no found post')
    }

})

//GET ALL POSTS
router.get("/getall", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
