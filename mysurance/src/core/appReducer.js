// @flow
import { c } from './appActions';
import type { Insurance, AddInsurance } from './appActions';

export type AppState = {
  insuranceCategories: Array<string>,
  insuranceCategoriesFetchIndicator: boolean,
  insurances: Array<Insurance>,
  addInsurance: AddInsurance
};

export const initialState: AppState = {
  insuranceCategories: [],
  insuranceCategoriesFetchIndicator: false,
  insurances: [],
  addInsurance: {
    title: '',
    titleErrorMsg: '',
    yearlyPremium: 0,
    yearlyPremiumErrorMsg: '',
    category: ''
  }
};

const appReducer = (state: AppState = initialState, action: *) => {
  switch (action.type) {
    case c.ADD_INSURANCE:
      {
        return {
          ...state,
          insurances: [
            ...state.insurances,
            {
              ...action.insurance
            }
          ]
        };
      }
    case c.ADD_INSURANCE_SET_DATA:
      {
        const insurance: Insurance = action.insurance;

        const addInsurance: AddInsurance = {
          ...insurance,
          titleErrorMsg: insurance.title ? '' : 'Required.',
          yearlyPremiumErrorMsg: !isNaN(insurance.yearlyPremium) ? '' : 'Required.'
        };

        return {
          ...state,
          addInsurance
        };
      }
    case c.INSURANCE_CATEGORIES_SET_DATA:
      {
        return {
          ...state,
          insuranceCategories: [
            ...action.insuranceCategories
          ]
        };
      }
    case c.INSURANCE_CATEGORIES_GET_DATA_START: 
      {
        return {
          ...state,
          insuranceCategoriesFetchIndicator: true
        }
      } 
    case c.INSURANCE_CATEGORIES_GET_DATA_END: 
      {
        return {
          ...state,
          insuranceCategoriesFetchIndicator: false
        }
      } 
    case c.REMOVE_INSURANCE:
      {
        const insurances = [
          ...state.insurances
        ];
        
        insurances.splice(action.index, 1);

        return {
          ...state,
          insurances
        };
      }
    default:
      return state;
  }
};

export default appReducer;
