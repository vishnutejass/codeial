const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
//const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//    src: './assets/scss',
//    dest: './assets/css',
//    debug: true,
//    outputStyle:'extented',
//    prefix: '/css'
// }));
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


//use express router


app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in th db


app.use(session({
    name: 'codeial',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PROD MODE
    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store:  MongoStore.create(
        { 
        
            mongoUrl:'mongodb://127.0.0.1/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port,function(err){

    if(err){
        //console.log('error:',err);   for interpolation use like shown in below
        console.log(`Error in runing the server:  ${err}`);
    }

    console.log(`server is running on port:${port}`);
});