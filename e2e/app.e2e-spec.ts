import { WsetPage } from './app.po';

describe('wset App', () => {
  let page: WsetPage;

  beforeEach(() => {
    page = new WsetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
