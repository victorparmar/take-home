const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const expect = require('chai').expect;

const Chance = require('chance');
const chance = new Chance();

const By = webdriver.By;
const until = webdriver.until;

const pauseMillis = 500;

const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .setChromeOptions()
  .setFirefoxOptions()
  .build();

describe('Critical paths:', () => {
  before(() => driver.navigate().to('http://localhost:3012/'));

  const addInsurance = async() => {
    const btnAddInsurance = By.id('btn-add-insurance');
    driver.findElement(btnAddInsurance).click();

    const btnSaveInsurance = By.id('btn-save-insurance');
    driver.wait(until.elementLocated(btnSaveInsurance));
    const $btnSaveInsurance = driver.findElement(btnSaveInsurance);

    const word = chance.word({ syllables: 3 });
    const amt = chance.natural({ min: 1, max: 100 });
    driver.findElement(By.id('title')).sendKeys(word);
    driver.findElement(By.id('yearly-premium')).sendKeys(amt);
    
    await driver.sleep(pauseMillis);

    $btnSaveInsurance.click();
    await driver.wait(until.elementLocated(btnAddInsurance));

    // await driver.sleep(pauseMillis);
  };

  const getRows = async() => {
    const $rows = await driver.findElements(By.tagName('tr'));
    return $rows;
  }

  const deleteInsurance = async() => {
    const deleteInsuranceModal = By.id('delete-insurance-modal');
    driver.wait(until.elementLocated(deleteInsuranceModal));    
    driver.findElement(By.css('.btn-primary')).click();

    // for some reason awaiting does not work
    // await driver.wait(until.elementIsNotVisible(deleteInsuranceModal));
    await driver.sleep(pauseMillis);
  }

  it('should add an insurance', async() => {

    await addInsurance();
    
    const $rows = await getRows();
    expect($rows.length).to.equal(2);
    
    const $columns = await $rows[1].findElements(By.tagName('td'));
    expect($columns.length).to.equal(3);

    const category = await $columns[1].getText();
    expect(category).to.equal('Agricultural insurance');

  });

  it('should delete an insurance', async() => {

    await addInsurance();

    let $rows = await getRows();
    expect($rows.length).to.be.above(1);

    const length = $rows.length;

    for (let i = length - 1; i >= 1; --i) {
      $rows = await getRows();
      $rows[i].click();
      await deleteInsurance();
    }
    
    const $empty = await driver.findElement(By.css('.empty'));
    expect($empty).to.not.be.null;

  });

  afterEach(async() => {
    await driver.sleep(pauseMillis);
  });

  after(() => driver.quit());
});

const getElementIfExists = async(driver, selector) => {

  const $element = await driver.findElement(selector)
    .then($e => {
      return $e;
    }, (err) => {
      if (err instanceof webdriver.error.NoSuchElementError) {
        return null;
      } else {
        webdriver.promise.rejected(err);
      }
    });

  return $element;
}
