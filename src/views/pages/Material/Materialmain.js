// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   IconButton,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import MainCard from "ui-component/cards/MainCard";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteMATERIAL, getMaterial } from "store/Material/materialAction";
// function Materialmain() {
//   const material = useSelector((state) => state.material.materials);
//   console.log(material);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleClick = () => {
//     navigate("/add-material");
//   };
//   useEffect(() => {
//     dispatch(getMaterial());
//   }, []);

//   const rows = [
//     {
//       id: 1,
//       supermarket: "Supermarket 1",
//       phone: "123-456-7890",
//       email: "supermarket1@example.com",
//       pocName: "John Doe",
//     },
//     {
//       id: 2,
//       supermarket: "Supermarket 2",
//       phone: "987-654-3210",
//       email: "supermarket2@example.com",
//       pocName: "Jane Smith",
//     },
//     // Add more rows as needed
//   ];

//   const handleDelete = (material) => {
//     dispatch(deleteMATERIAL({ id: material.id })).then((res) => {
//       dispatch(getMaterial());
//     });
//   };

//   const handleEdit = (material) => {
//     navigate(`/add-material/${material.id}`);
//   };

//   return (
//     <>
//       <MainCard
//         title="Material"
//         secondary={
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => handleClick()}
//           >
//             Add Material
//           </Button>
//         }
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">Sr. No</TableCell>
//               <TableCell align="center">Name</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {material.map((row, index) => (
//               <TableRow key={row.id}>
//                 <TableCell align="center">{index + 1}</TableCell>
//                 <TableCell align="center">{row.name}</TableCell>
//                 <TableCell align="center">
//                   <IconButton color="primary" aria-label="edit">
//                     <Edit onClick={() => handleEdit(row)} />
//                   </IconButton>
//                   <IconButton color="secondary" aria-label="delete">
//                     <Delete
//                       onClick={() => handleDelete(row)}
//                       sx={{ color: "red" }}
//                     />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </MainCard>
//     </>
//   );
// }

// export default Materialmain;

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
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

function Materialmain() {
  const materials = useSelector((state) => state.material.materials);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMaterial()).then((res) => setLoading(false));
  }, [dispatch]);

  const handleOpenDialog = (material) => {
    setSelectedMaterial(material);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedMaterial) {
      dispatch(deleteMATERIAL({ id: selectedMaterial.id })).then(() => {
        dispatch(getMaterial());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (material) => {
    navigate(`/add-material/${material.id}`);
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <MainCard
        title="Material"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-material")}
          >
            Add Material
          </Button>
        }
      >
        {materials.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              flexDirection: "column", // Added to stack elements vertically
            }}
          >
            <div>
              <img src={NoDataImage} alt="No Data" />
            </div>
            <div>
              <h1>No Data Found</h1>
            </div>
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr. No</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material, index) => (
                <TableRow key={material.id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{material.name}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(material)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDialog(material)}
                    >
                      <Delete sx={{ color: "red" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {openDialog && (
          <DeleteConfirmationDialog
            open={openDialog}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        )}
      </MainCard>
    </>
  );
}

export default Materialmain;
