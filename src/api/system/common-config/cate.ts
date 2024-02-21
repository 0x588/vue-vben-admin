import { defHttp } from '@/utils/http/axios'
export interface ConfigCateVO {
    id: number
    name: string
    title: string
    status: number
    pid: number
    sort: number
}

export interface  ConfigCatePageReqVO {
    title?: string,
    status?: number,
}

export function getCateList(params: ConfigCatePageReqVO) {
    return defHttp.get({ url: '/system/common-config-cate/list', params })
}
export function listSimpleCate() {
    return defHttp.get({ url: '/system/common-config-cate/list-all-simple'})
}

export function getConfigCate(id: number) {
    return defHttp.get({ url: `/system/common-config-cate/get?id=${id}` })
}

// 新增字典
export function createConfigCate(data: ConfigCateVO) {
    return defHttp.post({ url: '/system/common-config-cate/create', data })
}

// 修改字典
export function updateConfigCate(data: ConfigCateVO) {
    return defHttp.put({ url: '/system/common-config-cate/update', data })
}

export function deleteConfigCate(id: number) {
    return defHttp.delete({ url: `/system/common-config-cate/delete?id=${id}` })
}
