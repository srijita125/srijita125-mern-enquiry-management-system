let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors')
 
let enquiryRoutes = require('./App/Router/Website/enquiryRoute');
require('dotenv').config();
let app = express();
app.use(express.json());
app.use(cors())


mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen((process.env.PORT),
  console.log(`Server is running on port ${process.env.PORT}`))
;}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
} );

app.use('/api/enquiry', enquiryRoutes);








