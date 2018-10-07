import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
  card: {
    cursor: 'pointer',
    minWidth: theme.spacing.unit * 36,
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
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    liturgicalYear: PropTypes.string.isRequired,
    mass: PropTypes.object.isRequired,
    t: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  handleDialogOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDialogClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    const yearMap = {
      yearA: '甲年',
      yearB: '乙年',
      yearC: '丙年',
    };
    const year = yearMap[this.props.liturgicalYear];
    const name = this.props.mass.name;
    const url = `/assets/masses/index.html?m=${year}/${name}`;
    open(url, '_blank');
  };

  render() {
    const {className, classes, liturgicalYear, mass, t} = this.props;
    const curMass = mass[liturgicalYear];
    return (
      <div className={classNames(classes.root, className)}>
        <Card className={classes.card} onClick={this.handleClick}>
          <CardHeader
            title={mass.name}
            subheader={mass.date}
          />
          <CardContent>
            <Typography>
              {t('First Reading')}: {curMass && curMass.firstReading}
              <br />
              {t('Responsorial Psalm')}: {curMass && curMass.responsorialPsalm}
              <br />
              {t('Second Reading')}: {curMass && curMass.secondReading}
              <br />
              {t('Gospel')}: {curMass && curMass.gospel}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}
