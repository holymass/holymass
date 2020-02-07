import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import getMetadata from '../getMetadata';

const yearMap = {
  A: '甲年',
  B: '乙年',
  C: '丙年',
};

function MassDetail(props) {
  const { data, fullScreen, onClose, open } = props;
  const { t } = useTranslation('mass');
  const {
    name,
    liturgicalYear,
    firstReading,
    responsorialPsalm,
    secondReading,
    gospel,
  } = data.solemnity;
  const year = yearMap[liturgicalYear];
  const assetsRoot = getMetadata('assetsRoot');
  const getLink = (id) => {
    return `${assetsRoot}/masses/index.html?m=${year}/${name}#/${id || ''}`;
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${t(liturgicalYear)} \u2022 ${data.date}`}
        </DialogContentText>
        <DialogContentText>
          {`${t('First Reading')}:`}
          <Link href={getLink('first-reading')} target="_blank">
            {firstReading}
          </Link>
        </DialogContentText>
        <DialogContentText>
          {`${t('Responsorial Psalm')}:`}
          <Link href={getLink('responsorial-psalm')} target="_blank">
            {responsorialPsalm}
          </Link>
        </DialogContentText>
        <DialogContentText>
          {`${t('Second Reading')}:`}
          <Link href={getLink('second-reading')} target="_blank">
            {secondReading}
          </Link>
        </DialogContentText>
        <DialogContentText>
          {`${t('Gospel')}:`}
          <Link href={getLink('gospel')} target="_blank">
            {gospel}
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {`${t('Close')}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MassDetail.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      solemnity: PropTypes.shape({
        name: PropTypes.string.isRequired,
        liturgicalYear: PropTypes.string.isRequired,
        firstReading: PropTypes.string.isRequired,
        responsorialPsalm: PropTypes.string.isRequired,
        secondReading: PropTypes.string.isRequired,
        gospel: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withMobileDialog()(MassDetail);
