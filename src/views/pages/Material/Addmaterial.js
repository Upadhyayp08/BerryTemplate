import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { Button, TextField, Grid, Box } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import {
  createMaterial,
  MaterialById,
  updateMaterial,
} from "store/Material/materialAction";
import Loader from "ui-component/Loader";

function AddMaterial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const materialbyid = useSelector((state) => state.material.materialbyid);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(MaterialById(id)).then(() => {
        setLoading(false); // Set loading to false once data is fetched
      });
    } else {
      setLoading(false); // Set loading to false if no id is present
    }
  }, [id]); // Make sure to include id in the dependency array

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required") // Validation rule: the name is required
      .min(2, "Name must be at least 2 characters long"), // Minimum length requirement
  });

  const handleSubmit = (values, { setSubmitting }) => {
    if (id) {
      dispatch(updateMaterial(values)).then((res) => {
        navigate("/material");
      });
    } else {
      dispatch(createMaterial(values)).then((res) => {
        navigate("/material");
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // Display a loading indicator while data is being fetched
  }

  return (
    <MainCard title="Add Material">
      <Formik
        initialValues={{
          id: id ? materialbyid.id : "",
          name: id ? materialbyid.name : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  name="name"
                  as={TextField}
                  label="Name*"
                  fullWidth
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name} // Show validation errors
                />
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                type="submit"
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

export default AddMaterial;
