'use client';

import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import ListMassesUseCase from '@/features/mass/use-cases/ListMassesUseCase';
import MassGrid from './MassGrid';

export default function MassTabs() {
  const intl = useIntl();

  const [value, setValue] = React.useState('A');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const useCase = new ListMassesUseCase();
  const masses = {
    liturgicalYearA: useCase.execute({ liturgicalYear: '甲年' }),
    liturgicalYearB: useCase.execute({ liturgicalYear: '乙年' }),
    liturgicalYearC: useCase.execute({ liturgicalYear: '丙年' }),
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h5" mt={3}>
        <FormattedMessage id="mass.all.masses" />
      </Typography>
      <TabContext value={value}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: (theme) => theme.zIndex.appBar,
            bgcolor: grey[100],
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <TabList centered onChange={handleChange} aria-label={'Mass tabs'}>
            <Tab label={intl.formatMessage({ id: 'mass.year.a' })} value="A" />
            <Tab label={intl.formatMessage({ id: 'mass.year.b' })} value="B" />
            <Tab label={intl.formatMessage({ id: 'mass.year.c' })} value="C" />
          </TabList>
        </Box>
        <TabPanel value="A" sx={{ padding: 0 }}>
          <MassGrid data={masses.liturgicalYearA} />
        </TabPanel>
        <TabPanel value="B" sx={{ padding: 0 }}>
          <MassGrid data={masses.liturgicalYearB} />
        </TabPanel>
        <TabPanel value="C" sx={{ padding: 0 }}>
          <MassGrid data={masses.liturgicalYearC} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
