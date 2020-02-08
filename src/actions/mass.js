export const FETCH_MASSES = 'FETCH_MASSES';

export const fetchMasses = (liturgicalYear, page) => {
  return {
    type: FETCH_MASSES,
    payload: {
      request: {
        url: '/masses',
        params: {
          page,
          size: 10,
          q: `solemnity__liturgical_year:${liturgicalYear}`,
          sort: '-date',
        },
      },
    },
  };
};
