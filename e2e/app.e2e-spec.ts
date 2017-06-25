import { AppPage } from "./app.po";

describe("angular App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display message saying app works", () => {
    page.navigateTo();
    page.getParagraphText().then((text: string) => {
      expect(text).toEqual("app works!")
    });
  });
});
