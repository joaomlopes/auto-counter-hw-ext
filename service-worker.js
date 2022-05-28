importScripts("homework.js", "homework.service.js");

const SheCodesHwURL = "https://www.shecodes.io/team/challenge_submissions/";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  //   Ignore the embed urls for Basics projects and only count when the page is loaded.
  if (
    tab.url.includes(SheCodesHwURL) &&
    !tab.url.includes("/embed") &&
    changeInfo.status === "complete"
  ) {
    const hwID = tab.url.replace(SheCodesHwURL, "");

    if (hwID.length > 0) {
      const checked = await HomeworkService.checkedID(hwID);
      if (!checked) {
        await HomeworkService.incrementCounter();
        displayCounter();
        await HomeworkService.saveID(hwID);
      }
    }
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  displayCounter();
});

const displayCounter = async () => {
  const counter = await HomeworkService.getCounter();
  await new Homework().updateBadge(counter);
};
