import { MonitorizareVotPage } from './app.po';

describe('monitorizare-vot App', function() {
  let page: MonitorizareVotPage;

  beforeEach(() => {
    page = new MonitorizareVotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
