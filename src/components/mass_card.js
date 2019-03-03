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
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ChevronDownIcon from 'mdi-material-ui/ChevronDown';
import LaunchIcon from 'mdi-material-ui/Launch';

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
    t: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    expanded: PropTypes.boolean,
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
    return `/assets/masses/index.html?m=${year}/${name}#/${id || ''}`;
  }

  componentDidMount() {
    if (this.props.expanded) {
      this.handleExpandClick();
    }
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
        <ChevronDownIcon />
      </IconButton>
    );
    return (
      <div className={classes.root}>
        <Card>
          <CardHeader
            action={action}
            avatar={avatar}
            className={classes.cardHeader}
            title={name}
            titleTypographyProps={{variant: 'subtitle1'}}
            subheader={`${t(liturgicalYear)} \u2022 ${date}`}
            subheaderTypographyProps={{variant: 'subtitle1'}}
            onClick={this.handleExpandClick}
          />
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Link
                href={this.getLink('first-reading')}
                target='_blank'
              >
                <Typography variant='body1' color='inherit'>
                  {`${t('First Reading')}:\t${firstReading}`}
                </Typography>
              </Link>
              <Link
                href={this.getLink('responsorial-psalm')}
                target='_blank'
              >
                <Typography variant='body1' color='inherit'>
                  {`${t('Responsorial Psalm')}:\t${responsorialPsalm}`}
                </Typography>
              </Link>
              <Link
                href={this.getLink('second-reading')}
                target='_blank'
              >
                <Typography variant='body1' color='inherit'>
                  {`${t('Second Reading')}:\t${secondReading}`}
                </Typography>
              </Link>
              <Link
                href={this.getLink('gospel')}
                target='_blank'
              >
                <Typography variant='body1' color='inherit'>
                  {`${t('Gospel')}:\t${gospel}`}
                </Typography>
              </Link>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}
