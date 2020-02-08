import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import window from 'global';
import _isEmpty from 'lodash/isEmpty';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';
import LaunchIcon from 'mdi-material-ui/Launch';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchMasses } from '../actions/mass';
import getMetadata from '../getMetadata';
import selectByLiturgicalYear from '../selectors/selectByLiturgicalYear';

const mapStateToProps = (state) => ({
  data: state.mass,
});

const mapDispatchToProps = {
  onFetch: fetchMasses,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '33.33%',
    minWidth: 160,
    flexShrink: 0,
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    alignSelf: 'center',
  },
  summaryContent: {
    justifyContent: 'space-between',
  },
  details: {
    flexWrap: 'wrap',
  },
  detailsItem: {
    minWidth: 320,
  },
}));

const yearMap = {
  A: '甲年',
  B: '乙年',
  C: '丙年',
};

const MassList = (props) => {
  const { data, liturgicalYear, onFetch } = props;
  const classes = useStyles();
  const { t } = useTranslation('mass');
  const [expanded, setExpanded] = React.useState(false);
  useEffect(() => {
    if (_isEmpty(data[liturgicalYear])) {
      onFetch(liturgicalYear);
    }
  });
  const dataOfCurrentYear = selectByLiturgicalYear(data, liturgicalYear);
  const year = yearMap[liturgicalYear];
  const assetsBaseURL = getMetadata('assetsBaseURL');
  const getLink = (name, id = '') => {
    return `${assetsBaseURL}/masses/index.html?m=${year}/${name}#/${id || ''}`;
  };
  return (
    <div className={classes.root}>
      {dataOfCurrentYear.map((item) => (
        <ExpansionPanel
          expanded={expanded === item.name}
          onChange={(event, isExpanded) => {
            setExpanded(isExpanded ? item.name : false);
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ChevronDownIcon />}
            classes={{
              content: classes.summaryContent,
            }}
          >
            <Typography className={classes.heading}>
              {item.name}
              <IconButton
                color="primary"
                size="small"
                component="span"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(getLink(item.name), '_blank');
                }}
              >
                <LaunchIcon />
              </IconButton>
            </Typography>
            <Typography className={classes.secondaryHeading}>
              {item.date}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Typography className={classes.detailsItem}>
              {`${t('First Reading')}: `}
              <Link href={getLink(item.name, 'first-reading')} target="_blank">
                {item.firstReading}
              </Link>
            </Typography>
            <Typography className={classes.detailsItem}>
              {`${t('Responsorial Psalm')}: `}
              <Link
                href={getLink(item.name, 'responsorial-psalm')}
                target="_blank"
              >
                {item.responsorialPsalm}
              </Link>
            </Typography>
            <Typography className={classes.detailsItem}>
              {`${t('Second Reading')}: `}
              <Link href={getLink(item.name, 'second-reading')} target="_blank">
                {item.secondReading}
              </Link>
            </Typography>
            <Typography className={classes.detailsItem}>
              {`${t('Gospel')}: `}
              <Link href={getLink(item.name, 'gospel')} target="_blank">
                {item.gospel}
              </Link>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

const Mass = PropTypes.shape({
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  liturgicalYear: PropTypes.string.isRequired,
  firstReading: PropTypes.string.isRequired,
  responsorialPsalm: PropTypes.string.isRequired,
  secondReading: PropTypes.string.isRequired,
  gospel: PropTypes.string.isRequired,
});

MassList.propTypes = {
  data: PropTypes.shape({
    A: PropTypes.arrayOf(Mass),
    B: PropTypes.arrayOf(Mass),
    C: PropTypes.arrayOf(Mass),
  }).isRequired,
  onFetch: PropTypes.func.isRequired,
  liturgicalYear: PropTypes.string,
};

MassList.defaultProps = {
  liturgicalYear: getMetadata('liturgicalYear'),
};

export default connect(mapStateToProps, mapDispatchToProps)(MassList);
