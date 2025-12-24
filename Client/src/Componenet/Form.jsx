import React , {useState } from 'react'
import axios from 'axios';
import { Button, Checkbox, Label, TextInput ,Textarea  } from "flowbite-react";
import EnquiryList from './EnquiryList.jsx';
import { useEffect } from 'react';


const Form = () => {
  //controlled


const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  message: '',
  id : ''
});

const [enquiryList ,setEnquiryList] = useState([]);

const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData._id){
    try {
      const response = await axios.put(`http://localhost:8010/api/enquiry/update/${formData._id}`, formData);
      if(response.data.status){
        console.log("Enquiry Updated Successfully");
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          _id : ''
        });
          handleView();
      }
    }
    catch (err ){
      console.log("Error in updating enquiry");
    }
  }
    else{
    try {
      const response = await axios.post("http://localhost:8010/api/enquiry/insert", formData);
      if(response.data.status){
        console.log("Enquiry Submitted Successfully");
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
          handleView();
      }
    }
    catch (err ){
      console.log("Error in submitting enquiry");
    }
  }
};


const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
}



const handleView =async () => {
  try{
    const response = await axios.get("http://localhost:8010/api/enquiry/view");
    if(response.data.status){
      setEnquiryList(response.data.data);
      console.log("Enquiry Fetched Successfully");

      
    }

  }catch(err){
    console.log("Error in fetching enquiry");
  }
}

useEffect(() => {
  handleView();
}, []);




    //uncontrolled 

//   const handleSubmit =async(e) =>{
//     e.preventDefault();
//     try{
//  const formData = {
//       name : e.target.name.value,
//       email : e.target.email.value,
//       phone : e.target.phone.value,
//       message : e.target.message.value
//     }
//     const response = await axios.post("http://localhost:8010/api/enquiry/insert", formData);
//     if(response.data.status){
//       console.log("Enquiry Submitted Successfully");
//       e.target.reset();
//     }
//   }catch(err){
//     console.log("Error in submitting enquiry");
//   }
// }
    
  return (
  <div>
  <h1 className="text-3xl font-bold py-6 text-center bg-amber-400">
    Enquiry Details
  </h1>

  <div className="flex gap-6 px-10  mt-10">
    
    <div className="flex-1">
      <form className="flex flex-col gap-4 border bg-sky-100 rounded-lg  w-96 p-6" onSubmit={handleSubmit}>
        <h4 className="text-center text-lg font-semibold">
          Enquiry Form
        </h4>

        <div>
          <Label htmlFor="name">Your Name</Label>
          <TextInput name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Your Name" required />
        </div>

        <div>
          <Label htmlFor="email">Your Email</Label>
          <TextInput name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="name@flowbite.com" required />
        </div>

        <div>
          <Label htmlFor="phone">Your Phone</Label>
          <TextInput name="phone" value={formData.phone} onChange={handleInputChange} type="text" placeholder="Your Phone Number" required />
        </div>
         <div>
          <Label htmlFor="message">Your Message</Label>
          <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Write your message" required rows={4} />       
          </div>
{formData._id ? (
 <Button type="submit">Update</Button>
): (
  <Button type="submit">Save</Button>
)}
       
      </form>
    </div>

    <div className="flex-1 border rounded-lg p-6 bg-sky-100">
    <EnquiryList data={enquiryList} handleView={handleView} setFormData={setFormData} />
    </div>

  </div>
</div>

      
  )
}

export default Form
