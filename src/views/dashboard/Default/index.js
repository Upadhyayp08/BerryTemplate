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

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch(readCustomer());
  }, []);

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
                <TotalIncomeDarkCard />
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeDarkCard />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12} marginBottom={3}>
                <TotalIncomeDarkCard />
              </Grid>
              <Grid item xs={12}>
                <TotalIncomeDarkCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <EarningCard isLoading={isLoading} />
        </Grid>
      </Grid>
      <Grid marginBottom={3}>
        <TotalGrowthBarChart isLoading={isLoading} />
      </Grid>
      <Grid>
        <MainCard title="Stocks">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>POC Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.poc_name}</TableCell>
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
