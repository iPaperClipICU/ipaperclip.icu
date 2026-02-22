import router from '@/router'
import { type RouteLocationRaw } from 'vue-router'
import NaiveUIDiscreteAPI from '../NaiveUIDiscreteAPI'

export const to = async (to: RouteLocationRaw): Promise<boolean> => {
  try {
    const result = await router.push(to)
    if (result) {
      console.error(result)
      return false
    } else return true
  } catch (e) {
    console.error(e)
    NaiveUIDiscreteAPI.notification.error({
      title: '跳转失败',
      content: '请尝试刷新页面或检查网络',
      meta: String(e),
      keepAliveOnHover: true,
      duration: 5000,
    })
    return false
  }
}
