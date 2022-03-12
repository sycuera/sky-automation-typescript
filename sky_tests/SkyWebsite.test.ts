import { getTestData } from '../sky_test_data/TestData';
import { ClientFunction } from 'testcafe';
import BasePage from '../sky_pages/BasePage';
import HomePage from '../sky_pages/HomePage';

const basePage = new BasePage();
const homePage = new HomePage();
const url = getTestData().url;
const user = getTestData().user;

fixture('Shop page is navigable and usable').beforeEach(async (t) => {
  await basePage.clearCookie(t);
});

test('User navigates to shop page', async (t) => {
  await basePage.openUrl(url.sky);
  await homePage.click(t, homePage.deal);
  const getLocation = ClientFunction(() => document.location.href);
  await t
    .expect(getLocation())
    .contains(
      url.dealsUrl,
      'Current url do not match with expected url'
    );
});

test('User sees tiles on the shop page', async (t) => {
  await basePage.openUrl(url.sky);
  await homePage.invalidLogin(t, user.invalidUsername);
  await t
    .expect(homePage.createPasswordTextBoxVisible())
    .eql(
      true,
      "Not able to see a box with the text ‘Create your My Sky password'"
    );
});

test('User sees a list of deals on the deals page', async (t) => {
  await basePage.openUrl(url.dealsUrl);
  await t
    .expect(await homePage.validateDealsAndPricesAreVisible(5))
    .eql(true, 'Not able to see list of deals with prices');
});

fixture(
  'search show the results that are determined by editorial, as well as generic searches'
).beforeEach(async (t) => {
  await basePage.clearCookie(t);
});

test('search show the results that are determined by editorial', async (t) => {
  await basePage.openUrl(url.sky);
  await homePage.searchSky(t);
  await t
    .expect(homePage.editorialSectionVisible())
    .eql(true, 'Editorial section is not visible');
});
