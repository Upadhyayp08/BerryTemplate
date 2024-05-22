import React, { useState, useEffect } from "react";
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
import { deleteEmployee, getEmployee } from "store/Employee/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

function Employeemain() {
  const employees = useSelector((state) => state.employee.employees);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getEmployee({ page: page + 1, page_size: rowsPerPage })).then(
      (res) => setLoading(false)
    );
  }, [dispatch, page, rowsPerPage]);

  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployee({ id: selectedEmployee.id })).then(() => {
        dispatch(getEmployee({ page: 1, page_size: 5 }));
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (employee) => {
    navigate(`/add-employee/${employee.id}`);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(employees);

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
        title="Employee"
        secondary={
          <Button
            variant="contained"
            sx={{
              color: "white", // Set font color to white
            }}
            color="primary"
            onClick={() => navigate("/add-employee")}
          >
            Add Employee
          </Button>
        }
      >
        {employees.total === 0 ? (
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
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Designation</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees?.data?.map((employee, index) => (
                  <TableRow key={employee.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{employee.name}</TableCell>
                    <TableCell align="center">+961 {employee.phone}</TableCell>
                    <TableCell align="center">{employee.email}</TableCell>
                    <TableCell align="center">{employee.designation}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(employee)}
                      >
                        <IconEdit />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleOpenDialog(employee)}
                      >
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
              count={employees.total}
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

export default Employeemain;
