import { NOTIFICATION_MESSAGES } from 'services/utils';
export const API_NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;
export const SERVICE_ADDRESS = 'https://localhost:44351';
export const API_ACCOUNT_LOGIN = `${SERVICE_ADDRESS}/api/Account/login`;
export const API_ACCOUNT_USER = `${SERVICE_ADDRESS}/api/Account/user`;
export const API_ACCOUNT_LOGOUT = `${SERVICE_ADDRESS}/api/Account/logout`;
export const API_ACCOUNT_REFRESH_TOKEN = `${SERVICE_ADDRESS}/api/Account/refresh-token`;
export const API_ACCOUNT_IMPERSONATION = `${SERVICE_ADDRESS}/api/Account/impersonation`;
export const API_ACCOUNT_STOP_IMPERSONATION = `${SERVICE_ADDRESS}/api/Account/stop-impersonation`;

export const SAPIAT_SERVICE_API = 'https://api.sapiat-dev.com';
export const API_PORTFOLIOS = `${SAPIAT_SERVICE_API}/api/portfolios`;
export const API_SCENARIOS = `${SAPIAT_SERVICE_API}/api/scenarios`;
export const API_FORECASTS = `${SAPIAT_SERVICE_API}/api/forecasts`;
export const API_ASSETS = `${SAPIAT_SERVICE_API}/api/assets`;
export const API_CALCSETTINGS = `${SAPIAT_SERVICE_API}/api/calcsettings`;
export const API_JOBS = `${SAPIAT_SERVICE_API}/api/jobs`;
export const API_SIMS = `${SAPIAT_SERVICE_API}/api/simdata`;
export const API_CHARTS = `${SAPIAT_SERVICE_API}/api/simcharts`;
