import * as React from 'react';
import Grid from '@mui/material/Grid';

import MassCard from '@/features/mass/MassCard';
import Mass from '@/features/mass/domain/Mass';

export interface MassGridProps {
  data: Mass[];
}

export default function MassGrid(props: MassGridProps) {
  const { data } = props;
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ paddingTop: 3, paddingBottom: 3 }}
    >
      {data.map((item, index) => (
        <Grid item xs={4} key={index}>
          <MassCard model={item} />
        </Grid>
      ))}
    </Grid>
  );
}
