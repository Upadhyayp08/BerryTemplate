import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, TextField, Grid, Box, MenuItem } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function Addexpense() {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values); // Access form values
      setSubmitting(false); // Set submitting state to false
      navigate('/other-page'); // Redirect after submission
    }, 1000);
  };

  return (
    <MainCard title="Add Expense">
      <Formik
        initialValues={{
          expenseName: '',
          employeeName: '',
          quantity: '',
          unit: '',
          amount: '',
          comments: ''
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              {/* First Line: Expense Name, Employee Name */}
              <Grid item xs={12} sm={6}>
                <Field name="expenseName" as={TextField} label="Expense Name" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="employeeName" as={TextField} label="Employee Name" fullWidth variant="outlined" />
              </Grid>

              {/* Second Line: Quantity, Unit, Amount */}
              <Grid item xs={12} sm={4}>
                <Field name="quantity" as={TextField} label="Quantity" fullWidth variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field component={TextField} type="text" name="unit" label="Unit" select fullWidth variant="outlined">
                  <MenuItem value="">Select Unit</MenuItem>
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="pcs">Pieces</MenuItem>
                  {/* Additional units can be added here */}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field name="amount" as={TextField} label="Amount" fullWidth variant="outlined" />
              </Grid>

              {/* Third Line: Comments */}
              <Grid item xs={12}>
                <Field name="comments" as={TextField} label="Comments" fullWidth multiline variant="outlined" rows={4} />
              </Grid>

              <Grid item xs={12}>
                <Box mt={2}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
}

export default Addexpense;
