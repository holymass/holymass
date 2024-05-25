'use client';

import * as React from 'react';
import { useIntl } from 'react-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { enUS, zhCN } from '@mui/material/locale';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';

const languages = [
  { code: 'en', label: 'English', locale: enUS },
  { code: 'zh', label: '简体中文', locale: zhCN },
];

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const intl = useIntl();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const newLocale = event.currentTarget.getAttribute('value') as string;
    const newPathname = pathname.replace(`/${intl.locale}`, `/${newLocale}`);
    router.push(`${newPathname}?${searchParams}`);
    router.refresh();
  };
  return (
    <Box>
      <IconButton id="language-switcher" color="inherit" onClick={handleClick}>
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          dense: true,
          'aria-labelledby': 'language-switcher',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            onClick={handleMenuItemClick}
            sx={{ width: 160 }}
          >
            {lang.code === intl.locale && (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            )}
            <ListItemText inset={lang.code !== intl.locale}>
              {lang.label}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
