import * as React from 'react';
import _orderBy from 'lodash/orderBy';
import Grid from '@mui/material/Grid';
import MassCard, { MassInfo } from './MassCard';
import liturgicalYearA from '../../public/data/mass/a.json';
import liturgicalYearB from '../../public/data/mass/b.json';
import liturgicalYearC from '../../public/data/mass/c.json';

const masses = _orderBy(
  (liturgicalYearA as MassInfo[])
    .concat(liturgicalYearB as MassInfo[])
    .concat(liturgicalYearC as MassInfo[]),
  ['date'],
  ['desc'],
);

export interface MassGridProps {}

export default function MassGrid(props: MassGridProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ paddingTop: 3, paddingBottom: 3 }}
    >
      {masses.map((item, index) => (
        <Grid item xs={4} sm={4} md={4} key={index}>
          <MassCard info={item} />
        </Grid>
      ))}
    </Grid>
  );
}
