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
import { deleteStock, getStock } from "store/Stock/stockActions";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

function Stockmain() {
  const sales = useSelector((state) => state.sale.sales);
  const stock = useSelector((state) => state.stock.stocks);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getStock()).then((res) => setLoading(false));
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
      dispatch(deleteStock({ id: selectedPurchase.id })).then(() => {
        dispatch(getStock());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (purchase) => {
    navigate(`/add-stock/${purchase.id}`);
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
        title="Stock"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-stock")}
          >
            Add Stock
          </Button>
        }
      >
        {stock.length === 0 ? (
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
                <TableCell align="center">Sr. No</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Available Stock</TableCell>
                {/* <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Payment Status</TableCell> */}
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stock.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.Item}</TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                  {/* <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.paid_status}</TableCell> */}
                  <TableCell align="center">
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

export default Stockmain;
