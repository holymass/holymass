import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LaunchIcon from '@material-ui/icons/Launch';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
  avatar: {
    'backgroundColor': theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  cardHeader: {
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  list: {
    width: theme.spacing.unit * 30,
  },
  listItem: {
    textAlign: 'center',
  },
});

const yearMap = {
  'yearA': '甲年',
  'yearB': '乙年',
  'yearC': '丙年',
};

@withNamespaces('mass')
@withStyles(styles)
export default class MassCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    liturgicalYear: PropTypes.string.isRequired,
    mass: PropTypes.object.isRequired,
    t: PropTypes.object.isRequired,
  };

  state = {
    open: false,
    expanded: false,
  };

  handleExpandClick = () => {
    this.setState((state) => ({expanded: !state.expanded}));
  };

  handleLaunchClick = (e) => {
    e.stopPropagation();
    const {liturgicalYear} = this.props;
    const year = yearMap[liturgicalYear];
    const name = this.props.mass.name;
    const url = `/assets/masses/index.html?m=${year}/${name}`;
    open(url, '_blank');
  };

  render() {
    const {classes, liturgicalYear, mass, t} = this.props;
    const curMass = mass[liturgicalYear];
    const avatar = (
      <Avatar className={classes.avatar} onClick={this.handleLaunchClick}>
        <LaunchIcon />
      </Avatar>
    );
    const action = (
      <IconButton
        className={classNames(classes.expand, {
          [classes.expandOpen]: this.state.expanded,
        })}
        aria-expanded={this.state.expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    );
    return (
      <div className={classes.root}>
        <Card>
          <CardHeader
            action={action}
            avatar={avatar}
            className={classes.cardHeader}
            onClick={this.handleExpandClick}
            subheader={`${t(liturgicalYear)} \u2022 ${curMass.date}`}
            title={mass.name}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <pre>
                {`${t('First Reading')}:\t${curMass.firstReading}`}
                <br />
                {`${t('Responsorial Psalm')}:\t${curMass.responsorialPsalm}`}
                <br />
                {`${t('Second Reading')}:\t${curMass.secondReading}`}
                <br />
                {`${t('Gospel')}:\t${curMass.gospel}`}
              </pre>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
