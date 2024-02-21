import type { BasicColumn, FormSchema } from '@/components/Table'
import { useRender } from '@/components/Table'
import { DICT_TYPE, getDictOptions } from '@/utils/dict'
import {listSimpleCate} from "@/api/system/common-config/cate";

export const cateColumns: BasicColumn[] = [
  {
    title: '分类标题',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '分类标识',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ text }) => {
      return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 50,
  },
]

export const cateSearchFormSchema: FormSchema[] = [
  {
    label: '分类标题',
    field: 'title',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '分类标识',
    field: 'name',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
    colProps: { span: 8 },
  },
]

export const cateFormSchema: FormSchema[] = [
  {
    label: '编号',
    field: 'id',
    show: false,
    component: 'Input',
  },
  {
    label: '父级',
    field: 'pid',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      api: () => listSimpleCate(),
      parentLabel: '顶级',
      handleTree: 'id',
      labelField: 'title',
      parentFiled: 'title',
    },
  },
  {
    label: '分类标题',
    field: 'title',
    required: true,
    component: 'Input',
  },
  {
    label: '分类标识',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '显示排序',
    field: 'sort',
    required: true,
    component: 'InputNumber',
    defaultValue: 10,
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    componentProps: {
      options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
    },
  },
]
