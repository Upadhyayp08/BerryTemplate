import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { createItem, ItemById, updateItem } from "store/Item/itemActions";
import Loader from "ui-component/Loader";

function Additem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const itembyid = useSelector((state) => state.item.itembyid);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(ItemById({ id })).then((res) => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      id: id ? itembyid.id : "",
      name: id ? itembyid.name : "",
      item_code: id ? itembyid.item_code : "",
      quantity: id ? itembyid.quantity : "",
      unit: id ? itembyid.unit : "",
      amount: id ? itembyid.amount : "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (id) {
        dispatch(updateItem(values)).then((res) => navigate("/item"));
      } else {
        dispatch(createItem(values)).then((res) => navigate("/item"));
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.item_code) {
        errors.item_code = "Required";
      }
      if (!values.quantity) {
        errors.quantity = "Required";
      }
      if (!values.unit) {
        errors.unit = "Required";
      }
      if (!values.amount) {
        errors.amount = "Required";
      }
      return errors;
    },
  });

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <MainCard title={id ? "Edit Item" : "Add Item"}>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextField
                fullWidth
                margin="normal"
                id="name"
                name="name"
                label="Item Name*"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item lg={6}>
              {" "}
              <TextField
                fullWidth
                margin="normal"
                id="item_code"
                name="item_code"
                label="Item Code*"
                value={formik.values.item_code}
                onChange={formik.handleChange}
                error={
                  formik.touched.item_code && Boolean(formik.errors.item_code)
                }
                helperText={formik.touched.item_code && formik.errors.item_code}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item lg={4}>
              <TextField
                fullWidth
                margin="normal"
                id="quantity"
                name="quantity"
                label="Quantity per Pack*"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </Grid>
            <Grid item lg={4}>
              <FormControl
                fullWidth
                margin="normal"
                error={formik.touched.unit && Boolean(formik.errors.unit)}
              >
                <InputLabel id="unit-label">Unit</InputLabel>
                <Select
                  labelId="unit-label"
                  id="unit"
                  name="unit"
                  value={formik.values.unit}
                  label="Unit*"
                  onChange={formik.handleChange}
                  error={formik.touched.unit && Boolean(formik.errors.unit)}
                >
                  <MenuItem value="">
                    <em>Select Unit</em>
                  </MenuItem>
                  <MenuItem value="kg">Kilogram</MenuItem>
                  <MenuItem value="gm">Gram</MenuItem>
                  <MenuItem value="l">litre</MenuItem>
                  <MenuItem value="ml">MilliLiter</MenuItem>
                  <MenuItem value="pcs">Pieces</MenuItem>
                </Select>
                <FormHelperText>
                  {formik.touched.unit && formik.errors.unit}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <TextField
                fullWidth
                margin="normal"
                id="amount"
                name="amount"
                label="Amount Per Pack*"
                value={formik.values.amount}
                onChange={formik.handleChange}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            // sx={{ mt: 2 }}
            sx={{
              mt: 2,
              color: "white", // Set font color to white
            }}
          >
            Add Item
          </Button>
        </form>
      </Box>
    </MainCard>
  );
}

export default Additem;
