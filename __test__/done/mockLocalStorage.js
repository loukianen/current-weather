export default {
  register: () => {
    let storage = window.customLocalStorage;
    // let methods = window.customLocalStorageMethods;

    if (storage) {
      return {
        storage,
        methods: window.customLocalStorageMethods,
      };
    }

    storage = {};

    const setItem = jest.spyOn(Storage.prototype, 'setItem');
    setItem.mockImplementation((key, value) => {
      storage[key] = JSON.stringify(value);
    });

    const getItem = jest.spyOn(Storage.prototype, 'getItem');
    getItem.mockImplementation((key) => (storage[key] ? storage[key] : null));

    window.customLocalStorageMethods = { setItem, getItem };

    return storage; // { storage, methods };
  },
  unregister: () => {
    const methods = window.customLocalStorageMethods;
    console.log('methods');
    console.log(methods);
    if (methods) {
      const { setItem, getItem } = methods;
      setItem.mockReset();
      getItem.mockReset();
    }
    delete window.customLocalStorageMethods;
    delete window.customLocalStorage;
  },
};
