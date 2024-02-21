<script lang="ts" setup>
import { watch } from 'vue'
import { configColumns, configSearchFormSchema } from './config'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import ConfigModal from "@/views/system/common-config/ConfigModal.vue";
import {deleteConfig, getConfigList} from "@/api/system/common-config/config";

defineOptions({ name: 'RightConfig' })

const props = defineProps({
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
})

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()

const [registerTable, { reload }] = useTable({
  title: '配置列表',
  api: getConfigList,
  columns: configColumns,
  formConfig: {
    labelWidth: 120,
    schemas: configSearchFormSchema,
    autoSubmitOnEnter: true,
  },
  useSearchForm: true,
  showTableSetting: true,
  showIndexColumn: false,
  actionColumn: {
    width: 140,
    title: t('common.action'),
    dataIndex: 'action',
    fixed: 'right',
  },
})

function handleCreate() {
  openModal(true, {
    record: props.searchInfo.cateId,
    isUpdate: false,
  })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteConfig(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}

watch(
  () => props.searchInfo,
  (val) => {
    val && reload()
  },
  { deep: true },
)
</script>

<template>
  <div>
    <BasicTable :search-info="searchInfo" @register="registerTable">
      <template #toolbar>
        <a-button v-auth="['system:dict:create']" type="primary" :pre-icon="IconEnum.ADD" @click="handleCreate">
          {{ t('action.create') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              { icon: IconEnum.EDIT, label: t('action.edit'), auth: 'system:dict:update', onClick: handleEdit.bind(null, record) },
              {
                icon: IconEnum.DELETE,
                danger: true,
                label: t('action.delete'),
                auth: 'system:dict:delete',
                popConfirm: {
                  title: t('common.delMessage'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ConfigModal @register="registerModal" @success="reload()" />
  </div>
</template>
