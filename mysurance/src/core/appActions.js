// @flow
import { push } from 'react-router-redux';
import fetch from 'isomorphic-fetch';

import {categoriesUrl, getInsuranceCategories} from '../services/wikipediaApi';

export const c = {
  INSURANCE_CATEGORIES_GET_DATA_START: 'INSURANCE_CATEGORIES_GET_DATA_START',
  INSURANCE_CATEGORIES_GET_DATA_END: 'INSURANCE_CATEGORIES_GET_DATA_END',
  INSURANCE_CATEGORIES_SET_DATA: 'INSURANCE_CATEGORIES_SET_DATA',
  ADD_INSURANCE_SET_DATA: 'ADD_INSURANCE_SET_DATA',
  ADD_INSURANCE: 'ADD_INSURANCE',
  REMOVE_INSURANCE: 'REMOVE_INSURANCE'
};

export type Insurance = { 
  title: string, 
  yearlyPremium: number, 
  category: string 
};

export type AddInsurance = Insurance & { 
  titleErrorMsg: string,
  yearlyPremiumErrorMsg: string 
};

const appActions = {
  addInsuranceSetData: (insurance: Insurance) => {
    return {
      type: c.ADD_INSURANCE_SET_DATA,
      insurance
    };
  },
  addInsurance: (insurance: Insurance) => {
    return {
      type: c.ADD_INSURANCE,
      insurance
    };
  },
  addInsuranceSaveThunk: (insurance: Insurance, insuranceCategories: Array<string>, location: ?string) => {
    return (dispatch: *, getState: *) => {
      insurance.category = insurance.category ? insurance.category : insuranceCategories[0];

      dispatch(appActions.addInsurance(insurance));
      if (location) {
        dispatch(push(location));
      }
    };
  },
  insuranceCategoriesGetDataStart: () => {
    return {
      type: c.INSURANCE_CATEGORIES_GET_DATA_START
    };
  },
  insuranceCategoriesGetDataEnd: () => {
    return {
      type: c.INSURANCE_CATEGORIES_GET_DATA_END
    };
  },
  insuranceCategoriesSetData: (insuranceCategories: Array<string>) => {
    return {
      type: c.INSURANCE_CATEGORIES_SET_DATA,
      insuranceCategories
    };
  },
  insuranceCategoriesGetDataThunk: (location: ?string) => {
    return (dispatch: *, getState: *) => {
      dispatch(appActions.insuranceCategoriesGetDataStart());
      
      return fetch(categoriesUrl, {
          method: 'GET', 
          headers: {  
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          const insuranceCategories: Array<string> = getInsuranceCategories(responseJson.query.categorymembers);
          dispatch(appActions.insuranceCategoriesSetData(insuranceCategories));
          dispatch(appActions.insuranceCategoriesGetDataEnd());
          
          if (location) {
            dispatch(push(location));
          }
        })
        .catch(err => {
          console.error(err);
          alert(err);
        });
    };
  },
  removeInsurance: (index: number) => {
    return {
      type: c.REMOVE_INSURANCE,
      index
    };
  }
};

export default appActions;
