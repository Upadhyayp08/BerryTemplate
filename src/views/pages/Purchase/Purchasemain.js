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
// import { useDispatch, useSelector } from "react-redux";
// import { deletePurchase, getPurchase } from "store/Purchase/purchaseAction";

// function Purchasemain() {
//   const purchase = useSelector((state) => state.purchase.purchases);
//   console.log(purchase);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleClick = () => {
//     navigate("/add-purchase");
//   };

//   useEffect(() => {
//     dispatch(getPurchase());
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
//   const handleEdit = (purchase) => {
//     navigate(`/add-purchase/${purchase.id}`);
//   };

//   const handleDelete = (purchase) => {
//     dispatch(deletePurchase({ id: purchase.id })).then((res) => {
//       dispatch(getPurchase());
//     });
//   };
//   return (
//     <>
//       <MainCard
//         title="Purchases"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleClick()}
//           >
//             Add Purchase
//           </Button>
//         }
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">Sr. No</TableCell>
//               <TableCell align="center">Material</TableCell>
//               <TableCell align="center">Quantity</TableCell>
//               <TableCell align="center">Unit</TableCell>
//               <TableCell align="center">Amount</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {purchase.map((row, index) => (
//               <TableRow key={row.id}>
//                 <TableCell align="center">{index + 1}</TableCell>
//                 <TableCell align="center">{row.material}</TableCell>
//                 <TableCell align="center">{row.quantity}</TableCell>
//                 <TableCell align="center">{row.unit}</TableCell>
//                 <TableCell align="center">{row.amount}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" aria-label="edit">
//                     <Edit onClick={() => handleEdit(row)} />
//                   </IconButton>
//                   <IconButton color="secondary" aria-label="delete">
//                     <Delete
//                       onClick={() => handleDelete(row)}
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
// }

// export default Purchasemain;

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
import { useDispatch, useSelector } from "react-redux";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { deletePurchase, getPurchase } from "store/Purchase/purchaseAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

function Purchasemain() {
  const purchases = useSelector((state) => state.purchase.purchases);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getPurchase({ page, page_size: rowsPerPage })).then((res) =>
      setLoading(false)
    );
  }, [dispatch, page, rowsPerPage]);

  console.log(purchases);

  const handleOpenDialog = (purchase) => {
    setSelectedPurchase(purchase);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPurchase) {
      dispatch(deletePurchase({ id: selectedPurchase.id })).then(() => {
        dispatch(getPurchase());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (purchase) => {
    navigate(`/add-purchase/${purchase.id}`);
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
        title="Purchases"
        secondary={
          <Button
            variant="contained"
            sx={{
              color: "white", // Set font color to white
            }}
            color="primary"
            onClick={() => navigate("/add-purchase")}
          >
            Add Purchase
          </Button>
        }
      >
        {purchases.data.length === 0 ? (
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
                  <TableCell align="center">Material</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.data.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.material}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">{row.unit}</TableCell>
                    <TableCell align="center">L£{row.amount}</TableCell>
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
              count={purchases?.total}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </>
        )}

        {openDialog && (
          <DeleteConfirmationDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        )}
      </MainCard>
    </>
  );
}

export default Purchasemain;
