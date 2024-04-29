// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { Button, TextField, Grid, Box, MenuItem } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getEmployee } from "store/Employee/employeeAction";
// import {
//   createExpense,
//   ExpenseById,
//   updateExpense,
// } from "store/Expense/expenseAction";

// function Addexpense() {
//   const employee = useSelector((state) => state.employee.employees);
//   const expense = useSelector((state) => state.expense.expensebyid);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(true); // Add loading state

//   console.log(expense, "expense");

//   useEffect(() => {
//     dispatch(getEmployee());
//   }, []);

//   useEffect(() => {
//     if (id) {
//       dispatch(ExpenseById(id)).then(() => {
//         setLoading(false); // Set loading to false once data is fetched
//       });
//     } else {
//       setLoading(false); // Set loading to false if no id is present
//     }
//   }, [id]); // Make sure to include id in the dependency array

//   const handleSubmit = (values, { setSubmitting }) => {
//     if (id) {
//       dispatch(updateExpense(values))
//         .then((res) => {
//           navigate("/expense");
//           setSubmitting(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       dispatch(createExpense(values))
//         .then((res) => {
//           navigate("/expense");
//           setSubmitting(false);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Display a loading indicator while data is being fetched
//   }

//   return (
//     <MainCard title="Add Expense">
//       <Formik
//         initialValues={{
//           name: id ? expense.name : "",
//           employee_id: id ? expense.employee_id : "",
//           quantity: id ? expense.quantity : "",
//           unit: id ? expense.unit : "",
//           amount: id ? expense.amount : "",
//           type: id ? expense.type : "",
//           comment: id ? expense.comment : "",
//         }}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, touched, errors }) => (
//           <Form>
//             <Grid container spacing={2}>
//               {/* First Line: Expense Name, Employee Name */}
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="name"
//                   as={TextField}
//                   label="Expense Name"
//                   fullWidth
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="employee_id"
//                   label="Employee"
//                   select
//                   fullWidth
//                   variant="outlined"
//                 >
//                   <MenuItem value="">Select Unit</MenuItem>
//                   {employee.map((item) => (
//                     <MenuItem key={item.id} value={item.id}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Field>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="type"
//                   label="Type"
//                   select
//                   fullWidth
//                   variant="outlined"
//                 >
//                   <MenuItem value="">Select Type</MenuItem>
//                   <MenuItem value="1">Goods</MenuItem>
//                   <MenuItem value="2">Non-Goods</MenuItem>
//                 </Field>
//               </Grid>

//               {/* Second Line: Quantity, Unit, Amount */}
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="quantity"
//                   as={TextField}
//                   label="Quantity"
//                   fullWidth
//                   variant="outlined"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="unit"
//                   label="Unit"
//                   select
//                   fullWidth
//                   variant="outlined"
//                 >
//                   <MenuItem value="">Select Unit</MenuItem>
//                   <MenuItem value="kg">Kg</MenuItem>
//                   <MenuItem value="g">Gram</MenuItem>
//                   <MenuItem value="l">litre</MenuItem>
//                   <MenuItem value="ml">MilliLitre</MenuItem>
//                   {/* Additional units can be added here */}
//                 </Field>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   name="amount"
//                   as={TextField}
//                   label="Amount"
//                   fullWidth
//                   variant="outlined"
//                 />
//               </Grid>

//               {/* Third Line: comment */}
//               <Grid item xs={12}>
//                 <Field
//                   name="comment"
//                   as={TextField}
//                   label="Comment"
//                   fullWidth
//                   multiline
//                   variant="outlined"
//                   rows={4}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Box mt={2}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={isSubmitting}
//                   >
//                     Submit
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//     </MainCard>
//   );
// }

// export default Addexpense;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Box, MenuItem } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "store/Employee/employeeAction";
import {
  createExpense,
  ExpenseById,
  updateExpense,
} from "store/Expense/expenseAction";
import Loader from "ui-component/Loader";

function AddExpense() {
  const employee = useSelector((state) => state.employee.employees);
  const expense = useSelector((state) => state.expense.expensebyid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getEmployee());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(ExpenseById(id)).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Expense name is required"),
    // employee_id: Yup.string().required("Employee is required"),
    // quantity: Yup.number()
    //   .required("Quantity is required")
    //   .positive("Quantity must be positive"),
    // unit: Yup.string().required("Unit is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    type: Yup.string().required("Type is required"),
    // comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const action = id ? updateExpense(values) : createExpense(values);
    dispatch(action)
      .then((res) => {
        navigate("/expense");
        setSubmitting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <MainCard title="Add Expense">
      <Formik
        initialValues={{
          name: id ? expense.name : "",
          employee_id: id ? expense.employee_id : "",
          quantity: id ? expense.quantity : "",
          unit: id ? expense.unit : "",
          amount: id ? expense.amount : "",
          type: id ? expense.type : "",
          comment: id ? expense.comment : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Field
                  name="name"
                  as={TextField}
                  label="Expense Name"
                  fullWidth
                  variant="outlined"
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  type="text"
                  name="employee_id"
                  label="Employee"
                  select
                  fullWidth
                  variant="outlined"
                  helperText={touched.employee_id && errors.employee_id}
                  error={touched.employee_id && Boolean(errors.employee_id)}
                >
                  <MenuItem value="">Select Employee</MenuItem>
                  {employee.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  type="text"
                  name="type"
                  label="Type"
                  select
                  fullWidth
                  variant="outlined"
                  helperText={touched.type && errors.type}
                  error={touched.type && Boolean(errors.type)}
                >
                  <MenuItem value="">Select Type</MenuItem>
                  <MenuItem value="1">Goods</MenuItem>
                  <MenuItem value="2">Non-Goods</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="quantity"
                  as={TextField}
                  label="Quantity"
                  fullWidth
                  variant="outlined"
                  helperText={touched.quantity && errors.quantity}
                  error={touched.quantity && Boolean(errors.quantity)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  type="text"
                  name="unit"
                  label="Unit"
                  select
                  fullWidth
                  variant="outlined"
                  helperText={touched.unit && errors.unit}
                  error={touched.unit && Boolean(errors.unit)}
                >
                  <MenuItem value="">Select Unit</MenuItem>
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="g">Gram</MenuItem>
                  <MenuItem value="l">litre</MenuItem>
                  <MenuItem value="ml">MilliLitre</MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="amount"
                  as={TextField}
                  label="Amount"
                  fullWidth
                  variant="outlined"
                  helperText={touched.amount && errors.amount}
                  error={touched.amount && Boolean(errors.amount)}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="comment"
                  as={TextField}
                  label="Comment"
                  fullWidth
                  multiline
                  variant="outlined"
                  rows={4}
                  helperText={touched.comment && errors.comment}
                  error={touched.comment && Boolean(errors.comment)}
                />
              </Grid>
              <Grid item xs={12}>
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
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

export default AddExpense;
