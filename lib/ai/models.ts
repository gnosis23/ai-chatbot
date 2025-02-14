import { openai, createOpenAI } from '@ai-sdk/openai';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const openRouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': openRouter('deepseek/deepseek-chat'),
    'chat-model-large': openRouter('deepseek/deepseek-chat'),
    'chat-model-reasoning': wrapLanguageModel({
      model: openRouter('deepseek/deepseek-r1:free'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': openRouter('deepseek/deepseek-chat'),
    'artifact-model': openRouter('deepseek/deepseek-chat'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];
