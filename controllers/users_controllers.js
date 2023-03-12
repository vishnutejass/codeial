
const User = require("../models/user")  //for auto filling

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    })   
}


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title: "Codeial | sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }


    return res.render('user_sign_in',{
        title: "Codeial | sign In"
    });
}
//get the sign up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
    return  res.redirect('back');
   }

   User.findOne({email: req.body.email},function(err, user){
    if(err){console.log('error in finding user in signing up');return}

     if(!user){
        User.create(req.body,function(err,user){
            if(err){console.log('error in creating user in signing up',err);return}

            return res.redirect('/users/sign-in');
        })
     }else{
        return res.redirect('back');
     }

   });
}
//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//whenever the request comes, the controller with fetch the views then this views will send to browser

module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}