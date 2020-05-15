
export const scalarIsEqual = (a:string|number|undefined, b:string|number|undefined) => String(a) === String(b);

export const arrayIsEqual = (a:any[], b:any[]) => {
  if (a.length !== b.length) return false;
  return a.filter((item, index) => b[index] === item).length === b.length;
};

export const objectIsEqual = (a:any, b:any) => {
  if (!arrayIsEqual(Object.keys(a), Object.keys(b))) return false;
  return Object.keys(a).map(
    (key) => a[key] === b[key],
  ).filter(
    (item) => item,
  ).length === Object.keys(b).length;
};

const scalarTypes = ['string', 'number', 'undefined', 'boolean'];

export const isEqual = (a:any, b:any) => {
  if (Array.isArray(a)) return arrayIsEqual(a, b);
  if (scalarTypes.includes(typeof a)) return scalarIsEqual(a, b);
  if (typeof a === 'function' || a === null) return false;
  return objectIsEqual(a, b);
};

export default isEqual;
