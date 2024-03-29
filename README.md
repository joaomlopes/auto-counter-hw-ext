# SheCodes Homework Counter Chrome Extension

Chrome extension that auto increments while reviewing homeworks removing the need to manually increment.
If you click on the icon, it'll show a small UI where you can also check the counter value and manually increment, decrement or reset.

## Install

Pull this repository and store the folder in a safe place.

On your Chrome window, access `chrome://extensions` and then on the top right enable the Developer mode.

Click on the top left button "Load unpacked" and choose the location of the folder. Click [here](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked) for more details.

The extension will show up on the extensions page and you're ready to start using it.

## Constraints

To avoid increment when navigating back and forth on already reviewed homeworks, in case there's a resubmission and that resubmission is in the last 10 min, then it won't increment the counter automatically. If it's older than 10min, it'll increment the counter.
