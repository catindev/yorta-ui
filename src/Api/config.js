// let _APP_CONFIG = {
//     "API_URL": "https://api.services.test.emoney.tools"
// }

// if (process.env.REACT_APP_WEBPACK_CONFIG) _APP_CONFIG = JSON.parse(process.env.REACT_APP_WEBPACK_CONFIG);

// export const BASE_URL = _APP_CONFIG.API_URL;

export const BASE_URL = "https://api.services.test.emoney.tools";

console.log(process.env);
console.log("BASE_URL", BASE_URL);
