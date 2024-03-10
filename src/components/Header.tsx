import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import Search from '@/components/Search';

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            HolyMass
          </Typography>
          <Search />
          <LanguageSwitcher />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
