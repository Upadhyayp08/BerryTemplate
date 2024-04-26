import React, { useEffect, useState } from "react";
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
import { deleteMATERIAL, getMaterial } from "store/Material/materialAction";
function Materialmain() {
  const material = useSelector((state) => state.material.materials);
  console.log(material);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate("/add-material");
  };
  useEffect(() => {
    dispatch(getMaterial());
  }, []);

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

  const handleDelete = (material) => {
    dispatch(deleteMATERIAL({ id: material.id })).then((res) => {
      dispatch(getMaterial());
    });
  };

  const handleEdit = (material) => {
    navigate(`/add-material/${material.id}`);
  };

  return (
    <>
      <MainCard
        title="Material"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick()}
          >
            Add Material
          </Button>
        }
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {material.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" aria-label="edit">
                    <Edit onClick={() => handleEdit(row)} />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete">
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
}

export default Materialmain;
