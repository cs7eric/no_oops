// 重试功能使用示例
import { requestService } from './request';

// 示例1: 基本GET请求（使用默认重试配置）
export const fetchUserData = async (userId: string) => {
  try {
    const response = await requestService.get(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
};

// 示例2: 自定义重试配置的POST请求
export const createUserWithRetry = async (userData: any) => {
  try {
    const response = await requestService.post('/users', userData, {
      retryConfig: {
        retries: 5,           // 重试5次
        delay: 2000,          // 每次重试间隔2秒
        exponentialBackoff: true // 指数退避
      }
    } as any); // 使用any类型绕过TypeScript检查
    return response;
  } catch (error) {
    console.error('创建用户失败:', error);
    throw error;
  }
};

// 示例3: 禁用重试的请求
export const fetchPublicData = async () => {
  try {
    const response = await requestService.get('/public/data', {
      retryConfig: {
        retries: 0,  // 不重试
        delay: 0
      }
    } as any); // 使用any类型绕过TypeScript检查
    return response;
  } catch (error) {
    console.error('获取公共数据失败:', error);
    throw error;
  }
};

// 示例4: 模拟一个可能失败的请求来测试重试功能
export const simulateUnstableRequest = async () => {
  try {
    // 这个端点可能会随机失败，用于测试重试机制
    const response = await requestService.get('/unstable-endpoint', {
      retryConfig: {
        retries: 3,
        delay: 1000,
        exponentialBackoff: false
      }
    } as any); // 使用any类型绕过TypeScript检查
    return response;
  } catch (error) {
    console.error('不稳定请求失败:', error);
    throw error;
  }
};

export default {
  fetchUserData,
  createUserWithRetry,
  fetchPublicData,
  simulateUnstableRequest
};