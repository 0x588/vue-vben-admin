import { defHttp } from '@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, SmsLoginParams } from './model/userModel';

import { ErrorMessageMode } from '#/axios';

enum Api {
  Login = '/system/auth/login',
  Logout = '/system/auth/logout',
  SmsLogin = '/system/auth/sms-login',
  GetUserInfo = '/system/auth/get-permission-info',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function smsLogin(params: SmsLoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>({ url: Api.SmsLogin, params }, { errorMessageMode: mode })
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
