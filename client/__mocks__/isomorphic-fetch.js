let __value = 1;
const isomorphicFetch = jest.fn(() => __value);

isomorphicFetch.__setValue = v => (__value = v);

export default isomorphicFetch;
