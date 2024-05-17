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
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, getExpense } from "store/Expense/expenseAction";
import DeleteConfirmationDialog from "ui-component/DeleteConfirmationDialog";
import NoDataImage from "../../../assets/images/NoData.png";
import Loader from "ui-component/Loader";

const Expensemain = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getExpense({ page: page + 1, page_size: rowsPerPage })).then(
      (res) => setLoading(false)
    );
  }, [dispatch, page, rowsPerPage]);

  const handleOpenDialog = (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedExpense) {
      dispatch(deleteExpense({ id: selectedExpense.id })).then(() => {
        dispatch(getExpense());
        setOpenDialog(false);
      });
    }
  };

  const handleEdit = (expense) => {
    navigate(`/add-expense/${expense.id}`);
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
        title="Expense"
        secondary={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-expense")}
          >
            Add Expense
          </Button>
        }
      >
        {expenses?.total === 0 ? (
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
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Unit</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses?.data?.map((expense, index) => (
                  <TableRow key={expense.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{expense.name}</TableCell>
                    <TableCell align="center">{expense.quantity}</TableCell>
                    <TableCell align="center">{expense.unit}</TableCell>
                    <TableCell align="center">L£{expense.amount}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(expense)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        style={{ color: "red" }}
                        onClick={() => handleOpenDialog(expense)}
                      >
                        <Delete />
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
              count={expenses.total}
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
};

export default Expensemain;
