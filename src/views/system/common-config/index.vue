<script lang="ts" setup>
import { reactive } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { useMessage } from '@/hooks/web/useMessage'
import { useModal } from '@/components/Modal'
import { IconEnum } from '@/enums/appEnum'
import { BasicTable, TableAction, useTable } from '@/components/Table'
import {cateColumns, cateSearchFormSchema} from "@/views/system/common-config/config.cate";
import ConfigCateModal from "@/views/system/common-config/ConfigCateModal.vue";
import {handleTree} from "@/utils/tree";
import {deleteConfigCate, getCateList} from "@/api/system/common-config/cate";
import Config from "@/views/system/common-config/Config.vue";

defineOptions({ name: 'CommonConfig' })

const { t } = useI18n()
const { createMessage } = useMessage()
const [registerModal, { openModal }] = useModal()
const searchInfo = reactive<Recordable>({})

const [registerTable, { reload, getForm }] = useTable({
  title: '配置分类',
  api: getList,
  columns: cateColumns,
  formConfig: {
    labelWidth: 120,
    schemas: cateSearchFormSchema,
  },
  isTreeTable: true,
  pagination: false,
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

async function getList() {
  const res = await getCateList(getForm().getFieldsValue() as any)
  return handleTree(res, 'id', 'pid', )
}
function handleRowClick(record) {
  searchInfo.cateId = record.id
}

function handleCreate() {
  openModal(true, { isUpdate: false })
}

function handleEdit(record: Recordable) {
  openModal(true, { record, isUpdate: true })
}

async function handleDelete(record: Recordable) {
  await deleteConfigCate(record.id)
  createMessage.success(t('common.delSuccessText'))
  reload()
}
</script>

<template>
  <div class="flex">
    <BasicTable class="w-1/2" @register="registerTable" @row-click="handleRowClick">
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
    <Config class="w-1/2" :search-info="searchInfo" />
    <ConfigCateModal @register="registerModal" @success="reload()" />
  </div>
</template>
