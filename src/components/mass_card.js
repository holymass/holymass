import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    item: PropTypes.object.isRequired,
    t: PropTypes.object.isRequired,
    year: PropTypes.string.isRequired,
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

  render() {
    const {className, classes, item, t, year} = this.props;
    const it = item[year];
    return (
      <div className={classNames(classes.root, className)}>
        <Card className={classes.card} onClick={this.handleDialogOpen}>
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={item.name}
            subheader={item.date}
          />
          <CardContent>
            <Typography>
              {t('First Reading')}: {it && it.firstReading}
              <br />
              {t('Responsorial Psalm')}: {it && it.responsorialPsalm}
              <br />
              {t('Second Reading')}: {it && it.secondReading}
              <br />
              {t('Gospel')}: {it && it.gospel}
            </Typography>
          </CardContent>
        </Card>
        <Dialog open={this.state.open} onClose={this.handleDialogClose}>
          <List className={classes.list}>
            {['甲年', '乙年', '丙年'].map((curYear, key) => {
              return (
                <ListItem
                  button
                  className={classes.listItem}
                  component='a'
                  href={`/assets/masses/index.html?m=${curYear}/${item.name}`}
                  key={key}
                  target='_blank'
                >
                  <ListItemText primary={curYear} />
                </ListItem>);
            })}
          </List>
        </Dialog>
      </div>
    );
  }
}
