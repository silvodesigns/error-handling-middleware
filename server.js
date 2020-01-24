const express = require('express');
const path = require('path');

const server = express();

server.get('/download', (req, res, next) => {
    const filePath = path.join(__dirname, 'index.html');
    //if there is an error , we will pass it to the 
    //call back function as an argument
    res.sendFile(filePath, err => {
        if(err){
            //go to our next custom middleware
            next(err);
        } else {
            console.log('file sent successfully');
        }

    });
});

server.use((err, req, res, next) => {
// error handling middleware, take in ERROR
console.log(err);
res.status(500).json(
    {message: 'there was an error performing the operation',
    error: err});
});

server.listen(5000, () => {
    console.log('magic happening in 5000');
});