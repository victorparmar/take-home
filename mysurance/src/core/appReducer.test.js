import { expect } from 'chai';

import appReducer, { initialState } from './appReducer';
import actions, { c } from './appActions';

describe('appReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = appReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.ADD_INSURANCE, () => {

    it('should add an insurance to the list of insurances', () => {
      // when
      const newState = appReducer(undefined, actions.addInsurance({ title: 'insurance', yearlyPremium: 42, category: 'Health insurance' }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          insurances: [
            {
              title: 'insurance',
              yearlyPremium: 42,
              category: 'Health insurance'
            }
          ]
        });
    });

    it('should add an insurance to the list of pre-existing insurances', () => {
      // given
      const existingState = {
        insurances: [{
          title: 'a',
          yearlyPremium: 1,
          category: 'cat'
        }]
      };

      // when
      const newState = appReducer(existingState, actions.addInsurance({ title: 'insurance', yearlyPremium: 42, category: 'Health insurance' }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          insurances: [
            {
              title: 'a',
              yearlyPremium: 1,
              category: 'cat'
            },
            {
              title: 'insurance',
              yearlyPremium: 42,
              category: 'Health insurance'
            }
          ]
        });
    });
  });

  describe(c.ADD_INSURANCE_SET_DATA, () => {

    it('should set data for valid values', () => {
      // when
      const newState = appReducer(undefined, actions.addInsuranceSetData({
        title: 'insurance',
        yearlyPremium: 42,
        category: 'Health insurance'
      }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          addInsurance: {
            title: 'insurance',
            titleErrorMsg: '',
            yearlyPremium: 42,
            yearlyPremiumErrorMsg: '',
            category: 'Health insurance'
          }
        });
    });

    it('should set data for invalid title', () => {
      // when
      const newState = appReducer(undefined, actions.addInsuranceSetData({
        title: '',
        yearlyPremium: 42,
        category: 'Health insurance'
      }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          addInsurance: {
            title: '',
            titleErrorMsg: 'Required.',
            yearlyPremium: 42,
            yearlyPremiumErrorMsg: '',
            category: 'Health insurance'
          }
        });
    });

    it('should set data for invalid premium', () => {
      // when
      const newState = appReducer(undefined, actions.addInsuranceSetData({
        title: 'ok',
        yearlyPremium: NaN,
        category: 'Health insurance'
      }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          addInsurance: {
            title: 'ok',
            titleErrorMsg: '',
            yearlyPremium: NaN,
            yearlyPremiumErrorMsg: 'Required.',
            category: 'Health insurance'
          }
        });
    });
  });

  describe(c.INSURANCE_CATEGORIES_SET_DATA, () => {

    it('should set data', () => {
      // when
      const newState = appReducer(undefined, actions.insuranceCategoriesSetData(['a', 'b']));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          insuranceCategories: ['a', 'b']
        });
    });

  });

  describe(c.INSURANCE_CATEGORIES_GET_DATA_START, () => {

    it('should set start flag', () => {
      // when
      const newState = appReducer(undefined, actions.insuranceCategoriesGetDataStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          insuranceCategoriesFetchIndicator: true
        });
    });

  });

  describe(c.INSURANCE_CATEGORIES_GET_DATA_END, () => {

    it('should set end flag', () => {
      // given
      const state = {
        insuranceCategoriesFetchIndicator: true
      };

      // when
      const newState = appReducer(state, actions.insuranceCategoriesGetDataEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          insuranceCategoriesFetchIndicator: false
        });
    });

  });

  describe(c.REMOVE_INSURANCE, () => {

    it('should remove the first insurance', () => {
      // given
      const state = {
        insurances: [{ title: '1' }, { title: '2' }, { title: '3' }]
      };

      // when
      const newState = appReducer(state, actions.removeInsurance(0));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          insurances: [{ title: '2' }, { title: '3' }]
        });
    });

    it('should remove the last insurance', () => {
      // given
      const state = {
        insurances: [{ title: '1' }, { title: '2' }, { title: '3' }]
      };

      // when
      const newState = appReducer(state, actions.removeInsurance(2));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          insurances: [{ title: '1' }, { title: '2' }]
        });
    });

    it('should remove an insurance in the middle', () => {
      // given
      const state = {
        insurances: [{ title: '1' }, { title: '2' }, { title: '3' }]
      };

      // when
      const newState = appReducer(state, actions.removeInsurance(1));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          insurances: [{ title: '1' }, { title: '3' }]
        });
    });

  });

});
