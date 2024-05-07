import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import * as Yup from "yup";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getItem, ItemById, updateItem } from "store/Item/itemActions";
import { createStock, StockById } from "store/Stock/stockActions";

function Addstock() {
  const items = useSelector((state) => state.item.items);
  const stock = useSelector((state) => state.stock.stockbyid);
  console.log(items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(StockById(id));
    }
    dispatch(getItem());
  }, [dispatch]);

  const initialValues = {
    id: id ? stock.id : "",
    item_id: id ? stock.item_id : "",
    stock: id ? stock.stock : "",
  };

  const validationSchema = Yup.object().shape({
    item_id: Yup.string().required("Item Name is required"),
    stock: Yup.number().required("Stock is required"),
  });

  const onSubmit = (values) => {
    dispatch(createStock(values)).then((res) => navigate("/stock"));
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <MainCard title="Add Stock">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="item_id"
              name="item_id"
              label="Item Name*"
              variant="outlined"
              select
              value={formik.values.item_id}
              onChange={formik.handleChange}
              error={formik.touched.item_id && Boolean(formik.errors.item_id)}
              helperText={formik.touched.item_id && formik.errors.item_id}
            >
              {/* Replace the options below with your actual item names */}
              <MenuItem value="" disabled>
                Select Items
              </MenuItem>
              {items.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}

              {/* <MenuItem value="Item 2">Item 2</MenuItem>
               */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="stock"
              name="stock"
              label="Stock*"
              variant="outlined"
              value={formik.values.stock}
              onChange={formik.handleChange}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
              type="number"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "15px" }}
        >
          Submit
        </Button>
      </form>
    </MainCard>
  );
}

export default Addstock;
