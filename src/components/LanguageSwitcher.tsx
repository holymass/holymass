'use client';

import * as React from 'react';
import { useIntl } from 'react-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { enUS, zhCN } from '@mui/material/locale';
import Box from '@mui/material/Box';
import LanguageIcon from '@mui/icons-material/Language';
import Typography from '@mui/material/Typography';

const languages = [
  { code: 'en', label: 'English', locale: enUS },
  { code: 'zh', label: '中文', locale: zhCN },
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
    if (intl.locale === intl.defaultLocale) {
      router.push(`/${newLocale}${pathname}?${searchParams}`);
    } else {
      const newPathname = pathname.replace(`/${intl.locale}`, `/${newLocale}`);
      router.push(`${newPathname}?${searchParams}`);
    }
    router.refresh();
  };
  return (
    <Box>
      <Button
        id="language-switcher"
        color="inherit"
        variant="text"
        startIcon={<LanguageIcon />}
        onClick={handleClick}
        sx={{ textTransform: 'none' }}
      >
        {languages.find(({ code }) => code == intl.locale)?.label}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-switcher',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            value={lang.code}
            onClick={handleMenuItemClick}
            sx={{ width: 120 }}
          >
            <Typography variant="body2">{lang.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
