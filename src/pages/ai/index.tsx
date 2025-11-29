import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { requestService } from "@/utils/request";

// 定义AI相关的数据类型
interface AIModel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function AIPage() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 示例：获取AI模型列表
  const fetchAIModels = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 这里只是一个示例，实际API端点需要根据你的后端来定
      // const response = await requestService.get<AIModel[]>('/api/ai/models');
      // setModels(response.data);
      
      // 模拟数据
      const mockData: AIModel[] = [
        {
          id: "1",
          name: "GPT-4",
          description: "OpenAI最新的语言模型",
          createdAt: "2023-03-14"
        },
        {
          id: "2",
          name: "Claude 2",
          description: "Anthropic的对话AI助手",
          createdAt: "2023-07-11"
        }
      ];
      setModels(mockData);
    } catch (err) {
      setError("获取AI模型失败");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAIModels();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>AI</h1>
        <p className="mt-4 text-default-600">
          Welcome to the AI section. Here you can explore AI-related content and projects.
        </p>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">AI Models</h2>
          
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map((model) => (
                <div 
                  key={model.id} 
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-lg">{model.name}</h3>
                  <p className="text-default-600 text-sm mt-1">{model.description}</p>
                  <p className="text-default-500 text-xs mt-2">Created: {model.createdAt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}