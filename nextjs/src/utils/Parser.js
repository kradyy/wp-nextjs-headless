export const cleanObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};
