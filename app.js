//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { home } = require("nodemon/lib/utils");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/blogDB");
const postSchema = {
  title : String,
  content : String
}

const Post = mongoose.model("Post",postSchema);

const homeStartingContent = "Welcome to our blogging haven! Discover captivating articles, expert insights, and thought-provoking stories. Unleash your creativity and share your voice with the world. Join our vibrant community of writers and readers today. Explore diverse topics, engage in discussions, and be inspired. Empower your writing journey and connect with like-minded individuals. Happy blogging!"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get( "/", (req,res) => {
  Post.find({})
    .then(function(post){
      res.render("home.ejs" , {
        HomeStartContent : homeStartingContent,
        Post : post
      });
    })
    .catch(err => {
      console.log(err);
    })
  
} )

app.get( "/contact", (req,res) => {
  res.render("contact.ejs" , {
    Contact : contactContent,
  });
} )

app.get( "/about", (req,res) => {
  res.render("about.ejs" , {
    About : aboutContent,
  });
} );

app.get( "/compose", (req,res) => {
  res.render("compose.ejs" );
} );

app.get("/post/:postid", (req,res) => {
  const RequestedPostId = req.params.postid;
  Post.findOne({_id : RequestedPostId})
    .then((post)=>{
      res.render("post.ejs", {
        Post : post
      })
    })
    .catch( err => {
      console.log(err);
    })
})

app.post("/compose", (req,res) => {
  // console.log(req.body.postTitle);
  const NewContent = new Post({
    title : req.body.postTitle,
    content : req.body.postBody,
  })
  NewContent.save();
  res.redirect("/");

});









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
