import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import LaunchIcon from 'mdi-material-ui/Launch';
import makeStyles from '@material-ui/styles/makeStyles';
import MassDetail from './MassDetail';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.A700,
    },
  },
  cardHeader: {
    cursor: 'pointer',
  },
}));

const yearMap = {
  A: '甲年',
  B: '乙年',
  C: '丙年',
};

export default function MassCard(props) {
  const { data } = props;
  const classes = useStyles();
  const { t } = useTranslation('mass');
  const { name, liturgicalYear } = data.solemnity;
  const year = yearMap[liturgicalYear];
  const getLink = (id) => {
    return `/assets/masses/index.html?m=${year}/${name}#/${id || ''}`;
  };
  const handleLaunchClick = (e) => {
    e.stopPropagation();
    window.open(getLink(), '_blank');
  };
  const avatar = (
    <Avatar className={classes.avatar} onClick={handleLaunchClick}>
      <LaunchIcon />
    </Avatar>
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <Card square elevation={0}>
        <CardHeader
          avatar={avatar}
          className={classes.cardHeader}
          title={name}
          titleTypographyProps={{ variant: 'subtitle1' }}
          subheader={`${t(liturgicalYear)} \u2022 ${data.date}`}
          subheaderTypographyProps={{ variant: 'subtitle1' }}
          onClick={handleOpen}
        />
      </Card>
      <MassDetail data={data} onClose={handleClose} open={open} />
    </div>
  );
}

MassCard.propTypes = {
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
};
