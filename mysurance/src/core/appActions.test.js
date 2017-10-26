import nock from 'nock';
import { expect } from 'chai';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const localStorage = {};

const localStorageMock = {
  setItem(key, value) {
    return Object.assign(localStorage, {
      [key]: value
    });
  },
  getItem(key) {
    return localStorage[key];
  }
};

window.localStorage = localStorageMock;

import appActions, { c } from './appActions';

const mockStore = configureMockStore([thunk]);

describe('appActions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  const wikipediaApiResponse = {
    query: {
      categorymembers: [
        { "pageid": 34182415, "ns": 14, "title": "Category:Agricultural insurance" },
        { "pageid": 53075320, "ns": 14, "title": "Category:Deposit insurance" }
      ]
    }
  }

  const insuranceCategories = [
    'Agricultural insurance',
    'Deposit insurance'
  ];

  describe('insuranceCategoriesGetDataThunk', () => {
    it('initiates a get data action, sets data, ends getting data and redirects to provided location', async() => {

      // given
      nock('https://en.wikipedia.org')
        .get('/w/api.php')
        .query(true)
        .reply(200, wikipediaApiResponse);

      const expectedActions = [
        appActions.insuranceCategoriesGetDataStart(),
        appActions.insuranceCategoriesSetData(insuranceCategories),
        appActions.insuranceCategoriesGetDataEnd(),
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        }
      ];

      const store = mockStore({});

      // when
      await store.dispatch(appActions.insuranceCategoriesGetDataThunk('/'));

      // then
      const actions = store.getActions();
      expect(actions).to.deep.equal(expectedActions);

    });

    it('initiates a get data action, sets data, ends getting data when no location provided', async() => {

      // given
      nock('https://en.wikipedia.org')
        .get('/w/api.php')
        .query(true)
        .reply(200, wikipediaApiResponse);

      const expectedActions = [
        appActions.insuranceCategoriesGetDataStart(),
        appActions.insuranceCategoriesSetData(insuranceCategories),
        appActions.insuranceCategoriesGetDataEnd()
      ];

      const store = mockStore({});

      // when
      await store.dispatch(appActions.insuranceCategoriesGetDataThunk());

      // then
      const actions = store.getActions();
      expect(actions).to.deep.equal(expectedActions);
    });

  });

  describe('addInsuranceSaveThunk', () => {
    const insurance = {
      title: 'insurance',
      yearlyPremium: 22,
      category: 'keyboard cat'
    };

    it('adds insurance and redirects to provided location', async() => {
      // given
      const expectedActions = [
        appActions.addInsurance(insurance),
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        }
      ];

      const store = mockStore({});

      // when
      await store.dispatch(appActions.addInsuranceSaveThunk(insurance, insuranceCategories, '/'))

      // then
      const actions = store.getActions();
      expect(actions).to.deep.equal(expectedActions);
    });

    it('adds insurance', async() => {

      // given
      const expectedActions = [
        appActions.addInsurance(insurance)
      ];

      const store = mockStore({});

      // when
      await store.dispatch(appActions.addInsuranceSaveThunk(insurance, insuranceCategories));

      // then
      const actions = store.getActions();
      expect(actions).to.deep.equal(expectedActions);
    });

    it('adds insurance and sets first category when none set', async() => {

      // given
      const expectedActions = [
        appActions.addInsurance({
          ...insurance,
          category: insuranceCategories[0]
        })
      ];

      const store = mockStore({});

      // when
      await store.dispatch(appActions.addInsuranceSaveThunk({ ...insurance, category: '' }, insuranceCategories));

      // then
      const actions = store.getActions();
      expect(actions).to.deep.equal(expectedActions);
    });

  });

});
