const electron = window.require('electron');
const remote = electron.remote;
const dbManager = remote.require('./src/DBManager');
const clientManager = remote.require('./src/clientManager');
const ipcRenderer = electron.ipcRenderer;

export const myAccount = remote.require('./src/Account');

export const closeComposerWindow = () => {
  ipcRenderer.send('close-composer');
};

export const createAccount = params => {
  return dbManager.createAccount(params);
};

export const createEmail = params => {
  return dbManager.createEmail(params);
};

export const createKeys = params => {
  return dbManager.createKeys(params);
};

export const getKeys = params => {
  return dbManager.getKeys(params);
};

export const getPreKeyPair = params => {
  return dbManager.getPreKeyPair(params);
};

export const getSignedPreKey = params => {
  return dbManager.getSignedPreKey(params);
};

export const getAccount = () => {
  return dbManager.getAccount();
};

export const updateEmail = params => {
  return dbManager.updateEmail(params);
};

export const findKeyBundles = params => {
  return clientManager.findKeyBundles(params);
};

export const postEmail = params => {
  return clientManager.postEmail(params);
};

export const updateEmailLabel = params => {
  return dbManager.updateEmailLabel(params);
};
