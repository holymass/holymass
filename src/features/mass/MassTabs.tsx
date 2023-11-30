import * as React from 'react';
import { useTranslation } from 'next-i18next';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';

import MassGrid from './MassGrid';
import MassRepository from './domain/MassRepository';
import ListMassesUseCase from './usecases/ListMassesUseCase';

const repo = new MassRepository();
const useCase = new ListMassesUseCase(repo);
const liturgicalYearA = useCase.execute({ liturgicalYear: '甲年' });
const liturgicalYearB = useCase.execute({ liturgicalYear: '乙年' });
const liturgicalYearC = useCase.execute({ liturgicalYear: '丙年' });

export default function MassTabs() {
  const { t } = useTranslation('mass');
  const [value, setValue] = React.useState('B');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography variant="h5" mt={3}>
        {t('All Masses')}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered onChange={handleChange} aria-label={'Mass tabs'}>
            <Tab label="甲年" value="A" />
            <Tab label="乙年" value="B" />
            <Tab label="丙年" value="C" />
          </TabList>
        </Box>
        <TabPanel value="A" sx={{ padding: 0 }}>
          <MassGrid data={liturgicalYearA} />
        </TabPanel>
        <TabPanel value="B" sx={{ padding: 0 }}>
          <MassGrid data={liturgicalYearB} />
        </TabPanel>
        <TabPanel value="C" sx={{ padding: 0 }}>
          <MassGrid data={liturgicalYearC} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
