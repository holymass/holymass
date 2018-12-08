import moment from 'moment';

export const FETCH_MASSES = 'FETCH_MASSES';
export const FETCH_RECENT_MASSES = 'FETCH_RECENT_MASSES';

export const fetchMasses = (page) => {
  const nextYear = moment().add(1, 'years').format('YYYY-MM-DD');
  return {
    type: FETCH_MASSES,
    payload: {
      request: {
        url: '/masses',
        params: {
          page,
          q: `date__lte:${nextYear}`,
          sort: '-date',
        },
      },
    },
  };
};

export const fetchRecentMasses = () => {
  const today = moment().format('YYYY-MM-DD');
  return {
    type: FETCH_RECENT_MASSES,
    payload: {
      request: {
        url: '/masses',
        params: {
          q: `date__gte:${today}`,
          sort: 'date',
        },
      },
    },
  };
};
