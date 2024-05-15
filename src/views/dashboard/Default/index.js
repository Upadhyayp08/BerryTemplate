import { useEffect, useState } from "react";

// material-ui
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import { useDispatch, useSelector } from "react-redux";
import MainCard from "ui-component/cards/MainCard";
import { readCustomer } from "store/Customer/customerActions";
import API from "helper/API";
import Loader from "ui-component/Loader";

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState({});
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  useEffect(() => {
    // setLoading(false);
    fetchData();
  }, []);

  const fetchData = () => {
    API.post("/dashboard").then(
      (res) => setDataFetched(res.data.response),
      setLoading(false)
    );
  };
  useEffect(() => {
    dispatch(readCustomer());
  }, []);

  const { data, stock, total } = dataFetched;
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    // <Grid container spacing={gridSpacing}>
    //   <Grid item xs={12}>
    //     <Grid container spacing={gridSpacing}>
    //       <Grid item lg={4} md={6} sm={6} xs={12}>
    //         <EarningCard isLoading={isLoading} />
    //       </Grid>
    //       <Grid item lg={4} md={6} sm={6} xs={12}>
    //         <TotalOrderLineChartCard isLoading={isLoading} />
    //       </Grid>
    //       <Grid item lg={4} md={12} sm={12} xs={12}>
    //         <Grid container spacing={gridSpacing}>
    //           <Grid item sm={6} xs={12} md={6} lg={12}>
    //             <TotalIncomeDarkCard isLoading={isLoading} />
    //           </Grid>
    //           <Grid item sm={6} xs={12} md={6} lg={12}>
    //             <TotalIncomeLightCard isLoading={isLoading} />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Grid container spacing={gridSpacing}>
    //       <Grid item xs={12} md={8}>
    //         <TotalGrowthBarChart isLoading={isLoading} />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         <PopularCard isLoading={isLoading} />
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Grid>
    <>
      <Grid container spacing={2} marginBottom={3}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid item xs={12} marginBottom={3}>
                <TotalIncomeDarkCard
                  total={total?.monthly_purchase}
                  Header={"Monthly Purchase"}
                />
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeDarkCard
                  total={total?.monthly_expense}
                  Header={"Monthly Expense"}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} marginBottom={3}>
                <TotalIncomeDarkCard
                  total={total?.monthly_sell}
                  Header={"Monthly Sell"}
                />
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeDarkCard
                  total={total?.monthly_income}
                  Header={"Monthly Income"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <EarningCard
            isLoading={isLoading}
            total={total?.yearly_income}
            Header={"Yearly Income"}
          />
        </Grid>
      </Grid>
      <Grid marginBottom={3}>
        <TotalGrowthBarChart isLoading={isLoading} data={data} />
      </Grid>
      <Grid>
        <MainCard title="Stock">
          <Table sx={{ alignContent: "center" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Sr. No</TableCell>
                <TableCell align="center">Item</TableCell>
                <TableCell align="center">Available Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stock?.map((row, index) => (
                <TableRow key={row.id} style={{ textAlign: "center" }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.Item}</TableCell>
                  <TableCell align="center">{row.stock}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </MainCard>
      </Grid>
    </>
  );
};

export default Dashboard;
