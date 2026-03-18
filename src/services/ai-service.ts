// AI Service Interface - Contract for future AI integration

export interface ChatResponse {
  message: string;
  timestamp: Date;
  sources?: string[];
}

export interface SuggestionResult {
  title: string;
  url: string;
  relevance: number;
}

export interface AIService {
  chat(message: string, context?: Record<string, unknown>): Promise<ChatResponse>;
  summarize(text: string, maxLength?: number): Promise<string>;
  suggest(query: string, limit?: number): Promise<SuggestionResult[]>;
  explainCode(code: string, language: string): Promise<string>;
  isAvailable(): Promise<boolean>;
}

export class MockAIService implements AIService {
  async chat(_message: string): Promise<ChatResponse> {
    return {
      message: "AI chat is not yet implemented.",
      timestamp: new Date(),
    };
  }
  
  async summarize(text: string): Promise<string> {
    const words = text.split(/\s+/).length;
    return `Placeholder summary. Original text has ~${words} words.`;
  }
  
  async suggest(): Promise<SuggestionResult[]> {
    return [];
  }
  
  async explainCode(): Promise<string> {
    return "Code explanation not yet available.";
  }
  
  async isAvailable(): Promise<boolean> {
    return false;
  }
}

export function createAIService(): AIService {
  return new MockAIService();
}

export const AI_FEATURE_ENABLED = false;
export type AIProvider = 'openai' | 'anthropic' | 'cloudflare' | 'mock';

export interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
  maxTokens?: number;
}

export const defaultAIConfig: AIConfig = {
  provider: 'mock',
  model: 'gpt-4',
  maxTokens: 1000,
};
