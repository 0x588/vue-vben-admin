import { defHttp } from '@/utils/http/axios';

export interface MenuVO {
  id: number
  name: string
  permission: string
  type: number
  sort: number
  parentId: number
  path: string
  icon: string
  component: string
  status: number
  visible: boolean
  keepAlive: boolean
  createTime: Date
}

/**
 * @description: Get user menu based on id
 */

export function listSimpleMenus() {
  return defHttp.get({ url: '/system/menu/list-all-simple' })
}

export function getMenu(id: number) {
  return defHttp.get({ url: `/system/menu/get?id=${id}` })
}

// 新增菜单
export function createMenu(data: MenuVO) {
  return defHttp.post({ url: '/system/menu/create', data })
}

// 修改菜单
export function updateMenu(data: MenuVO) {
  return defHttp.put({ url: '/system/menu/update', data })
}

// 删除菜单
export function deleteMenu(id: number) {
  return defHttp.delete({ url: `/system/menu/delete?id=${id}` })
}
