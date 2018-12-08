import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withNamespaces} from 'react-i18next';
import moment from 'moment';
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
import Action from 'components/action';

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
  'A': '甲年',
  'B': '乙年',
  'C': '丙年',
};

@withNamespaces('mass')
@withStyles(styles)
export default class MassCard extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
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
    open(this.getLink(), '_blank');
  };

  getLink = (id) => {
    const {
      name,
      liturgicalYear,
    } = this.props.data.solemnity;
    const year = yearMap[liturgicalYear];
    return `/assets/mass/index.html?m=${year}/${name}#/${id || ''}`;
  }

  render() {
    const {classes, data, t} = this.props;
    const {
      name,
      liturgicalYear,
      firstReading,
      responsorialPsalm,
      secondReading,
      gospel,
    } = data.solemnity;
    const date = moment(data.date).format('YYYY-MM-DD');
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
            subheader={`${t(liturgicalYear)} \u2022 ${date}`}
            title={name}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Action
                href={this.getLink('first-reading')}
                target='_blank'
              >
                <Typography color='inherit'>
                  {`${t('First Reading')}:\t${firstReading}`}
                </Typography>
              </Action>
              <Action
                href={this.getLink('responsorial-psalm')}
                target='_blank'
              >
                <Typography color='inherit'>
                  {`${t('Responsorial Psalm')}:\t${responsorialPsalm}`}
                </Typography>
              </Action>
              <Action
                href={this.getLink('second-reading')}
                target='_blank'
              >
                <Typography color='inherit'>
                  {`${t('Second Reading')}:\t${secondReading}`}
                </Typography>
              </Action>
              <Action
                href={this.getLink('gospel')}
                target='_blank'
              >
                <Typography color='inherit'>
                  {`${t('Gospel')}:\t${gospel}`}
                </Typography>
              </Action>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
