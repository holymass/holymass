import moment from 'moment';

export const FETCH_MASSES = 'FETCH_MASSES';
export const FETCH_NEXT_MASSES = 'FETCH_NEXT_MASSES';

export const fetchMasses = (page) => {
  const next14Days = moment()
    .add(14, 'days')
    .format('YYYY-MM-DD');
  return {
    type: FETCH_MASSES,
    payload: {
      request: {
        url: '/masses',
        params: {
          page,
          size: 10,
          q: `date__lte:${next14Days}`,
          sort: '-date',
        },
      },
    },
  };
};

export const fetchNextMasses = (num = 10) => {
  return {
    type: FETCH_NEXT_MASSES,
    payload: {
      request: {
        url: `/masses/next/${num}`,
      },
    },
  };
};
