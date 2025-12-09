"use client";

import * as React from "react";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import MassRepository from "@/features/mass/domain/MassRepository";
import ListUpcomingMassesUseCase from "@/features/mass/usecases/ListUpcomingMassesUseCase";
import MassCard from "@/components/MassCard";

const repo = new MassRepository();
const upcoming = new ListUpcomingMassesUseCase(repo).execute({ size: 3 });

export default function UpcomingMassGrid() {
  const intl = useIntl();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);
  return (
    <Box>
      <Typography variant="h5" mt={3}>
        {intl.formatMessage({ id: "mass.upcoming.masses" })}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: 3, paddingBottom: 3 }}
      >
        {upcoming.map((item, index) => (
          <Grid key={index} size={{ xs: 4 }}>
            <MassCard loading={loading} model={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
