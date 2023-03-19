const Post = require('../models/post');

module.exports.home = function(req,res){
  // console.log(req.cookie);
  // res.cookie('user_id',25);
   // return res.end('<h1>Express is up for codeial')
    
//    Post.find({}, function(err , posts){
//     return res.render('home',{
//       title:"Codeial | Home",
//       posts: posts
//    });
//  });

//populate the user of each post
 Post.find({})
 .populate('user')
 .populate({
  path: 'comments',
  populate:{
    path:'user'
  }
 })
 .exec(function(err,posts){
  console.log(posts);
  return res.render('home',{
    title:"Codeial | Home",
    posts: posts
     });
 })

}

