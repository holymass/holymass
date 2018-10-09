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
import Typography from '@material-ui/core/Typography';

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
  card: {
    cursor: 'pointer',
    minWidth: theme.spacing.unit * 36,
    maxWidth: theme.spacing.unit * 120,
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
    const year = this.getLiturgicalYear();
    const name = this.props.mass.name;
    const url = `/assets/masses/index.html?m=${year}/${name}`;
    open(url, '_blank');
  };

  getLiturgicalYear = () => {
    const yearMap = {
      yearA: '甲年',
      yearB: '乙年',
      yearC: '丙年',
    };
    return yearMap[this.props.liturgicalYear];
  }

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
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    );
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            action={action}
            avatar={avatar}
            onClick={this.handleExpandClick}
            subheader={mass.date || mass.name}
            title={mass.name}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>
                {t('First Reading')}:
                {curMass && curMass.firstReading}
                <br />
                {t('Responsorial Psalm')}:
                {curMass && curMass.responsorialPsalm}
                <br />
                {t('Second Reading')}:
                {curMass && curMass.secondReading}
                <br />
                {t('Gospel')}:
                {curMass && curMass.gospel}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
