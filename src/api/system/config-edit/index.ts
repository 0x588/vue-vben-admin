import { defHttp } from '@/utils/http/axios'

export interface ConfigValue {
  id: number,
  configId: number,
  merchantId: number,
  data: string,
}

export interface Config {
  id: number,
  title: string,
  name: string,
  type: string,
  options: string,
  remark: string,
  value?: ConfigValue,
}

export interface ConfigCate {
  id: number,
  title: string,
  name: string,
  config: Config[],
}

export interface ConfigSaveData{
  cateId: number,
  data: string,
}
export function allConfigEdit() {
  return defHttp.get({ url: '/system/config-edit/all' })
}

export function configEditSave(data: ConfigSaveData) {
  return defHttp.post({ url: '/system/config-edit/save', data })
}
