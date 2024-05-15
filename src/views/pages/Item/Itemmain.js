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
import { deleteExpense, getExpense } from "store/Expense/expenseAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import { deleteItem, getItem } from "store/Item/itemActions";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

const Itemmain = () => {
  const items = useSelector((state) => state.item.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getItem()).then((res) => setLoading(false));
  }, [dispatch]);

  const handleOpenDialog = (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      dispatch(deleteItem({ id: selectedExpense.id })).then(() => {
        dispatch(getItem());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (expense) => {
    navigate(`/add-item/${expense.id}`);
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
        title="Item"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-item")}
          >
            Add Item
          </Button>
        }
      >
        {items.length === 0 ? (
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
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Item Code</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Unit</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{expense.name}</TableCell>
                  <TableCell align="center">{expense.item_code}</TableCell>
                  <TableCell align="center">{expense.quantity}</TableCell>
                  <TableCell align="center">{expense.unit}</TableCell>
                  <TableCell align="center">L£{expense.amount}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(expense)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => handleOpenDialog(expense)}
                    >
                      <Delete />
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
};

export default Itemmain;
