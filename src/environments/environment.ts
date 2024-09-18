// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const hyperAPI = {
  baseUrl: "https://apitest.hyperbc.pro/shopapi",
}

const roynexAPI = {
  baseUrl2: "http://127.0.0.1:8000/api",
  baseUrl: "https://wallet.cardaxo.com/api/",
}

export const environment = {
  production: false,
  hyperAPI: hyperAPI,
  roynexAPI: roynexAPI,
  appId: "nwsxt4ikfn825waf",
  baseUrl: "https://apitest.hyperbc.pro/shopapi",
  firebaseConfig: {
    apiKey: "AIzaSyAE_g-wbGOkHhp7xQLSDUezNGdQI1RVrMk",
    authDomain: "cardaxo-test.firebaseapp.com",
    projectId: "cardaxo-test",
    storageBucket: "cardaxo-test.appspot.com",
    messagingSenderId: "254907598147",
    appId: "1:254907598147:web:7a87e01ccc09c6ceac5bf6",
    measurementId: "G-092WWWP8M9",
    databaseURL: "cardaxo-test.firebaseio.com"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
