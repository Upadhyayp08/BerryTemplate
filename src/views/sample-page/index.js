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

const SamplePage = ({ readCustomer, customers }) => {
  const customer = useSelector((state) => state.customer.customers);

  console.log(customer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/add-product");
  };

  useEffect(() => {
    readCustomer();
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

  const handleDelete = (customer) => {
    console.log(customer);
    dispatch(deleteCustomer({ id: customer.id })).then((res) => {
      readCustomer();
    });
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
            onClick={() => handleClick()}
          >
            Add Customer
          </Button>
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supermarket</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>POC Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customer.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.supermarket}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.poc_name}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <Edit onClick={(e) => handleEdit(row)} />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
                    <Delete onClick={(e) => handleDelete(row)} />
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

const mapStateToProps = (state) => ({
  customers: state.customer, // Assuming your reducer stores customer data in state.customer.customers
});

const mapDispatchToProps = {
  readCustomer,
  // deleteCustomer,
};

// export default SamplePage;
export default connect(mapStateToProps, mapDispatchToProps)(SamplePage);
