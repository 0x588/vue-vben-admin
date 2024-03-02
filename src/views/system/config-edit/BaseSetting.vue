<template>
  <CollapseContainer :canExpan="false">
        <BasicForm @register="register" />
    <a-button type="primary" @click="handleSubmit"> 更新基本信息 </a-button>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';

  import { useMessage } from '@/hooks/web/useMessage';

  import { baseSetschemas } from './data';
  import {ConfigCate} from "@/api/system/config-edit";
  import {onMounted} from "vue";
  import { configEditSave } from "@/api/system/config-edit";
  import {toJSONString} from "xe-utils";


  const props = defineProps({
    cats: {
      type: Object as PropType<ConfigCate[]>
    },
  })


  const { createMessage } = useMessage();

  const [register, { setFieldsValue, appendSchemaByField, validate }] = useForm({
    labelWidth: 120,
    schemas: baseSetschemas,
    showActionButtonGroup: false,
  });

  onMounted(() => {
    for (const cate of props.cats!) {
      appendSchemaByField(
        {
          field: cate.name,
          component: 'BasicTitle',
          label: cate.title,
          componentProps: {
            span: true,
          },
          colProps: {
            span: 24,
          },
        },
        ''
      )
      for (const cfg of cate.config) {
        appendSchemaByField(
          {
            field: cfg.name,
            label: cfg.title,
            component: cfg.type,
            colProps: {
              span: 18,
            },
          },
          ''
        );
        if (cfg?.value) {
          var obj = {}
          obj[cfg.name] = cfg.value.data
          setFieldsValue(obj)
        }
      }
    }
  })

  async function  handleSubmit() {
    const values = await validate()
    await configEditSave({cateId: 0, data: toJSONString(values)})
    createMessage.success('更新成功！');
  }
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
</style>
