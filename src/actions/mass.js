import moment from 'moment';

export const FETCH_MASSES = 'FETCH_MASSES';
export const FETCH_NEXT_MASSES = 'FETCH_NEXT_MASSES';

export const fetchMasses = (page) => {
  const nextYear = moment()
    .add(1, 'years')
    .format('YYYY-MM-DD');
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
