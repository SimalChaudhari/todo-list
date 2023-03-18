import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";

const Dashboard = () => {

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        Here
      </Grid>
    </MainCard>
  );
};

export default Dashboard;
