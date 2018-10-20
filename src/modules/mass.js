import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Sidebar from 'components/sidebar';
import {loadable} from '../utils';

const MassList = loadable({
  loader: () => import('components/mass_list'),
});
const SetLiturgicalYear = loadable({
  loader: () => import('components/forms/set_liturgical_year'),
});

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
  },
});

@withStyles(styles)
export default class MassModule extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <MassList />
        <Sidebar>
          <SetLiturgicalYear />
        </Sidebar>
      </div>
    );
  }
}
