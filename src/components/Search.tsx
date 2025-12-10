'use client';

import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import MassCard from '@/components/MassCard';
import ListMassesUseCase from '@/features/mass/use-cases/ListMassesUseCase';
import Mass from '@/features/mass/domain/Mass';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

export default function Search() {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Mass[]>([]);
  const [value, setValue] = React.useState<string | Mass>('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (options.length === 0) {
      setOptions(new ListMassesUseCase().execute({}));
    }
  }, [options]);

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
                slotProps={{
                  input: {
                    ...params.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
            renderOption={(params, option) => {
              const { key, ...rest } = params;
              return (
                <li key={key} {...rest}>
                  <Typography component="span" variant="body2">
                    {option.title}
                  </Typography>
                </li>
              );
            }}
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
            slotProps={{
              listbox: {
                sx: { maxHeight: 224 },
              },
            }}
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
