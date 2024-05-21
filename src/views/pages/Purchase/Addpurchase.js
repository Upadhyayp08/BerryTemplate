// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; // Import Yup for validation
// import { Button, TextField, Grid, Box, MenuItem } from "@mui/material";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getMaterial } from "store/Material/materialAction";
// import {
//   createPurchase,
//   PurchaseById,
//   updatePurchase,
// } from "store/Purchase/purchaseAction";
// import Loader from "ui-component/Loader";

// function AddPurchase() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true); // Add loading state
//   const materialData = useSelector((state) => state?.material?.materials);
//   const purchasebyid = useSelector((state) => state?.purchase?.purchasebyid);
//   const { id } = useParams();

//   useEffect(() => {
//     dispatch(getMaterial());
//   }, []);

//   useEffect(() => {
//     if (id) {
//       dispatch(PurchaseById(id)).then(() => {
//         setLoading(false); // Set loading to false once data is fetched
//       });
//     } else {
//       setLoading(false); // Set loading to false if no id is present
//     }
//   }, [id]); // Make sure to include id in the dependency array

//   // Validation Schema
//   const validationSchema = Yup.object().shape({
//     material: Yup.number().required("Material is required"),
//     quantity: Yup.number()
//       .required("Quantity is required")
//       .positive("Quantity must be positive")
//       .integer("Quantity must be an integer"),
//     unit: Yup.string().required("Unit is required"),
//     amount: Yup.number()
//       .required("Amount is required")
//       .positive("Amount must be positive"),
//     // comment: Yup.string()
//     //   .trim()
//     //   .max(200, "Comment must be no more than 200 characters"),
//   });

//   // const handleSubmit = (values, { setSubmitting }) => {
//   //   console.log(values);
//   //   dispatch(createPurchase(values)).then((res) => {
//   //     navigate("/purchase");
//   //   });
//   // };

//   const handleSubmit = (values) => {
//     if (id) {
//       dispatch(updatePurchase(values)).then((res) => {
//         navigate("/purchase");
//       });
//     } else {
//       dispatch(createPurchase(values)).then((res) => {
//         navigate("/purchase");
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     ); // Display a loading indicator while data is being fetched
//   }

//   return (
//     <MainCard title={id ? "Edit Purchase" : "Add Purchase"}>
//       <Formik
//         initialValues={{
//           id: id ? purchasebyid.id : "",
//           material: id ? purchasebyid.material : "",
//           quantity: id ? purchasebyid.quantity : "",
//           unit: id ? purchasebyid.unit : "",
//           amount: id ? purchasebyid.amount : "",
//           comment: id ? purchasebyid.comment : "",
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, errors, touched, handleChange }) => (
//           <Form>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="material"
//                   label="Material Name*"
//                   onChange={handleChange}
//                   select
//                   fullWidth
//                   variant="outlined"
//                   error={touched.material && Boolean(errors.material)}
//                   helperText={touched.material && errors.material}
//                 >
//                   <MenuItem value="">Select Material</MenuItem>
//                   {materialData.map((item) => (
//                     <MenuItem key={item.id} value={item.id}>
//                       {item.name}
//                     </MenuItem>
//                   ))}
//                 </Field>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   name="quantity"
//                   label="Quantity*"
//                   onChange={handleChange}
//                   fullWidth
//                   variant="outlined"
//                   error={touched.quantity && Boolean(errors.quantity)}
//                   helperText={touched.quantity && errors.quantity}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="unit"
//                   label="Unit*"
//                   select
//                   fullWidth
//                   onChange={handleChange}
//                   variant="outlined"
//                   error={touched.unit && Boolean(errors.unit)}
//                   helperText={touched.unit && errors.unit}
//                 >
//                   <MenuItem value="">Select Unit</MenuItem>
//                   <MenuItem value="kg">Kg</MenuItem>
//                   <MenuItem value="g">Gram</MenuItem>
//                   <MenuItem value="l">litre</MenuItem>
//                   <MenuItem value="ml">MilliLitre</MenuItem>
//                   <MenuItem value="pcs">Pieces</MenuItem>
//                   {/* Additional units can be added here */}
//                 </Field>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   onChange={handleChange}
//                   name="amount"
//                   label="Amount*"
//                   fullWidth
//                   variant="outlined"
//                   error={touched.amount && Boolean(errors.amount)}
//                   helperText={touched.amount && errors.amount}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Field
//                   as={TextField}
//                   type="text"
//                   name="comment"
//                   label="Comment"
//                   fullWidth
//                   multiline
//                   onChange={handleChange}
//                   variant="outlined"
//                   rows={4}
//                   // error={touched.comment && Boolean(errors.comment)}
//                   // helperText={touched.comment && errors.comment}
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

// export default AddPurchase;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import { Button, TextField, Grid, Box, MenuItem } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { getMaterial } from "store/Material/materialAction";
import {
  createPurchase,
  PurchaseById,
  updatePurchase,
} from "store/Purchase/purchaseAction";
import Loader from "ui-component/Loader";

function AddPurchase() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add loading state
  const materialData = useSelector((state) => state?.material?.materials) || [];
  const purchasebyid =
    useSelector((state) => state?.purchase?.purchasebyid) || {};
  const { id } = useParams();

  const fetchMaterials = () => {
    setLoading(true);
    try {
      dispatch(getMaterial());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setLoading(false);
    }
  };

  const fetchPurchaseById = async () => {
    if (id) {
      try {
        await dispatch(PurchaseById(id));
      } catch (error) {
        console.error("Error fetching purchase by id:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Fetch materials data
    fetchMaterials();
  }, []);

  useEffect(() => {
    // Fetch purchase by ID if id is present
    setLoading(true);
    fetchPurchaseById().then((res) => setLoading(false));
  }, [id, dispatch]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    material: Yup.number().required("Material is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    unit: Yup.string().required("Unit is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    // comment: Yup.string()
    //   .trim()
    //   .max(200, "Comment must be no more than 200 characters"),
  });

  const handleSubmit = (values) => {
    const action = id ? updatePurchase : createPurchase;
    dispatch(action(values))
      .then(() => {
        navigate("/purchase");
      })
      .catch((error) => {
        console.error("Error creating/updating purchase:", error);
      });
  };

  if (loading) {
    return <Loader />; // Display a loading indicator while data is being fetched
  }

  return (
    <MainCard title={id ? "Edit Purchase" : "Add Purchase"}>
      <Formik
        initialValues={{
          id: id ? purchasebyid.id : "",
          material: id ? purchasebyid.material : "",
          quantity: id ? purchasebyid.quantity : "",
          unit: id ? purchasebyid.unit : "",
          amount: id ? purchasebyid.amount : "",
          comment: id ? purchasebyid.comment : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched, handleChange }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="text"
                  name="material"
                  label="Material Name*"
                  onChange={handleChange}
                  select
                  fullWidth
                  variant="outlined"
                  error={touched.material && Boolean(errors.material)}
                  helperText={touched.material && errors.material}
                >
                  <MenuItem value="">Select Material</MenuItem>
                  {materialData.length > 0 &&
                    materialData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  name="quantity"
                  label="Quantity*"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  error={touched.quantity && Boolean(errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  type="text"
                  name="unit"
                  label="Unit*"
                  select
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                  error={touched.unit && Boolean(errors.unit)}
                  helperText={touched.unit && errors.unit}
                >
                  <MenuItem value="">Select Unit</MenuItem>
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="gm">Gram</MenuItem>
                  <MenuItem value="l">Litre</MenuItem>
                  <MenuItem value="ml">Millilitre</MenuItem>
                  <MenuItem value="pcs">Pieces</MenuItem>
                  {/* Additional units can be added here */}
                </Field>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  as={TextField}
                  type="text"
                  onChange={handleChange}
                  name="amount"
                  label="Amount*"
                  fullWidth
                  variant="outlined"
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  type="text"
                  name="comment"
                  label="Comment"
                  fullWidth
                  multiline
                  onChange={handleChange}
                  variant="outlined"
                  rows={4}
                  // error={touched.comment && Boolean(errors.comment)}
                  // helperText={touched.comment && errors.comment}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
}

export default AddPurchase;
