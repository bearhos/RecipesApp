import camelcaseKeys from 'camelcase-keys';
import { Dimensions } from 'react-native';


export const isNull = (data: any) => {
  if (data === undefined || data == null || data?.length === 0) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  } else if (Array.isArray(data) && data.length === 0) {
    return true;
  }
  return false;
};
export enum MaxSize {
  WIDTH = Dimensions.get('window').width,
  HEIGHT = Dimensions.get('window').height,
}
Array.prototype.includesObj = function (obj) {
  for (let i = 0; i < this.length; i++) {
    if (
      JSON.stringify(this[i], Object.keys(this[i]).sort()) ===
      JSON.stringify(obj, Object.keys(obj).sort())
    )
      return true;
  }
  return false;
};
export const parseXmlToJson = (xml: string) => {
  const json: any = {};
  for (const res of xml.matchAll(
    /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm,
  )) {
    const key = res[1] || res[3];
    const value = res[2] && parseXmlToJson(res[2]);
    json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
  }
  return json;
};
export const makeParam = (params: any) => {
  const paramObject = {
    ...params,
  };

  const paramList: string[] = [];
  for (const key in paramObject) {
    const value = paramObject[key];
    if (!isNull(value)) {
      if (Array.isArray(value)) {
        paramList.push(key + '=' + encodeURIComponent(JSON.stringify(value)));
      } else {
        paramList.push(key + '=' + encodeURIComponent(paramObject[key]));
      }
    }
  }
  const paramStr = paramList.reduce((currentValue, item, index) => {
    const nextValue =
      index === 0 ? currentValue + item : currentValue + '&' + item;
    return nextValue;
  }, '?');

  return paramStr.length !== 1 ? paramStr : '';
};
export const normalizeJsonApiIfNeed = (data: any) => {
  // detect xml file
  if (typeof data === 'string') {
    if (data.includes('xml')) {
      const newData = parseXmlToJson(data);
      return camelcaseKeys(newData, {deep: true});
    }
    return camelcaseKeys({message: data}, {deep: true});
  } else if (typeof data === 'object') {
    const values = Object.values(data);
    const valuesStr = values.join('');

    if (valuesStr.includes('xml') || valuesStr.includes('html')) {
      return normalizeJsonApiIfNeed(valuesStr);
    }
  }

  return camelcaseKeys(data, {deep: true});
};
