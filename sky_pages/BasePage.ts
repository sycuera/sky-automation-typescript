import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';

class BasePage {
  agree = Selector('.message-button').withText('Agree');
  iframe = Selector('iframe[id^="sp_message_iframe_"][src*="index.html"]', {
    timeout: 5000,
  });

  constructor() {}

  async openUrl(url) {
    await t
      .setNativeDialogHandler(() => true)
      .navigateTo(`${url}`)
      .maximizeWindow()
      .switchToIframe(this.iframe)
      .click(this.agree)
      .switchToMainWindow();
    return this;
  }

  async click(t, button) {
    await t.click(button);
  }

  async type(element, value) {
    await t.typeText(element, value);
    return t;
  }

  async clearCookie(t) {
    const clearCookies = ClientFunction(() => {
      const cookies = document.cookie.split(';');

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      }
    });

    return clearCookies();
  }

  isVisible(element): boolean {
    let visible = false;
    if (element.exists) visible = true;
    return visible;
  }
}

export default BasePage;
