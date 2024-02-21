import { defHttp } from '@/utils/http/axios'
export interface ConfigVO {
    id: number,
    name: string,
    title: string,
    type: string,
    cateId: number,
    options: string,
    remark: string,
    hideRemark: boolean,
    defaultValue: string,
    status: number,
    sort: number,
}

export interface  ConfigPageReqVO {
    cateId?: number,
    title?: string,
    status?: number,
}

export function getConfigList(params: ConfigPageReqVO) {
    return defHttp.get({ url: '/system/common-config/page', params })
}
export function listSimpleConfig() {
    return defHttp.get({ url: '/system/common-config/list-all-simple'})
}

export function getConfig(id: number) {
    return defHttp.get({ url: `/system/common-config/get?id=${id}` })
}

// 新增字典
export function createConfig(data: ConfigVO) {
    return defHttp.post({ url: '/system/common-config/create', data })
}

// 修改字典
export function updateConfig(data: ConfigVO) {
    return defHttp.put({ url: '/system/common-config/update', data })
}

export function deleteConfig(id: number) {
    return defHttp.delete({ url: `/system/common-config/delete?id=${id}` })
}
