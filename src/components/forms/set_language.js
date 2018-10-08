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
import {setLanguage} from '../../actions/settings';

const mapStateToProps = (state) => ({
  language: state.settings.language,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (e) => {
    dispatch(setLanguage(e.target.value));
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
export default class SetLanguage extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const {classes, onChange, language, t} = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('Language')}</FormLabel>
          <RadioGroup
            aria-label="Language"
            name="settings/setLanguage"
            value={language}
            onChange={onChange}
          >
            <FormControlLabel value="en" control={<Radio />} label="English" />
            <FormControlLabel value="zh_CN" control={<Radio />} label="简体中文" />
            <FormControlLabel value="zh_TW" control={<Radio />} label="繁體中文" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}
