export const getUniqueCategories = (posts) => {
  // // Ver.Zoomkoding;
  // const categorySet = new Set();
  // posts.forEach(({ categories }) => categories.forEach((category) => categorySet.add(category)));
  // return [...categorySet].sort((a, b) => {
  //   if (a === 'featured') return -1;
  //   if (b === 'featured') return 1;
  //   return 0;
  // });

  // Ver. My
  const array = [];
  const categoryMap = new Map(array);
  posts.forEach(({ categories }) =>
    categories.forEach((category) => {
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + 1);
      } else {
        categoryMap.set(category, 1);
      }
    }),
  );
  const map2Arr = [...categoryMap].sort((a, b) => b[1] - a[1]);
  const categorySet = new Set();
  map2Arr.forEach((category) => categorySet.add(category[0]));

  return categorySet;
};
