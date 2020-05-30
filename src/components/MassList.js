import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import makeStyles from '@material-ui/styles/makeStyles';
import window from 'global';
import _isEmpty from 'lodash/isEmpty';
import _debounce from 'lodash/debounce';
import Icon from '@mdi/react';
import { mdiChevronDown, mdiLaunch, mdiMagnify } from '@mdi/js';
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
  search: {
    display: 'flex',
    padding: theme.spacing(2),
    justifyContent: 'center',
  },
  searchPaper: {
    display: 'flex',
    padding: theme.spacing(1),
    '@media (min-width:600px)': {
      maxWidth: theme.spacing(80),
      minWidth: theme.spacing(60),
    },
    maxWidth: theme.spacing(60),
    minWidth: theme.spacing(40),
  },
  searchInputRoot: {
    color: 'inherit',
  },
  searchInput: {
    paddingLeft: theme.spacing(1),
  },
  heading: {
    flexBasis: '33.33%',
    minWidth: theme.spacing(20),
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
    minWidth: theme.spacing(40),
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
  const { t } = useTranslation('base');
  const [expanded, setExpanded] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  useEffect(() => {
    if (_isEmpty(data[`year${liturgicalYear}`])) {
      onFetch(liturgicalYear);
    }
  });
  const dataOfCurrentYear = selectByLiturgicalYear(
    data,
    `year${liturgicalYear}`,
    filter,
  );
  const year = yearMap[liturgicalYear];
  const assetsBaseURL = getMetadata('assetsBaseURL');
  const getLink = (name, id = '') => {
    return `${assetsBaseURL}/masses/index.html?m=${year}/${name}#/${id || ''}`;
  };
  const handleSearch = _debounce((value) => {
    setFilter(value);
  }, 200);
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <Paper className={classes.searchPaper}>
          <IconButton size="small">
            <Icon path={mdiMagnify} size={1} aria-label="search" />
          </IconButton>
          <InputBase
            classes={{
              root: classes.searchInputRoot,
              input: classes.searchInput,
            }}
            fullWidth
            type="search"
            placeholder="Search"
            inputProps={{ 'aria-label': 'search masses' }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Paper>
      </div>
      {dataOfCurrentYear.map((item) => (
        <ExpansionPanel
          key={item.name}
          expanded={expanded === item.name}
          onChange={(event, isExpanded) => {
            setExpanded(isExpanded ? item.name : false);
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<Icon path={mdiChevronDown} size={1} />}
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
                <Icon path={mdiLaunch} size={1} />
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
    yearA: PropTypes.arrayOf(Mass),
    yearB: PropTypes.arrayOf(Mass),
    yearC: PropTypes.arrayOf(Mass),
  }).isRequired,
  onFetch: PropTypes.func.isRequired,
  liturgicalYear: PropTypes.string,
};

MassList.defaultProps = {
  liturgicalYear: getMetadata('liturgicalYear'),
};

export default connect(mapStateToProps, mapDispatchToProps)(MassList);
