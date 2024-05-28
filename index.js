const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const token = require('./middleware/token');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(token);

app.use('/user', require('./routes/UserRoute'));
mongoose.connect('mongodb://localhost:27017/your-database-name')
.then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
})
.catch(err => {
    console.error(err);
});

