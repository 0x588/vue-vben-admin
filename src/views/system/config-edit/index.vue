<template>
  <ScrollContainer>
    <div ref="wrapperRef" :class="prefixCls">
      <Tabs tab-position="left" :tabBarStyle="tabBarStyle">
        <template v-for="item in settingList" :key="item.id">
          <TabPane :tab="item.title">
            <BaseSetting :cats="item.children"></BaseSetting>
          </TabPane>
        </template>
      </Tabs>
    </div>
  </ScrollContainer>
</template>

<script lang="ts" setup>
  import { Tabs } from 'ant-design-vue';
  import { ScrollContainer } from '@/components/Container';
  import {onMounted, ref} from "vue";
  import {allConfigEdit} from "@/api/system/config-edit";
  import BaseSetting from "@/views/system/config-edit/BaseSetting.vue";

  defineOptions({ name: 'ConfigEdit' })

  const TabPane = Tabs.TabPane;

  const prefixCls = 'account-setting';
  const tabBarStyle = {
    width: '220px',
  };

  var settingList = ref()
  onMounted(async  () => {
    settingList.value = await allConfigEdit()
  })

</script>
<style lang="less">
  .account-setting {
    margin: 12px;
    background-color: @component-background;

    .base-title {
      padding-left: 0;
    }

    .ant-tabs-tab-active {
      background-color: @item-active-bg;
    }
  }
</style>
