/** Shared logic */
class Homework {
  /**
   * Gets the active Tab
   * @returns {Promise<*>} Active tab
   */
  getActiveTab = async () => {
    const query = { active: true, currentWindow: true };
    const tabs = await chrome.tabs.query(query);

    return tabs[0];
  };

  /**
   * Display a badge with the counter value over the browser action icon
   * @returns {Promise<void>}
   */
  updateBadge = async (value) => {
    await chrome.action.setBadgeText({ text: value.toString() });
  };

  /**
   * Hide the browser action badge.
   * @returns {Promise<void>}
   */
  clearBadge = async () => {
    await chrome.action.setBadgeText({ text: "" });
  };
}
