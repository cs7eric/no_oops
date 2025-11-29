import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// 重试配置接口
interface RetryConfig {
  retries: number;
  delay: number;
  exponentialBackoff?: boolean;
}

// 扩展Axios请求配置，添加重试配置
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryConfig?: RetryConfig;
  _retryCount?: number;
}

// 创建axios实例
const request: AxiosInstance = axios.create({
  // 基础URL，可以根据环境变量进行配置
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  // 请求超时时间
  timeout: 10000,
  // 默认请求头
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: ExtendedAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 例如：添加认证token
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // 设置默认重试配置（如果没有提供自定义配置）
    if (!config.retryConfig) {
      config.retryConfig = {
        retries: 3,
        delay: 1000,
        exponentialBackoff: true
      };
    }
    
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    // 可以根据后端返回的状态码进行统一处理
    const { data } = response;
    return data;
  },
  async (error: AxiosError) => {
    // 获取原始请求配置
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    
    // 如果有配置重试并且还没有达到最大重试次数
    if (originalRequest && originalRequest.retryConfig) {
      const { retries, delay, exponentialBackoff } = originalRequest.retryConfig;
      
      // 初始化重试计数
      if (originalRequest._retryCount === undefined) {
        originalRequest._retryCount = 0;
      }
      
      // 检查是否应该重试
      if (originalRequest._retryCount < retries) {
        originalRequest._retryCount++;
        
        // 计算延迟时间
        const retryDelay = exponentialBackoff 
          ? delay * Math.pow(2, originalRequest._retryCount - 1) 
          : delay;
        
        // 等待指定时间后重试
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // 重试请求
        return request(originalRequest);
      }
    }
    
    // 对响应错误做点什么
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          // 可以添加登出逻辑
          break;
        case 403:
          // 拒绝访问
          console.error('拒绝访问');
          break;
        case 404:
          // 请求地址不存在
          console.error('请求地址不存在');
          break;
        case 500:
          // 服务器内部错误
          console.error('服务器内部错误');
          break;
        default:
          console.error('未知错误');
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误');
    } else {
      // 其他错误
      console.error('错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// 封装常用的请求方法，支持重试配置
// 注意：TypeScript不允许我们在标准的AxiosRequestConfig中添加自定义属性，
// 所以我们需要使用any类型来绕过类型检查
export const requestService = {
  get<T = any>(url: string, config?: AxiosRequestConfig & { retryConfig?: RetryConfig }): Promise<T> {
    return request.get(url, config);
  },
  
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig & { retryConfig?: RetryConfig }): Promise<T> {
    return request.post(url, data, config);
  },
  
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig & { retryConfig?: RetryConfig }): Promise<T> {
    return request.put(url, data, config);
  },
  
  delete<T = any>(url: string, config?: AxiosRequestConfig & { retryConfig?: RetryConfig }): Promise<T> {
    return request.delete(url, config);
  },
  
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig & { retryConfig?: RetryConfig }): Promise<T> {
    return request.patch(url, data, config);
  },
};

// 默认导出axios实例
export default request;