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
import { useNavigate, useParams } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deletePurchase, getPurchase } from "store/Purchase/purchaseAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import { deleteSale, getSale, SaleById } from "store/Sale/saleActions";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

function Salemain() {
  const sales = useSelector((state) => state.sale.sales);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getSale()).then((Res) => setLoading(false));
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
      dispatch(deleteSale({ id: selectedPurchase.id })).then(() => {
        dispatch(getSale());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (purchase) => {
    navigate(`/add-sale/${purchase.id}`);
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
        title="Sales"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-sale")}
          >
            Add Sale
          </Button>
        }
      >
        {sales.length === 0 ? (
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
                <TableCell>Customer</TableCell>
                <TableCell>Invoice No.</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell>{row.invoice_no}</TableCell>
                  <TableCell>L£{row.amount}</TableCell>
                  <TableCell>{row.paid_status}</TableCell>
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

export default Salemain;
