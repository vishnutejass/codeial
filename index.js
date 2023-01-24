const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes'))


app.listen(port,function(err){

    if(err){
        //console.log('error:',err);   for interpolation use like shown in below
        console.log(`Error in runing the server:  ${err}`);
    }

    console.log(`server is running on port:${port}`);
});