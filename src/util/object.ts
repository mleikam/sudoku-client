
export const cloneObject = (hash:any) => {
  return Object.keys(hash).reduce( (acc:any,key:string) => {
    acc[key] = hash[key];
    return acc;
  },{})
};