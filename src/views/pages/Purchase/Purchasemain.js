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
//               <TableCell>Sr. No</TableCell>
//               <TableCell>Material</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Unit</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {purchase.map((row, index) => (
//               <TableRow key={row.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{row.material}</TableCell>
//                 <TableCell>{row.quantity}</TableCell>
//                 <TableCell>{row.unit}</TableCell>
//                 <TableCell>{row.amount}</TableCell>
//                 <TableCell>
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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deletePurchase, getPurchase } from "store/Purchase/purchaseAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";

function Purchasemain() {
  const purchases = useSelector((state) => state.purchase.purchases);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    dispatch(getPurchase());
  }, [dispatch]);

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

  return (
    <>
      <MainCard
        title="Purchases"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-purchase")}
          >
            Add Purchase
          </Button>
        }
      >
        {purchases.length === 0 ? (
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
                <TableCell>Sr. No</TableCell>
                <TableCell>Material</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.material}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>L£{row.amount}</TableCell>
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
