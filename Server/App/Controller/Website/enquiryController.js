let EnquiryModel = require('../../Model/Web/EnquiryModel');


let enquiryInsert = (async (req,res) => {
    try{
        let {name, email, phone, message} = req.body;

        let newEnquiry = await EnquiryModel.create({
            name,
            email,
            phone,
            message
        })

        res.status(200).json({status : true, message : "Enquiry Submitted Successfully" , data : newEnquiry});
    }
    catch(err){
        res.status(500).json({status : false, message : "Error in submitting enquiry"});
    }
});

let enquiryView = (async (req, res) => {
    try {
        let enquiries =await EnquiryModel.find();
        res.status(200).json({status : true, data : enquiries});    
    }
    catch(err) {
        res.status(500).json({status : false, message : "Error in fetching enquiries"});
    }
})

let enquiryDelete =async (req, res) => {
    try{
        let id =req.params.id;
        let deletedEnquiry = await EnquiryModel.findByIdAndDelete(id);
        res.status(200).json({status : true, message : "Enquiry Deleted Successfully", data : deletedEnquiry});

    }
    catch(err){
        res.status(500).json({status : false, message : "Error in deleting enquiry"});
}
}

let enquirySingle = async (req, res) => {
    try {
        let id = req.params.id;
        let enquirySingleData = await EnquiryModel.findById(id);
        res.status(200).json({status : true, data : enquirySingleData});
    }
    catch(err) {
        res.status(500).json({status : false, message : "Error in fetching enquiry"});
}
}

let enquiryUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        let {name, email, phone, message} = req.body;
        let updatedEnquiry = await EnquiryModel.findByIdAndUpdate(id, {
            name,
            email,
            phone,
            message
        }, {new : true});
        res.status(200).json({status : true, message : "Enquiry Updated Successfully", data : updatedEnquiry});
    }
    catch(err) {
        res.status(500).json({status : false, message : "Error in updating enquiry"});
}
}

module.exports = {enquiryInsert ,enquiryView , enquiryDelete , enquirySingle, enquiryUpdate};