// @flow
import Chance from 'chance';

import type {Insurance} from './core/appActions';

const chance = new Chance();

export const getRandomInsurances = () : Array<Insurance> => {
  
  const numInsurances: number = chance.natural({min: 1, max: 10});
  
  const result: Array<Insurance> = [];

  for (let i: number = 0; i < numInsurances; ++i) {
    result.push({
      title: chance.word({syllables: 3}),
      category: 'Reinsurance',
      yearlyPremium: chance.natural({min: 0, max: 1000})
    });
  }

  return result;
}

const wrapLocalStorageAccess = (fn) => {
  try {
    return fn();
  } catch (e) {
    if (e && e.name === 'SecurityError') {
      console.log('Please enable cookies to be auto logged-in');
    } else {
      console.error(e);
    }
  }
}

export const storeObject = (key: string, obj: *) => {
  const fn = () => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  return wrapLocalStorageAccess(fn);
}

export const getObject = (key: string) : * => {
  const fn = () => {
    if (window.localStorage) {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    }

    return null;
  }

  return wrapLocalStorageAccess(fn);
}
