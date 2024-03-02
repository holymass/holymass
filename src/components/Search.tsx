'use client';

import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { alpha, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import MassCard from '@/features/mass/MassCard';
import ListMassesUseCase from '@/features/mass/usecases/ListMassesUseCase';
import MassRepository from '@/features/mass/domain/MassRepository';
import Mass from '@/features/mass/domain/Mass';
import Box from '@mui/material/Box';

const repo = new MassRepository();
const options = new ListMassesUseCase(repo).execute({});

export default function Search() {
  const intl = useIntl();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | Mass>('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpen}>
        <SearchIcon />
      </IconButton>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="search-dialog-title"
      >
        <DialogContent
          sx={{
            minHeight: 240,
          }}
        >
          <Autocomplete
            disableClearable
            freeSolo
            selectOnFocus
            clearOnBlur
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                variant="standard"
                placeholder={intl.formatMessage({ id: 'common.search' })}
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
            renderOption={(params, option) => (
              <li {...params}>
                <Typography component="span" variant="body2">
                  {option.title}
                </Typography>
              </li>
            )}
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option.title;
            }}
            filterOptions={createFilterOptions<Mass>({
              stringify: (option) => {
                return (
                  option.title +
                  option.pinyin.replaceAll(/\d|\s/g, '') +
                  option.pinyin.replaceAll(/\d/g, '')
                );
              },
            })}
            ListboxProps={{ sx: { maxHeight: 200 } }}
          />
          <Divider />
          <Box mt={2}>
            {value && value instanceof Mass ? (
              <MassCard model={value} />
            ) : (
              <Stack mt={4} mb={4} alignItems="center">
                <FindInPageIcon sx={{ fontSize: 100, color: grey[300] }} />
                <Typography variant="body2">
                  <FormattedMessage id="common.search" />
                </Typography>
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="common.close" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
