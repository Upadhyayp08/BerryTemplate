// import React from "react";
// import { useFormik } from "formik";
// import { TextField, Button, Grid } from "@mui/material";
// import * as Yup from "yup";
// import MainCard from "ui-component/cards/MainCard";

// function Addstock() {
//   const initialValues = {
//     itemName: "",
//     stock: "",
//   };

//   const validationSchema = Yup.object().shape({
//     itemName: Yup.number().required("Item Name is required"),
//     stock: Yup.number().required("Stock is required"),
//   });

//   const onSubmit = (values) => {
//     console.log("Form values:", values);
//     // You can perform any additional actions such as submitting the data to an API
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <MainCard title="Add Stock">
//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               id="itemName"
//               name="itemName"
//               label="Item Name"
//               variant="outlined"
//               value={formik.values.itemName}
//               onChange={formik.handleChange}
//               error={formik.touched.itemName && Boolean(formik.errors.itemName)}
//               helperText={formik.touched.itemName && formik.errors.itemName}
//               type="number"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               id="stock"
//               name="stock"
//               label="Stock"
//               variant="outlined"
//               value={formik.values.stock}
//               onChange={formik.handleChange}
//               error={formik.touched.stock && Boolean(formik.errors.stock)}
//               helperText={formik.touched.stock && formik.errors.stock}
//               type="number"
//             />
//           </Grid>
//         </Grid>
//         <Button type="submit" variant="contained" color="primary">
//           Submit
//         </Button>
//       </form>
//     </MainCard>
//   );
// }

// export default Addstock;

import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Grid, MenuItem } from "@mui/material";
import * as Yup from "yup";
import MainCard from "ui-component/cards/MainCard";

function Addstock() {
  const initialValues = {
    itemName: "",
    stock: "",
  };

  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    stock: Yup.number().required("Stock is required"),
  });

  const onSubmit = (values) => {
    console.log("Form values:", values);
    // You can perform any additional actions such as submitting the data to an API
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <MainCard title="Add Stock">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="itemName"
              name="itemName"
              label="Item Name"
              variant="outlined"
              select
              value={formik.values.itemName}
              onChange={formik.handleChange}
              error={formik.touched.itemName && Boolean(formik.errors.itemName)}
              helperText={formik.touched.itemName && formik.errors.itemName}
            >
              {/* Replace the options below with your actual item names */}
              <MenuItem value="Item 1">Item 1</MenuItem>
              <MenuItem value="Item 2">Item 2</MenuItem>
              <MenuItem value="Item 3">Item 3</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="stock"
              name="stock"
              label="Stock"
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
