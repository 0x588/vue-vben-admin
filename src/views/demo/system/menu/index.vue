<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button  type="primary"  @click="handleCreate">
          新建菜单
        </a-button>
        <a-button @click="expandAll">
          展开全部
        </a-button>
        <a-button @click="collapseAll">
         折叠全部
        </a-button>
        <a-button color="warning" pre-icon="ep:refresh" @click="refreshMenu">
          刷新菜单缓存
        </a-button>      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: IconEnum.EDIT,
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: IconEnum.DELETE,
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { nextTick } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getMenuList } from '@/api/demo/system';
  import { handleTree } from '@/utils/tree'

  import { useDrawer } from '@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns, searchFormSchema } from './menu.data';
  import { usePermission } from '@/hooks/web/usePermission'
  import { useMessage } from '@/hooks/web/useMessage'
  import {IconEnum} from "@/enums/appEnum";


  defineOptions({ name: 'MenuManagement' });

  const { createMessage, createConfirm } = useMessage()

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll, getForm, collapseAll }] = useTable({
    title: '菜单列表',
    api: getList,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  async function getList() {
    const res = await getMenuList(getForm().getFieldsValue() as any)
    return handleTree(res, 'id')
  }
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    reload();
  }

  function refreshMenu() {
    createConfirm({
      title: '刷新菜单',
      iconType: 'warning',
      content: '即将更新缓存刷新浏览器',
      async onOk() {
        const { refreshMenu } = usePermission()
        await refreshMenu()
        createMessage.success('刷新成功')
        // 刷新浏览器
        location.reload()
      },
    })
  }
  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
