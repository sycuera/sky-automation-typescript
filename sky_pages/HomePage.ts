import { Selector } from 'testcafe';
import BasePage from './BasePage';

class HomePage extends BasePage {
  signIn = Selector('[data-test-id="sign-in-link"]').withExactText('Sign in');
  username = Selector('[id="username"]');
  deal = Selector('[data-test-id="nav-item-link"]').withExactText('Deals');
  signInIframe = Selector(
    'iframe[title="iFrame containing Sky Sign-In application"]',
    { timeout: 5000 }
  );

  continue = Selector('span').withText('Continue');
  createPasswordTextBox = Selector('[data-test-id="CREATE_PASSWORD__TITLE"]');
  searchIcon = Selector('.search-toggle__icon');
  searchBar = Selector('[data-test-id="input-box"]');
  editorialSection = Selector('[data-test-id="editorial-section"]');

  async invalidLogin(t, username) {
    await this.click(t, this.signIn);
    await t.switchToIframe(this.signInIframe);

    await this.type(this.username, username);
    await this.click(t, this.continue);
  }

  async searchSky(t) {
    await this.click(t, this.searchIcon);
    await this.type(this.searchBar, 'Sky');
    await t.wait(3000);
  }
  createPasswordTextBoxVisible() {
    return this.isVisible(this.createPasswordTextBox);
  }
  editorialSectionVisible() {
    return this.isVisible(this.editorialSection);
  }
  async isPriceVisible(i) {
    const price = await Selector('//span[contains(@id,"price.offer")]').nth(i);
    return price;
  }
  async isDealVisible(i) {
    const deal = await Selector(
      '//div[contains(@data-content-id,"offer")]'
    ).nth(i);
    return this.isVisible(this.deal);
  }

  async validateDealsAndPricesAreVisible(numOfDeals) {
    let visibilityCount = 0;
    let visible = false;
    let i;
    for (i = 1; i <= 5; i++) {
      const dealStatus = await this.isDealVisible(i);
      const priceStatus = await this.isPriceVisible(i);
      if (
        dealStatus.toString() === 'true' &&
        priceStatus.toString() === 'true'
      ) {
        visibilityCount++;
      }
    }
    if (visibilityCount === numOfDeals) visible = true;
    return visible;
  }
}

export default HomePage;
