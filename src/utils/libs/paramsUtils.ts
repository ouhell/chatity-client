import Qs from "qs";
export const getFilterKey = (obj: Record<string, unknown>) => {
  return Qs.stringify(obj, {
    sort: (a, b) => {
      if (a > b) return 1;
      if (b > a) return -1;
      return 0;
    },
    arrayFormat: "comma",
  });
};

export const fetchQuerySerializer = (obj: Record<string, unknown>) => {
  return Qs.stringify(obj, {
    arrayFormat: "repeat",
    allowEmptyArrays: false,
    skipNulls: true,
  });
};
