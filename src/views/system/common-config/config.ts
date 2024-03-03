import type {BasicColumn, FormSchema} from '@/components/Table'
import {useRender} from '@/components/Table'
import {DICT_TYPE, getDictOptions} from '@/utils/dict'
import {listSimpleCate} from "@/api/system/common-config/cate";

const typeOptions = [
    {
        label: "文本框",
        value: "Input",
    },
    {
        label: "密码框",
        value: "InputPassword",
    },
    {
        label: "数字输入框",
        value: "InputNumber",
    },
    {
        label: "日期选择器",
        value: "DatePicker",
    },
    {
        label: "时间选择器",
        value: "TimePicker",
    },
    {
        label: "下拉选择器",
        value: "Select",
    },
    {
        label: "CheckBox复选",
        value: "CheckboxGroup",
    },
    {
        label: "图片上传",
        value: "ImageUpload",
    },
    {
        label: "单选",
        value: "RadioGroup",
    },
    {
        label: "文本域",
        value: "InputTextArea",
    },
    {
        label: "富文本",
        value: "UEditor",
    }
]

export const configColumns: BasicColumn[] = [
    {
        title: '配置标题',
        dataIndex: 'title',
        width: 120,
    },
    {
        title: '配置标识',
        dataIndex: 'name',
        width: 100,
    },
    {
        title: '配置属性',
        dataIndex: 'type',
        width: 80,
        customRender: ({text}) => {
            const fd = typeOptions.find(obj => obj.value == text)
            return useRender.renderTag(fd?.label ?? "")
        },
    },
    {
        title: '默认值',
        dataIndex: 'defaultValue',
        width: 100,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 60,
        customRender: ({text}) => {
            return useRender.renderDict(text, DICT_TYPE.COMMON_STATUS)
        },
    },
    {
        title: '排序',
        dataIndex: 'sort',
        width: 50,
    },
]

export const configSearchFormSchema: FormSchema[] = [
    {
        label: '分类标题',
        field: 'title',
        component: 'Input',
        colProps: {span: 8},
    },
    {
        label: '分类标识',
        field: 'name',
        component: 'Input',
        colProps: {span: 8},
    },
    {
        label: '状态',
        field: 'status',
        component: 'Select',
        componentProps: {
            options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
        },
        colProps: {span: 8},
    },
]

export const configFormSchema: FormSchema[] = [
    {
        label: '编号',
        field: 'id',
        show: false,
        component: 'Input',
    },
    {
        label: '配置标题',
        field: 'title',
        required: true,
        component: 'Input',
    },
    {
        label: '配置标识',
        field: 'name',
        required: true,
        component: 'Input',
    },
    {
        label: '分类',
        field: 'cateId',
        required: true,
        component: 'ApiTreeSelect',
        componentProps: {
            api: () => listSimpleCate(),
            handleTree: 'id',
            labelField: 'title',
            parentFiled: 'title',
        },
    },
    {
        label: '配置属性',
        field: 'type',
        required: true,
        component: 'Select',
        componentProps: {
            options: typeOptions
        },
    },
    {
        label: '默认值',
        field: 'defaultValue',
        component: 'Input',
    },
    {
        label: '配置项',
        field: 'options',
        component: 'InputTextArea',
    },
    {
        label: '说明',
        field: 'remark',
        component: 'InputTextArea',
    },
    {
        label: '是否隐藏说明',
        field: 'hideRemark',
        defaultValue: true,
        component: 'Checkbox',
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
        defaultValue: 1,
        component: 'Select',
        componentProps: {
            options: getDictOptions(DICT_TYPE.COMMON_STATUS) as any,
        },
    },
]
