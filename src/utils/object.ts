/* eslint-disable @typescript-eslint/no-explicit-any */
import { isDate } from "date-fns";

export const isObject = (item: any) =>
  item && typeof item === "object" && !Array.isArray(item) && !isDate(item);

export const deepAssign = (target: any, ...sources: any[]): any => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key]) && source[key].constructor.name === "Object") {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepAssign(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepAssign(target, ...sources);
};
