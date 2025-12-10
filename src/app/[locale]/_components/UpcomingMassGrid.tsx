'use client';

import * as React from 'react';
import { useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Mass from '@/features/mass/domain/Mass';
import ListUpcomingMassesUseCase from '@/features/mass/use-cases/ListUpcomingMassesUseCase';
import MassCard from '@/components/MassCard';
import MassCardSkeleton from '@/components/MassCardSkeleton';

export default function UpcomingMassGrid() {
  const intl = useIntl();
  const [upcoming, setUpcoming] = React.useState<Mass[]>([]);
  React.useEffect(() => {
    if (upcoming.length === 0) {
      console.log(1);
      setUpcoming(new ListUpcomingMassesUseCase().execute({ size: 3 }));
    }
  }, [upcoming]);
  return (
    <Box>
      <Typography variant="h5" mt={3}>
        {intl.formatMessage({ id: 'mass.upcoming.masses' })}
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ paddingTop: 3, paddingBottom: 3 }}
      >
        {upcoming.length > 0 ? (
          upcoming.map((item, index) => (
            <Grid key={index} size={{ xs: 4 }}>
              <MassCard model={item} />
            </Grid>
          ))
        ) : (
          <React.Fragment>
            <Grid key="skeleton-1" size={{ xs: 4 }}>
              <MassCardSkeleton />
            </Grid>
            <Grid key="skeleton-2" size={{ xs: 4 }}>
              <MassCardSkeleton />
            </Grid>
            <Grid key="skeleton-3" size={{ xs: 4 }}>
              <MassCardSkeleton />
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Box>
  );
}
