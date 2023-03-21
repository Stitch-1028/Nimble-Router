import { get, post, put, remove, upload } from './config'
/** 登录接口 */
//#region
export const uploadUrl = `${import.meta.env.VITE_API_BASE_URL}/api/v1/file/upload`
/**
 * 获取用户信息
 */
export const getUserInfo = (userId?: string) => get(`/api/v1/sysUser/detail/${userId}`)
/**
 * 修改个人信息
 */
export const setUserInfo = <T>(data: T) => post(`/api/v1/account/modify/userInfo`, data)

/**
 * @param {*} data
 * 登录
 */
export const login = <T>(data: T) => post('/api/v1/account/login', data)
/**
 * @param {*} data
 * 注册
 */
export const register = <T>(data: T) => post('/api/v1/account/register', data)
/**
 * @param {*} data
 * 找回密码
 */
export const getBack = <T>(data: T) => post('/api/v1/account/modify/password', data)
//#endregion
/***************************************/

// /** 角色管理 */
// //#region

// /**
//  * @param {*} data
//  * 获取设备信息列表接口
//  */
export const getRoleList = <T>(data: T) => get('/api/v1/sysRole/list', data)

// /**
//  * @param {*} data
//  * 获取所有权限
//  */
// export const getAllRole = () => get('/api/v1/sysRole/getAll')

// /**
//  * @param {*} data
//  * 删除角色权限
//  */
// export const removeRole = (roleId) => remove(`/api/v1/sysRole/${roleId}/delete`)

// /**
//  * @param {*} data
//  * 新增角色权限
//  */
// export const addRole = (data) => post('/api/v1/sysRole/create', data)

// /**
//  * @param {*} data
//  * 修改角色权限
//  */
// export const editRole = (data) => put(`/api/v1/sysRole/${data.id}/modify`, data)

// // 修改用户职位
// /**
//  *
//  * @param {*} data
//  * 修改用户职位
//  */
// export const updateRole = (data) => put('/api/v1/sysUser/modify/role', data)
// //#endregion
// /***************************************/

// /** 人员列表 */
// //#region
// /**
//  * @param {*} data
//  * 获取员工列表
//  */
// export const getPeopleList = (data) => get('/api/v1/employee/list', data)

// /**
//  * @param {*} data
//  * 新增员工
//  */
// export const addPeople = (data) => post('/api/v1/employee/create', data)

// /**
//  * @param {*} data
//  * 修改员工信息
//  */
// export const editPeople = (data) => put(`/api/v1/employee/${data.id}/modify`, data)
// //#endregion
// /***************************************/

// /** 用户模块 */
// //#region
// /**
//  * @param {*} data
//  * 获取任务列表接口
//  */
// export const getUserList = (data) => get('/api/v1/sysUser/list', data)

// /**
//  * @param {*} data
//  * 新增任务
//  */
// export const addTask = (data) => {
//   console.log(data)
// }
// //#endregion
// /***************************************/

// /** 项目模块 */
// //#region
// /**
//  * @param {*} data
//  * 获取项目列表接口
//  */
// export const getProjectList = (data) => get('/api/v1/urban/project/query', data)

// /**
//  * @param {*} data
//  * 项目申报
//  */
// export const ProjectApply = (data) => post('/api/v1/urban/project/apply', data)

// /**
//  * @param {*} data
//  * 获取项目详情
//  */
// export const getProjectDetail = (projectId: string) => get(`/api/v1/urban/project/${projectId}/detail`)

// /**
//  * @param {*} data
//  * 修改项目申报
//  */
// export const updateProjectApply = (data) => put(`/api/v1/urban/project/${data.id}/modify`, data)

// /**
//  * @param {*} data
//  * 开工、完工:项目经理更改状态
//  */
// export const changeStatus = (data) => put(`/api/v1/urban/project/${data.projectId}/changeStatus`, data)

// /**
//  * @param {*} data
//  *   添加项目成员
//  */
// export const createUser = (data) =>
//   put(`/api/v1/urban/project/${data.projectId}/create/user`, {
//     member: {
//       userId: data.userId,
//       position: data.position
//     }
//   })

// /**
//  * @param {*} data
//  *   管理员项目审批
//  */
// export const adminProjectApply = (data) => put(`/api/v1/urban/project/${data.projectId}/approve`, data)

// /**
//  * @param {*} data
//  *   删除成员
//  */
// export const removePeople = (data: ProjectType) => put(`/api/v1/urban/project/${data.projectId}/delete/${data.userId}`)

// /**
//  * @param {*} data
//  *   下载菜单
//  */
// export const getPeopleFindAll = (data) => get(`/api/v1/sysUser/findAll`, data)

// /**
//  * @param {*} data
//  *   重新审批
//  */
// export const reRoadSubmit = (data: ProjectType) => put(`/api/v1/urban/project/${data.projectId}/anewApply`, data)

// //#endregion
// /***************************************/

// /** 资金模块 */
// //#region
// /**
//  * @param {*} data
//  * 项目管理员资金审批
//  */
// export const adminApply = (data) => put(`/api/v1/capital/detail/${data.id}/approve`, data)
// /**
//  * @param {*} data
//  * 员工申请资金
//  */
// export const userApply = (data) => post(`/api/v1/capital/detail/${data.capitalId}/apply`, data)
// /**
//  * @param {*} data
//  * 资金列表
//  */
// export const getCapitalDetailList = (data) => get('/api/v1/capital/detail/query', data)

// /**
//  * @param {*} data
//  * 资金详情
//  */
// export const getCapitalDetail = (capitalId) => get(`/api/v1/capital/${capitalId}/detail`)
// /**
//  * @param {*} data
//  * 资金分页查询
//  */
// export const getCapitalList = (data) => get('/api/v1/capital/query', data)

// /**
//  * @param {*} data
//  * 重新申请
//  */
// export const reStartSubmit = (data) => put(`/api/v1/capital/detail/anewApply/${data.id}`, data)

// //#endregion
// /***************************************/

// /** 统计模块 */
// /**
//  * @param {*} data
//  * 统计
//  */
// export const getCounts = () => get('/api/v1/urban/statistics/counts')
