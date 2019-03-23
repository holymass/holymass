import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import makeStyles from '@material-ui/styles/makeStyles';
import {setLanguage} from '../../actions/settings';

const mapStateToProps = (state) => ({
  language: state.settings.language,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeLanguage: (language) => {
    dispatch(setLanguage(language));
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const SetLanguage = (props) => {
  const {onChangeLanguage, language} = props;
  const classes = useStyles;
  const {t, i18n} = useTranslation('settings');
  const handleChangeLanguage = (e) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
    onChangeLanguage(language);
  };
  return (
    <div className={classes.root}>
      <FormControl component='fieldset'>
        <FormLabel component='legend'>{t('Language')}</FormLabel>
        <RadioGroup
          aria-label='Language'
          name='settings/setLanguage'
          value={language}
          onChange={handleChangeLanguage}
        >
          <FormControlLabel value='en' control={<Radio />} label='English' />
          <FormControlLabel value='zh' control={<Radio />} label='中文' />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

SetLanguage.propTypes = {
  onChangeLanguage: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SetLanguage);
