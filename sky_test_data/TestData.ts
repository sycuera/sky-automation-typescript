export function getTestData() {
  const data = {
    url: {
      sky: 'https://www.sky.com/',
      dealsUrl: 'https://www.sky.com/deals',
    },
    user: {
      invalidUsername: 'siva@syc'
    }
  };

  return Object.freeze(data);
}
