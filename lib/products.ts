export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  icon: string;
  gradient: string;
  features: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'chatgpt-pro',
    name: 'ChatGPT Plus',
    description: 'OpenAI GPT-4o with advanced reasoning',
    price: 20.00,
    period: '/month',
    icon: '🤖',
    gradient: 'from-emerald-400 to-teal-600',
    badge: 'Popular',
    features: [
      'GPT-4o access',
      'Unlimited messages',
      'Image generation (DALL·E)',
      'Advanced data analysis',
      'Custom GPTs',
    ],
  },
  {
    id: 'grok-pro',
    name: 'Grok Pro',
    description: 'xAI Grok with real-time X data access',
    price: 16.00,
    period: '/month',
    icon: '⚡',
    gradient: 'from-violet-500 to-purple-700',
    features: [
      'Grok-2 model access',
      'Real-time X/Twitter data',
      'Unfiltered responses',
      'Image understanding',
      'Voice mode',
    ],
  },
  {
    id: 'gemini-pro',
    name: 'Google Gemini Advanced',
    description: 'Google Gemini Ultra 1.5 with 1M context',
    price: 19.99,
    period: '/month',
    icon: '✨',
    gradient: 'from-blue-400 to-indigo-600',
    features: [
      'Gemini Ultra 1.5 model',
      '1 million token context',
      'Google Workspace integration',
      'Deep Research feature',
      'Priority access',
    ],
  },
  {
    id: 'capcut-pro',
    name: 'CapCut Pro',
    description: 'Professional video editing with AI tools',
    price: 9.99,
    period: '/month',
    icon: '🎬',
    gradient: 'from-pink-400 to-rose-600',
    features: [
      'AI video enhancement',
      'Auto captions & subtitles',
      'Background removal',
      'No watermark exports',
      '4K video export',
    ],
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    description: 'Design anything with AI-powered tools',
    price: 12.99,
    period: '/month',
    icon: '🎨',
    gradient: 'from-orange-400 to-amber-600',
    badge: 'Best Value',
    features: [
      '100+ million premium assets',
      'Magic Studio AI tools',
      'Brand Kit & templates',
      'Background remover',
      'Unlimited storage',
    ],
  },
  {
    id: 'youtube-premium',
    name: 'YouTube Premium',
    description: 'Ad-free YouTube with offline downloads',
    price: 13.99,
    period: '/month',
    icon: '▶️',
    gradient: 'from-red-500 to-rose-700',
    features: [
      'Ad-free videos',
      'Offline downloads',
      'Background play',
      'YouTube Music included',
      'Premium exclusive content',
    ],
  },
];
