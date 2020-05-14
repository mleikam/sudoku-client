
export const cloneObject = (hash:any) => Object.keys(hash).reduce((acc:any, key:string) => {
  acc[key] = hash[key];
  return acc;
}, {});
