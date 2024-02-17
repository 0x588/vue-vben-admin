import type { ErrorMessageMode } from '#/axios';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
// import router from '@/router';
// import { PageEnum } from '@/enums/pageEnum';
import { useUserStoreWithOut } from '@/store/modules/user';
import projectSetting from '@/settings/projectSetting';
import { SessionTimeoutProcessingEnum } from '@/enums/appEnum';

const { createMessage, createErrorModal } = useMessage();
const error = createMessage.error!;
const stp = projectSetting.sessionTimeoutProcessing;

export function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
): void {
  const { t } = useI18n();
  const userStore = useUserStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.setAccessToken(undefined);
      errMessage = msg || t('base.api.errMsg401');
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        // 被动登出，带redirect地址
        userStore.logout(false);
      }
      break;
    case 403:
      errMessage = t('base.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = t('base.api.errMsg404');
      break;
    case 405:
      errMessage = t('base.api.errMsg405');
      break;
    case 408:
      errMessage = t('base.api.errMsg408');
      break;
    case 500:
      errMessage = t('base.api.errMsg500');
      break;
    case 501:
      errMessage = t('base.api.errMsg501');
      break;
    case 502:
      errMessage = t('base.api.errMsg502');
      break;
    case 503:
      errMessage = t('base.api.errMsg503');
      break;
    case 504:
      errMessage = t('base.api.errMsg504');
      break;
    case 505:
      errMessage = t('base.api.errMsg505');
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      createErrorModal({ title: t('base.api.errorTip'), content: errMessage });
    } else if (errorMessageMode === 'message') {
      error({ content: errMessage, key: `global_error_message_status_${status}` });
    }
  }
}
