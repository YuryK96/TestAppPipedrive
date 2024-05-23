import 'https://cdn.jsdelivr.net/npm/@pipedrive/app-extensions-sdk@0/dist/index.umd.js';

let sdk = null;
(async function () {
    sdk = await new AppExtensionsSDK().initialize();
    await  resize(800, 900)
})();
async function resize(h, w) {
    await sdk.execute(AppExtensionsSDK.Command.RESIZE, {height: h, width: w});
};
async function redirectToNewDeal(id) {
    await sdk.execute(AppExtensionsSDK.Command.REDIRECT_TO, {view: AppExtensionsSDK.View.DEALS, id});
};

export default {redirectToNewDeal}
