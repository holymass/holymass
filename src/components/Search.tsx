import * as React from 'react';
import { useTranslation } from 'next-i18next';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { alpha, styled, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';

import MassCard from '../features/mass/MassCard';
import ListMassesUseCase from '../features/mass/usecases/ListMassesUseCase';
import MassRepository from '../features/mass/domain/MassRepository';
import Mass from '../features/mass/domain/Mass';
import Divider from '@mui/material/Divider';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    cursor: 'pointer',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
    },
  },
}));

export interface SearchProps {}

export default function Search(props: SearchProps) {
  const { t } = useTranslation('common');
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Mass | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const repo = new MassRepository();
  const allMasses = new ListMassesUseCase(repo).execute();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <SearchBox>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase disabled onClick={handleOpen} />
      <Dialog
        fullWidth
        maxWidth={'sm'}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="search-dialog-title"
      >
        <DialogTitle id="quick-search-dialog-title">
          <Autocomplete
            freeSolo
            selectOnFocus
            clearOnBlur
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue !== 'string') {
                setValue(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder={t('Search')}
                InputProps={{
                  ...params.InputProps,
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            renderOption={(attrs, option) => <li {...attrs}>{option.title}</li>}
            options={allMasses}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.title;
            }}
            filterOptions={createFilterOptions<Mass>()}
          />
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            minHeight: 400,
          }}
        >
          {value && <MassCard model={value} />}
        </DialogContent>
      </Dialog>
    </SearchBox>
  );
}
