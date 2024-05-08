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
// import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
// import NoDataImage from "../../assets/images/NoData.png";

// const SamplePage = ({ readCustomer }) => {
//   const customers = useSelector((state) => state.customer.customers);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   useEffect(() => {
//     readCustomer();
//   }, [readCustomer]);

//   const handleOpenDialog = (customer) => {
//     setSelectedCustomer(customer);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedCustomer) {
//       dispatch(deleteCustomer({ id: selectedCustomer.id })).then(() => {
//         readCustomer();
//         setOpenDialog(false);
//       });
//     }
//   };

//   const handleEdit = (customer) => {
//     navigate(`/add-customer/${customer.id}`);
//   };

//   return (
//     <>
//       <MainCard
//         title="Customers"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate("/add-customer")}
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
//             {customers.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.phone}</TableCell>
//                 <TableCell>{row.email}</TableCell>
//                 <TableCell>{row.poc_name}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEdit(row)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleOpenDialog(row)}
//                   >
//                     <Delete sx={{ color: "red" }} />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <DeleteConfirmationDialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           onConfirm={handleConfirmDelete}
//         />
//       </MainCard>
//     </>
//   );
// };

// const mapStateToProps = (state) => ({
//   customers: state.customer.customers,
// });

// const mapDispatchToProps = {
//   readCustomer,
// };

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
import Loader from "ui-component/Loader";

const SamplePage = ({ readCustomer }) => {
  const customers = useSelector((state) => state.customer.customers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readCustomer().then((res) => setLoading(false));
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
    navigate(`/add-customer/${customer.id}`);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <MainCard
        title="Customers"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-customer")}
          >
            Add Customer
          </Button>
        }
      >
        {customers.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              flexDirection: "column", // Added to stack elements vertically
            }}
          >
            <div>
              <img src={NoDataImage} alt="No Data" />
            </div>
            <div>
              <h1>No Data Found</h1>
            </div>
          </div>
        ) : (
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
        )}
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
