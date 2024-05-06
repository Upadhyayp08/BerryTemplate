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
import NoDataImage from "../../../assets/images/NoData.png";

const Expensemain = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    dispatch(getExpense());
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
      dispatch(deleteExpense({ id: selectedExpense.id })).then(() => {
        dispatch(getExpense());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (expense) => {
    navigate(`/add-expense/${expense.id}`);
  };

  return (
    <>
      <MainCard
        title="Expense"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-expense")}
          >
            Add Expense
          </Button>
        }
      >
        {expenses.length === 0 ? (
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
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={expense.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{expense.name}</TableCell>
                  <TableCell>{expense.quantity}</TableCell>
                  <TableCell>{expense.unit}</TableCell>
                  <TableCell>L£{expense.amount}</TableCell>
                  <TableCell>
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

export default Expensemain;
