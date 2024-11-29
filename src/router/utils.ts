import { Route } from '@/router/route'

export const baseUrl = '/magnet'
export function isTargetRoute(target: Route, { pathname }: URL): boolean {
  const url = pathname === baseUrl ? '/' : pathname.replace(new RegExp(`^${baseUrl}`), '')
  return target.toString() === url
}
