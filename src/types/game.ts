// 游戏状态接口
export interface GameState {
  cookies: number;
  cookiesPerClick: number;
  cookiesPerSecond: number;
  theme: Theme;
  upgrades: Upgrade[];
}

// 升级项接口
export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'click' | 'auto' | 'theme';
  multiplier: number;
  purchased: boolean;
  unlocked: boolean;
}

// 主题接口
export interface Theme {
  id: string;
  name: string;
  backgroundColor: string;
  cookieImage: string;
  buttonColor: string;
  textColor: string;
}

// 初始游戏状态
export const initialGameState: GameState = {
  cookies: 0,
  cookiesPerClick: 1,
  cookiesPerSecond: 0,
  theme: {
    id: 'default',
    name: '默认主题',
    backgroundColor: '#242424',
    cookieImage: '🍪',
    buttonColor: '#1a1a1a',
    textColor: 'rgba(255, 255, 255, 0.87)'
  },
  upgrades: [
    {
      id: 'click1',
      name: '点击升级 I',
      description: '双倍点击产量',
      cost: 10,
      type: 'click',
      multiplier: 2,
      purchased: false,
      unlocked: true
    },
    {
      id: 'auto1',
      name: '自动生产 I',
      description: '每秒自动生产1个饼干',
      cost: 50,
      type: 'auto',
      multiplier: 1,
      purchased: false,
      unlocked: true
    },
    {
      id: 'theme1',
      name: '暗黑主题',
      description: '切换到暗黑风格',
      cost: 100,
      type: 'theme',
      multiplier: 0,
      purchased: false,
      unlocked: true
    }
  ]
};