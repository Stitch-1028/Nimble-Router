declare module '*.vue'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare type Method = 'get' | 'delete' | 'post' | 'put'
declare type onNull = { [other?: string]: any } | undefined
declare interface maybeNullObject {
  [other: string]: any
}
// 项目类型
declare interface ProjectType {
  projectId: string
  userId?: string
  // 该写法可以使该类型除projectId和userId之外拥有其他任何属性
  [other: string]: any
}
// 接口的返回类型
declare interface axiosReturnType {
  code: number
  data: unknown
  [other: string]: any
}
