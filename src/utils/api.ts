// API接口封装示例
import { requestService } from './request';

// 定义API响应的基本结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 用户相关API
export const userApi = {
  // 获取用户信息
  getUserInfo: () => {
    return requestService.get<ApiResponse<any>>('/user/info');
  },
  
  // 更新用户信息
  updateUserInfo: (data: any) => {
    return requestService.post<ApiResponse<any>>('/user/update', data);
  },
  
  // 用户登录
  login: (credentials: { username: string; password: string }) => {
    return requestService.post<ApiResponse<{ token: string }>>('/auth/login', credentials);
  },
  
  // 用户登出
  logout: () => {
    return requestService.post<ApiResponse<any>>('/auth/logout');
  }
};

// 项目相关API
export const projectApi = {
  // 获取项目列表
  getProjects: (params?: any) => {
    return requestService.get<ApiResponse<any[]>>('/projects', { params });
  },
  
  // 获取项目详情
  getProjectDetail: (id: string) => {
    return requestService.get<ApiResponse<any>>(`/projects/${id}`);
  },
  
  // 创建项目
  createProject: (data: any) => {
    return requestService.post<ApiResponse<any>>('/projects', data);
  },
  
  // 更新项目
  updateProject: (id: string, data: any) => {
    return requestService.put<ApiResponse<any>>(`/projects/${id}`, data);
  },
  
  // 删除项目
  deleteProject: (id: string) => {
    return requestService.delete<ApiResponse<any>>(`/projects/${id}`);
  }
};

export default {
  userApi,
  projectApi
};