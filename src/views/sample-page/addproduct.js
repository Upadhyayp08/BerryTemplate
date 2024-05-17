import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, TextField, Grid, Box } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomer,
  CustomerById,
  readCustomer,
  updateCustomer,
} from "store/Customer/customerActions";
import { GETBYID_CUSTOMER } from "store/Customer/customerActionType";
import Loader from "ui-component/Loader";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const { id } = useParams();
  const customerbyid = useSelector((state) => state.customer.customerbyid);

  useEffect(() => {
    if (id) {
      dispatch(CustomerById(id)).then(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
    } else {
      setLoading(false); // Set loading to false if no id is present
    }
  }, [id]); // Make sure to include id in the dependency array

  const handleSubmit = (values, { setSubmitting }) => {
    if (id) {
      dispatch(updateCustomer(values)).then((res) => {
        dispatch(readCustomer()).then((res) => {
          navigate("/customer");
        });
      });
    } else {
      dispatch(createCustomer(values)).then((res) => {
        dispatch(readCustomer()).then((res) => {
          navigate("/customer");
        });
      });
    }
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    // poc_name: Yup.string().required("POC Name is required"),
    poc_phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .max(9, "Phone number must be at most 9 digits"),
    // .required("POC Phone is required"),
    // poc_email: Yup.string()
    //   .email("Invalid email")
    //   .required("POC Email is required"),
    name: Yup.string().required("Customer Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .max(9, "Phone number must be at most 9 digits")
      .required("Customer Phone is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Customer Email is required"),
    address: Yup.string().required("Customer Address is required"),
    website: Yup.string().required("URL Is Required"),
  });

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Display a loading indicator while data is being fetched
  }

  return (
    <MainCard title={id ? "Edit Customer" : "Add Customer"}>
      <Formik
        initialValues={{
          id: id ? customerbyid.id : "",
          poc_name: id ? customerbyid.poc_name : "",
          poc_phone: id ? customerbyid.poc_phone : "",
          poc_email: id ? customerbyid.poc_email : "",
          name: id ? customerbyid.name : "",
          phone: id ? customerbyid.phone : "",
          email: id ? customerbyid.email : "",
          address: id ? customerbyid.address : "",
          website: id ? customerbyid.website : "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema} // Pass validation schema to Formik
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field
                  name="poc_name"
                  as={TextField}
                  label="POC Name"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="poc_name" />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="poc_phone"
                  as={TextField}
                  label="POC Phone"
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="poc_phone" />
                </div>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="poc_email"
                  as={TextField}
                  label="POC Email"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="poc_email" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="name"
                  as={TextField}
                  label="Customer Name*"
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="name" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="website"
                  as={TextField}
                  label="Customer Website*"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="website" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="phone"
                  as={TextField}
                  label="Customer Phone*"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="phone" />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  name="email"
                  as={TextField}
                  label="Customer Email*"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="email" />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="address"
                  as={TextField}
                  label="Customer Address*"
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={4}
                  onChange={handleChange}
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="address" />
                </div>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button
                type="submit"
                sx={{
                  color: "white", // Set font color to white
                }}
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
}

export default AddProduct;
