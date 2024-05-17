import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteMATERIAL, getMaterial } from "store/Material/materialAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";
import { IconEdit, IconTrash } from "@tabler/icons-react";

function Materialmain() {
  const materials = useSelector((state) => state.material.materials);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getMaterial({ page: page + 1, page_size: rowsPerPage })).then(
      (res) => setLoading(false)
    );
  }, [dispatch, rowsPerPage, page]);

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

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            sx={{
              color: "white", // Set font color to white
            }}
          >
            Add Material
          </Button>
        }
      >
        {materials?.total === 0 ? (
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
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Sr. No</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials?.data?.map((material, index) => (
                  <TableRow key={material.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{material.name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(material)}
                      >
                        <IconEdit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenDialog(material)}
                      >
                        {/* <IconTrash style={{ color: "red" }} /> */}
                        <IconTrash style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              sx={{ px: 2, textAlign: "right" }}
              page={page}
              component="div"
              className="page"
              rowsPerPage={rowsPerPage}
              count={materials.total}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </>
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
