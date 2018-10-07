export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LITURGICAL_YEAR = 'SET_LITURGICAL_YEAR';

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  language,
});

export const setLiturgicalYear = (year) => ({
  type: SET_LITURGICAL_YEAR,
  year,
});
