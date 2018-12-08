import moment from 'moment';

export const FILTER_MASSES = 'FILTER_MASSES';
export const FETCH_RECENT_MASSES = 'FETCH_RECENT_MASSES';

export const filterMasses = (filter) => ({
  type: FILTER_MASSES,
  filter,
});

export const fetchRecentMasses = (size = 10) => {
  const today = moment().format('YYYY-MM-DD');
  return {
    type: FETCH_RECENT_MASSES,
    payload: {
      request: {
        url: '/masses',
        params: {
          q: `date__gte:${today}`,
          size,
          sort: 'date',
        },
      },
    },
  };
};
