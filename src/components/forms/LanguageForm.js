import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/styles/makeStyles';
import { setLanguage } from '../../actions/settings';

const mapStateToProps = (state) => ({
  language: state.settings.language,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (language) => {
    dispatch(setLanguage(language));
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const LanguageForm = (props) => {
  const { onChange, language } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation('settings');
  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    onChange(lang);
  };
  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{t('Language')}</FormLabel>
        <RadioGroup
          aria-label="Language"
          name="settings/language"
          value={language}
          onChange={handleChange}
        >
          <FormControlLabel value="en" control={<Radio />} label="English" />
          <FormControlLabel value="zh" control={<Radio />} label="中文" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

LanguageForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageForm);
