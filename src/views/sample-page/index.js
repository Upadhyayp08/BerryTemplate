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
//               <TableCell align="center">Name</TableCell>
//               <TableCell align="center">Phone</TableCell>
//               <TableCell align="center">Email</TableCell>
//               <TableCell align="center">POC Name</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customers.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell align="center">{row.name}</TableCell>
//                 <TableCell align="center">{row.phone}</TableCell>
//                 <TableCell align="center">{row.email}</TableCell>
//                 <TableCell align="center">{row.poc_name}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" onClick={() => handleEdit(row)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     color="secondary"
//                     onClick={() => handleOpenDialog(row)}
//                   >
//                     <IconTrash style={{ color: "red" }} />
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
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { deleteCustomer, readCustomer } from "store/Customer/customerActions";
import { connect, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IconEdit, IconTrash } from "@tabler/icons-react";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    readCustomer({ page: page + 1, page_size: rowsPerPage }).then((res) =>
      setLoading(false)
    );
  }, [readCustomer, page, rowsPerPage]);

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
        readCustomer({ page: 1, page_size: 5 });
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (customer) => {
    navigate(`/add-customer/${customer.id}`);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            sx={{
              color: "white", // Set font color to white
            }}
            onClick={() => navigate("/add-customer")}
          >
            Add Customer
          </Button>
        }
      >
        {customers.total === 0 ? (
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
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr. No</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">POC Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.data?.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.poc_name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(row)}
                      >
                        <IconEdit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenDialog(row)}
                      >
                        <IconTrash style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{ px: 2, textAlign: "right" }}
              page={page}
              component="div"
              className="page"
              rowsPerPage={rowsPerPage}
              count={customers.total}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </>
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
