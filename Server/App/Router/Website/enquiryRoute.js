let express = require('express');
let enquiryRoutes = express.Router();
let {enquiryInsert , enquiryView , enquiryDelete , enquirySingle , enquiryUpdate} = require('../../Controller/Website/enquiryController');


enquiryRoutes.post("/insert", enquiryInsert);
enquiryRoutes.get("/view", enquiryView);
enquiryRoutes.delete("/delete/:id", enquiryDelete);
enquiryRoutes.get("/single/:id", enquirySingle);
enquiryRoutes.put("/update/:id", enquiryUpdate);
module.exports = enquiryRoutes;