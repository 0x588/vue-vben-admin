<template>
  <CollapseContainer :canExpan="false">
    <BasicForm @register="register"/>
    <a-button type="primary" @click="handleSubmit"> 保存</a-button>
  </CollapseContainer>
</template>
<script lang="ts" setup>
import {BasicForm, FormSchema, useForm} from '@/components/Form';
import {CollapseContainer} from '@/components/Container';
import {useMessage} from '@/hooks/web/useMessage';
import {baseSetschemas} from './data';
import {ConfigCate} from "@/api/system/config-edit";
import {onMounted} from "vue";
import {configEditSave} from "@/api/system/config-edit";
import {uploadApi} from "@/api/sys/upload";

const props = defineProps({
  cats: {
    type: Object as PropType<ConfigCate[]>
  },
})

const {createMessage} = useMessage();
const [register, {setFieldsValue, appendSchemaByField, validate}] = useForm({
  labelWidth: 120,
  schemas: baseSetschemas,
  showActionButtonGroup: false,
});

onMounted(async () => {
  var obj = {}

  for (const cate of props.cats!) {
    await  appendSchemaByField(
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
      var schema: FormSchema = {
        field: cfg.name,
        label: cfg.title,
        component: cfg.type as any,
        colProps: {
          span: 18,
        },
        helpMessage(renderCallbackParams) {
          return cfg.remark
        },
      }
      if (cfg.type === 'Select' || cfg.type === 'CheckboxGroup') {
        schema.componentProps = {
          options: JSON.parse(cfg.options)
        }
      } else if (cfg.type === 'ImageUpload') {
        schema.componentProps = {
          api: uploadApi,
          accept: ['png', 'jpeg', 'jpg'],
          maxNumber: 1,
          maxSize: 100,
        }
      }
      await  appendSchemaByField(
        schema,
        ''
      );
      if (cfg?.value && cfg.type !== 'ImageUpload'  && cfg.type !== 'CheckboxGroup') {
        obj[cfg.name] = cfg.value.data
      } else if (cfg?.value && cfg.type === 'CheckboxGroup') {
        obj[cfg.name] = JSON.parse(cfg.value.data)
      } else if (cfg?.value && cfg.type === 'ImageUpload') {
        obj[cfg.name] = [cfg.value.data]
      }
    }
  }
  await  setFieldsValue(obj)
})

async function handleSubmit() {
  const values = await validate()
  await configEditSave({cateId: 0, data: JSON.stringify(values)})
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
