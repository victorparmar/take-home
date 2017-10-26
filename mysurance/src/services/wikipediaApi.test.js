import { expect } from 'chai';

import { getInsuranceCategories } from './wikipediaApi';

describe('getInsuranceCategories', () => {
  it('should get insurance categories from api data', () => {
    // given
    const input = [
      { "pageid": 34182415, "ns": 14, "title": "Category:Agricultural insurance" },
      { "pageid": 53075320, "ns": 14, "title": "Category:Deposit insurance" },
      { "pageid": 55176392, "ns": 14, "title": "Category:Flood insurance" },
      { "pageid": 23120838, "ns": 14, "title": "Category:Health insurance" },
      { "pageid": 51923062, "ns": 14, "title": "Category:Liability insurance" },
      { "pageid": 23037626, "ns": 14, "title": "Category:Life insurance" },
      { "pageid": 45634815, "ns": 14, "title": "Category:Mortgage insurance" },
      { "pageid": 51782206, "ns": 14, "title": "Category:Property insurance" },
      { "pageid": 37317809, "ns": 14, "title": "Category:Reinsurance" },
      { "pageid": 14832424, "ns": 14, "title": "Category:Self insurance" }
    ];

    // when
    const result = getInsuranceCategories(input);

    // then
    expect(result)
      .to
      .deep
      .equal([
        'Agricultural insurance',
        'Deposit insurance',
        'Flood insurance',
        'Health insurance',
        'Liability insurance',
        'Life insurance',
        'Mortgage insurance',
        'Property insurance',
        'Reinsurance',
        'Self insurance'
      ]);
  });

});
