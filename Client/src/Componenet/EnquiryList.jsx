import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from 'axios';



const EnquiryList = ({data , handleView , setFormData}) => { 

 const handleDelete = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8010/api/enquiry/delete/${id}`
    );

    if (response.status === 200 && response.data.status) {
      console.log("Enquiry Deleted Successfully");
      handleView();
    }
  } catch (err) {
    console.error("Error in deleting enquiry", err.response?.data || err);
  }
};


const handleUpdate = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8010/api/enquiry/single/${id}`
    );
setFormData(response.data.data);
    if (response.status === 200 && response.data.status) {
      console.log("Enquiry Fetched Successfully");
      // Update the form data with the fetched enquiry details
      // This would typically involve calling a function to update the parent component's state
    }
  } catch (err) {
    console.error("Error in fetching enquiry", err.response?.data || err);
  }
};


  return (
    <div>
            <h4 className="text-lg font-semibold mb-4 text-center">Enquiry List</h4>
             <div className="overflow-x-auto">
      <Table striped >
        <TableHead>
           <TableHeadCell className='text-center'>ID</TableHeadCell>
          <TableHeadCell className='text-center'>Name</TableHeadCell>
          <TableHeadCell className='text-center'>Email</TableHeadCell>
          <TableHeadCell className='text-center'>Phone</TableHeadCell>
          <TableHeadCell className='text-center'>Message</TableHeadCell>
          <TableHeadCell className='text-center'>Edit</TableHeadCell>
           <TableHeadCell className='text-center'>Delete</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {data.length === 0 ? (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={6} className="whitespace-nowrap font-medium text-gray-900 dark:text-white text-center">
                No Enquiries Found
              </TableCell>
            </TableRow>
          ) : (

            data.map((item,index) => {
              return (  
              <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell>{index+1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>
              < button onClick={() => {handleUpdate(item._id)}} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                Edit
              </button>
            </TableCell>
             <TableCell>
              < button onClick={() => {handleDelete(item._id)}} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                Delete
              </button>
            </TableCell>
          </TableRow>
         ) }))} 
         
        </TableBody>
      </Table>
    </div>

    </div>
  )
}

export default EnquiryList
