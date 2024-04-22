import React from 'react';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

const SamplePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/add-product');
  };

  // Sample data for the table
  const rows = [
    { id: 1, supermarket: 'Supermarket 1', phone: '123-456-7890', email: 'supermarket1@example.com', pocName: 'John Doe' },
    { id: 2, supermarket: 'Supermarket 2', phone: '987-654-3210', email: 'supermarket2@example.com', pocName: 'Jane Smith' }
    // Add more rows as needed
  ];

  return (
    <>
      <MainCard
        title="Customers"
        secondary={
          <Button variant="contained" color="primary" onClick={() => handleClick()}>
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.supermarket}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.pocName}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
                    <Delete />
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

export default SamplePage;
