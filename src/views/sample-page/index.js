// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { deleteCustomer, readCustomer } from "store/Customer/customerActions";
// import { connect, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

// const SamplePage = ({ readCustomer, customers }) => {
//   const customer = useSelector((state) => state.customer.customers);

//   console.log(customer);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleClick = () => {
//     navigate("/add-product");
//   };

//   useEffect(() => {
//     readCustomer();
//   }, []);

//   // Sample data for the table
//   const rows = [
//     {
//       id: 1,
//       supermarket: "Supermarket 1",
//       phone: "123-456-7890",
//       email: "supermarket1@example.com",
//       pocName: "John Doe",
//     },
//     {
//       id: 2,
//       supermarket: "Supermarket 2",
//       phone: "987-654-3210",
//       email: "supermarket2@example.com",
//       pocName: "Jane Smith",
//     },
//     // Add more rows as needed
//   ];

//   const handleDelete = (customer) => {
//     console.log(customer);
//     dispatch(deleteCustomer({ id: customer.id })).then((res) => {
//       readCustomer();
//     });
//   };

//   const handleEdit = (customer) => {
//     navigate(`/add-product/${customer.id}`);
//   };

//   return (
//     <>
//       <MainCard
//         title="Customers"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleClick()}
//           >
//             Add Customer
//           </Button>
//         }
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>POC Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customer.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.phone}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>{row.poc_name}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" aria-label="edit">
//                     <Edit onClick={(e) => handleEdit(row)} />
//                   </IconButton>
//                   <IconButton color="secondary" aria-label="delete">
//                     <Delete
//                       onClick={(e) => handleDelete(row)}
//                       sx={{ color: "red" }}
//                     />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </MainCard>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   customers: state.customer, // Assuming your reducer stores customer data in state.customer.customers
// });

// const mapDispatchToProps = {
//   readCustomer,
//   // deleteCustomer,
// };

// // export default SamplePage;
// export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);

import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { deleteCustomer, readCustomer } from "store/Customer/customerActions";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../assets/images/NoData.png";

const SamplePage = ({ readCustomer }) => {
  const customers = useSelector((state) => state.customer.customers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    readCustomer();
  }, [readCustomer]);

  const handleOpenDialog = (customer) => {
    setSelectedCustomer(customer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCustomer) {
      dispatch(deleteCustomer({ id: selectedCustomer.id })).then(() => {
        readCustomer();
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (customer) => {
    navigate(`/add-product/${customer.id}`);
  };

  return (
    <>
      <MainCard
        title="Customers"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-product")}
          >
            Add Customer
          </Button>
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>POC Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.poc_name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenDialog(row)}
                  >
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DeleteConfirmationDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
        />
      </MainCard>
    </>
  );
};

const mapStateToProps = (state) => ({
  customers: state.customer.customers,
});

const mapDispatchToProps = {
  readCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);
