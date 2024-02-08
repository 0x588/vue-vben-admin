<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('base.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('base.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('base.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
<!--        <FormItem :style="{ 'text-align': 'right' }">-->
<!--          &lt;!&ndash; No logic, you need to deal with it yourself &ndash;&gt;-->
<!--          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">-->
<!--            {{ t('base.login.forgetPassword') }}-->
<!--          </Button>-->
<!--        </FormItem>-->
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="getCode" :loading="loading">
        {{ t('base.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('base.login.registerButton') }}
      </Button> -->
    </FormItem>
<!--    <ARow class="enter-x" :gutter="[16, 16]">-->
<!--      <ACol :md="8" :xs="24">-->
<!--        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">-->
<!--          {{ t('base.login.mobileSignInFormTitle') }}-->
<!--        </Button>-->
<!--      </ACol>-->
<!--      <ACol :md="8" :xs="24">-->
<!--        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">-->
<!--          {{ t('base.login.qrSignInFormTitle') }}-->
<!--        </Button>-->
<!--      </ACol>-->
<!--      <ACol :md="8" :xs="24">-->
<!--        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">-->
<!--          {{ t('base.login.registerButton') }}-->
<!--        </Button>-->
<!--      </ACol>-->
<!--    </ARow>-->

<!--    <Divider class="enter-x">{{ t('base.login.otherSignIn') }}</Divider>-->

<!--    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">-->
<!--      <GithubFilled />-->
<!--      <WechatFilled />-->
<!--      <AlipayCircleFilled />-->
<!--      <GoogleCircleFilled />-->
<!--      <TwitterCircleFilled />-->
<!--    </div>-->
  </Form>
  <Verify ref="verify" mode="pop" :captcha-type="captchaType" :img-size="{ width: '400px', height: '200px' }" @success="handleLogin" />

</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue';

  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';

  import { useUserStore } from '@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';

  import { usePermissionStore } from '@/store/modules/permission'
  import { useGlobSetting } from '@/hooks/setting'
  import { useDesign } from '@/hooks/web/useDesign';
  import { Verify } from '@/components/Verifition'

  //import { onKeyStroke } from '@vueuse/core';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const permissionStore = usePermissionStore()
  const { captchaEnable } = useGlobSetting()

  const {  getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const verify = ref()
  const captchaType = ref('clickWord') // blockPuzzle 滑块 clickWord 点击文字

  const formData = reactive({
    account: 'admin',
    password: 'admin123',
  });

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function getCode() {
    // 情况一，未开启：则直接登录
    if (captchaEnable === 'false') {
      await handleLogin({})
    }
    else {
      // 情况二，已开启：则展示验证码；只有完成验证码的情况，才进行登录
      // 弹出验证码
      verify.value.show()
    }
  }
  async function handleLogin(params) {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        captchaVerification: params.captchaVerification,
        mode: 'none', //不要默认的错误提示
      });
      if (userInfo) {
        await permissionStore.changePermissionCode(userInfo.permissions)
        notification.success({
          message: t('base.login.loginSuccessTitle'),
          description: `${t('base.login.loginSuccessDesc')}: ${userInfo.user.nickname}`,
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('base.api.errorTip'),
        content: (error as unknown as Error).message || t('base.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
