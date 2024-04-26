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

const Expensemain = () => {
  const expense = useSelector((state) => state.expense.expenses);
  console.log(expense);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/add-expense");
  };

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  // Sample data for the table
  const rows = [
    {
      id: 1,
      supermarket: "Supermarket 1",
      phone: "123-456-7890",
      email: "supermarket1@example.com",
      pocName: "John Doe",
    },
    {
      id: 2,
      supermarket: "Supermarket 2",
      phone: "987-654-3210",
      email: "supermarket2@example.com",
      pocName: "Jane Smith",
    },
    // Add more rows as needed
  ];

  const handleEdit = (expense) => {
    navigate(`/add-expense/${expense.id}`);
  };

  const handleDelete = (expense) => {
    dispatch(deleteExpense({ id: expense.id })).then((res) => {
      dispatch(getExpense());
    });
  };

  return (
    <>
      <MainCard
        title="Expense"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick()}
          >
            Add Expense
          </Button>
        }
      >
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
            {expense.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <Edit onClick={() => handleEdit(row)} />
                  </IconButton>
                  <IconButton aria-label="delete" style={{ color: "red" }}>
                    <Delete onClick={() => handleDelete(row)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MainCard>
    </>
  );
};

export default Expensemain;
