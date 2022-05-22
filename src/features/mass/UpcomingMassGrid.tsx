import * as React from 'react';
import Grid from '@mui/material/Grid';

import MassCard from './MassCard';
import MassRepository from './domain/MassRepository';
import ListUpcomingMassesUseCase from './usecases/ListUpcomingMassesUseCase';

export default function UpcomingMassGrid() {
  const [loading, setLoading] = React.useState(true);
  const repo = new MassRepository();
  const data = new ListUpcomingMassesUseCase(repo).execute({ size: 3 });
  React.useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ paddingTop: 3, paddingBottom: 3 }}
    >
      {data.map((item, index) => (
        <Grid item xs={4} key={index}>
          <MassCard loading={loading} model={item} />
        </Grid>
      ))}
    </Grid>
  );
}
