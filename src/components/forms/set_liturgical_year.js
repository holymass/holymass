import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withNamespaces} from 'react-i18next';
import {withStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {setLiturgicalYear} from '../../actions/settings';

const mapStateToProps = (state) => ({
  liturgicalYear: state.settings.liturgicalYear,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => {
    dispatch(setLiturgicalYear(e.target.value));
  },
});

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
});

@connect(mapStateToProps, mapDispatchToProps)
@withNamespaces('settings')
@withStyles(styles)
export default class SetLiturgicalYear extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    liturgicalYear: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const {classes, onChange, liturgicalYear, t} = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('Liturgical Year')}</FormLabel>
          <RadioGroup
            aria-label="Liturgical Year"
            name="settings/setLiturgicalYear"
            value={liturgicalYear}
            onChange={onChange}
          >
            <FormControlLabel
              value="yearA"
              control={<Radio />}
              label={t('Year A')}
            />
            <FormControlLabel
              value="yearB"
              control={<Radio />}
              label={t('Year B')}
            />
            <FormControlLabel
              value="yearC"
              control={<Radio />}
              label={t('Year C')}
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
