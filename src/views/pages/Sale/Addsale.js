import React, { useState, useEffect } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import {
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Divider,
  IconButton,
  Grid,
  FormHelperText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";
import { DeleteRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { readCustomer } from "store/Customer/customerActions";
import { getMaterial } from "store/Material/materialAction";
import { useNavigate, useParams } from "react-router";
import { createSale, SaleById, updateSale } from "store/Sale/saleActions";
import Loader from "ui-component/Loader";
import { getItem } from "store/Item/itemActions";

const Addsale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const customers = useSelector((state) => state.customer.customers);
  const materials = useSelector((state) => state.material.materials);
  const items = useSelector((state) => state.item.items);
  const salebyid = useSelector((state) => state.sale.salebyid);
  const statusOptions = [
    { id: 1, name: "Paid" },
    { id: 2, name: "UnPaid" },
  ];
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(SaleById(id)).then((res) => setLoading(false));
    } else {
      setLoading(false);
    }
    dispatch(readCustomer());
    dispatch(getMaterial());
    dispatch(getItem());
  }, []);

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date

  const initialValues = {
    id: id ? salebyid.id : "",
    customer_id: id ? salebyid.customer : "",
    item: id ? salebyid.item : [{ item: "", qty: "" }],
    invoice_no: id ? salebyid.invoice_no : "",
    date: id ? salebyid.date : currentDate,
    amount: id ? salebyid.amount : "",
    paid_status: id ? salebyid.paid_status : "",
  };

  const validationSchema = Yup.object().shape({
    customer_id: Yup.string().required("Customer name is required"),
    item: Yup.array().of(
      Yup.object().shape({
        item: Yup.string().required("Item is required"),
        qty: Yup.number()
          .positive("Quantity must be greater than zero")
          .required("Quantity is required"),
      })
    ),
    invoice_no: Yup.string().required("Invoice number is required"),
    date: Yup.date().required("Date is required"),
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
    paid_status: Yup.string().required("Status is required"),
  });

  const formControlStyle = {
    marginTop: 8,
    marginBottom: 8,
    minHeight: "72px", // Adjust this value to match your design
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MainCard title="Add Sale">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (id) {
            dispatch(updateSale(values)).then((res) => navigate("/sale"));
          } else {
            dispatch(createSale(values)).then((Res) => navigate("/sale"));
          }
        }}
      >
        {({
          values,
          handleChange,
          setFieldValue,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
            <FormControl
              fullWidth
              disabled={!!id}
              margin="normal"
              style={formControlStyle}
              error={touched.customer_id && !!errors.customer_id}
            >
              <InputLabel>Customer Name</InputLabel>
              <Field
                name="customer_id"
                as={Select}
                onChange={handleChange}
                label="Customer Name"
              >
                <MenuItem selected value={""}>
                  Select a Customer
                </MenuItem>
                {customers.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Field>
              <FormHelperText>
                {touched.customer_id && errors.customer_id
                  ? errors.customer_id
                  : " "}
              </FormHelperText>
            </FormControl>

            <Divider style={{ margin: "20px 0" }} />

            <FieldArray name="item">
              {({ push, remove }) => (
                <div>
                  {values?.item?.map((item, index) => (
                    <Grid container spacing={1} key={index} alignItems="center">
                      <Grid item xs={12} sm={5} lg={6}>
                        <FormControl
                          fullWidth
                          disabled={!!id}
                          margin="normal"
                          error={
                            touched.item?.[index]?.item &&
                            !!errors.item?.[index]?.item
                          }
                          style={formControlStyle}
                        >
                          <InputLabel>Item</InputLabel>
                          <Field
                            name={`item.${index}.item`}
                            as={Select}
                            onChange={handleChange}
                            label="Item"
                          >
                            {items.map((option, i) => (
                              <MenuItem key={i} value={option.id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </Field>
                          <FormHelperText>
                            {touched.item?.[index]?.item &&
                            errors.item?.[index]?.item
                              ? errors.item?.[index]?.item
                              : " "}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={5} lg={5}>
                        <TextField
                          fullWidth
                          disabled={!!id}
                          name={`item.${index}.qty`}
                          value={item.qty}
                          onChange={handleChange}
                          type="number"
                          label="Quantity"
                          error={
                            touched.item?.[index]?.qty &&
                            !!errors.item?.[index]?.qty
                          }
                          helperText={
                            touched.item?.[index]?.qty
                              ? errors.item?.[index]?.qty
                              : " "
                          }
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={2} lg={1}>
                        <IconButton
                          onClick={() => remove(index)}
                          color="error"
                          sx={{ marginBottom: "25px" }}
                        >
                          <DeleteRounded />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => push({ item: "", qty: "" })}
                  >
                    Add Item
                  </Button>
                </div>
              )}
            </FieldArray>
            <Divider style={{ margin: "20px 0" }} />

            <Grid container spacing={3}>
              <Grid item lg={6}>
                <TextField
                  fullWidth
                  disabled={!!id}
                  name="invoice_no"
                  value={values.invoice_no}
                  onChange={handleChange}
                  label="Invoice No"
                  error={touched.invoice_no && !!errors.invoice_no}
                  helperText={touched.invoice_no ? errors.invoice_no : " "}
                  margin="normal"
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  fullWidth
                  disabled={!!id}
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.date && !!errors.date}
                  helperText={touched.date ? errors.date : " "}
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Grid container spacing={3} alignitem="center">
              <Grid item lg={6}>
                <TextField
                  fullWidth
                  name="amount"
                  value={values.amount}
                  disabled={!!id}
                  onChange={handleChange}
                  type="number"
                  label="Amount"
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount ? errors.amount : " "}
                  margin="normal"
                />
              </Grid>
              <Grid item lg={6}>
                <FormControl
                  fullWidth
                  disabled={!!id && values.paid_status == 1}
                  margin="normal"
                  error={touched.paid_status && !!errors.paid_status}
                  style={formControlStyle}
                >
                  <InputLabel>Status</InputLabel>
                  <Field
                    name="paid_status"
                    as={Select}
                    onChange={handleChange}
                    label="Status"
                  >
                    {statusOptions.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Field>
                  <FormHelperText>
                    {touched.paid_status && errors.paid_status
                      ? errors.paid_status
                      : " "}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default Addsale;
