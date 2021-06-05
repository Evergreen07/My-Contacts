const express = require('express');
const path = require('path');
const app = express();
const connectDB = require('./config/db');

//Connect Database
connectDB();


//Init Middleware (Body parser to use req.body)
app.use(express.json({extended : false}));


//Define the routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));