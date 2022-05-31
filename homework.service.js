/** @private */
const HOMEWORKS_KEY = "homeworks";
const HOMEWORKS_ID_KEY = "homeworksId";
const APPROVAL_DIFF = 600000; // 10 minutes

/** Shared logic */
class HomeworkService {
  /**
   *
   * @returns {Promise<Number>}
   */
  static getCounter = () => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.get([HOMEWORKS_KEY], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        const researches = result.homeworks ?? 0;
        resolve(researches);
      });
    });

    return promise;
  };

  static incrementCounter = async () => {
    const counter = await this.getCounter();
    const increment = counter + 1;

    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.set({ [HOMEWORKS_KEY]: increment }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(increment);
      });
    });

    return promise;
  };

  static decrementCounter = async () => {
    const counter = await this.getCounter();
    const decrement = counter > 0 ? counter - 1 : 0;

    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.set({ [HOMEWORKS_KEY]: decrement }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(decrement);
      });
    });

    return promise;
  };

  static resetCounter = () => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.set({ [HOMEWORKS_KEY]: 0 }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        resolve();
      });
    });

    return promise;
  };

  /**
   *
   * @returns {Promise<Array>}
   */
  static getHomeworkIDs = () => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.get([HOMEWORKS_ID_KEY], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        const researches = result.homeworksId ?? [];
        resolve(researches);
      });
    });

    return promise;
  };

  static saveID = async (id) => {
    const ids = await this.getHomeworkIDs();
    const updatedIds = [...ids, { id, date: Date.now() }];

    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.set({ [HOMEWORKS_ID_KEY]: updatedIds }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve(updatedIds);
      });
    });

    return promise;
  };

  static clearIDs = () => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.remove([HOMEWORKS_ID_KEY], () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        resolve();
      });
    });

    return promise;
  };

  /**
   *
   * @returns {Promise<String>}
   */
  static getLastId = () => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.get([HOMEWORKS_ID_KEY], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        const researches = result.homeworksId ?? [];
        resolve(researches[researches.length - 1].id);
      });
    });

    return promise;
  };

  /**
   *
   * @returns {Promise<Boolean>}
   */
  static checkedID = (currentID) => {
    const promise = toPromise((resolve, reject) => {
      chrome.storage.local.get([HOMEWORKS_ID_KEY], (result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);

        const researches = result.homeworksId ?? [];
        const exists = researches.some(
          (obj) => obj.id === currentID && Date.now() - obj.date < APPROVAL_DIFF
        );

        resolve(exists);
      });
    });

    return promise;
  };
}

/**
 * Promisify a callback.
 * @param {Function} callback
 * @returns {Promise}
 */
const toPromise = (callback) => {
  const promise = new Promise((resolve, reject) => {
    try {
      callback(resolve, reject);
    } catch (err) {
      reject(err);
    }
  });
  return promise;
};
