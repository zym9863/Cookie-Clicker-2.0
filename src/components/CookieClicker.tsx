import { useState, useEffect } from 'react';
import { GameState, initialGameState } from '../types/game';

export function CookieClicker() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('cookieClickerState');
    return savedState ? JSON.parse(savedState) : initialGameState;
  });

  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [cracks, setCracks] = useState(0);
  const [achievement, setAchievement] = useState<string | null>(null);

  // 保存游戏状态到localStorage
  useEffect(() => {
    localStorage.setItem('cookieClickerState', JSON.stringify(gameState));
  }, [gameState]);

  // 自动生产系统
  useEffect(() => {
    const timer = setInterval(() => {
      if (gameState.cookiesPerSecond > 0) {
        setGameState(prev => ({
          ...prev,
          cookies: prev.cookies + prev.cookiesPerSecond
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.cookiesPerSecond]);

  // 显示成就通知
  const showAchievement = (name: string) => {
    setAchievement(name);
    setTimeout(() => setAchievement(null), 3000);
  };

  // 点击生产饼干
  const handleCookieClick = () => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    // 更新连击数
    if (timeDiff < 500) {
      setCombo(prev => prev + 1);
      if (combo === 4) showAchievement('5连击！量子化特效已激活');
      if (combo === 9) showAchievement('10连击！代码雨特效已激活');
      if (combo === 19) showAchievement('20连击！次元撕裂已触发');
    } else {
      setCombo(0);
    }
    
    setLastClickTime(now);

    // 更新裂痕
    if (gameState.cookies >= 100000 && Math.floor(gameState.cookies / 100000) > cracks) {
      setCracks(Math.floor(gameState.cookies / 100000));
      showAchievement('新的裂痕出现了！');
    }

    setGameState(prev => ({
      ...prev,
      cookies: prev.cookies + prev.cookiesPerClick
    }));
  };

  // 购买升级
  const handleUpgrade = (upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || upgrade.purchased || prev.cookies < upgrade.cost) {
        return prev;
      }

      const newState = { ...prev };
      newState.cookies -= upgrade.cost;
      
      // 更新升级状态
      newState.upgrades = prev.upgrades.map(u =>
        u.id === upgradeId ? { ...u, purchased: true } : u
      );

      // 应用升级效果
      switch (upgrade.type) {
        case 'click':
          newState.cookiesPerClick *= upgrade.multiplier;
          break;
        case 'auto':
          newState.cookiesPerSecond += upgrade.multiplier;
          break;
        case 'theme':
          if (upgrade.id === 'theme1') {
            newState.theme = {
              ...newState.theme,
              backgroundColor: '#000000',
              textColor: '#FFFFFF',
              buttonColor: '#333333'
            };
          }
          break;
      }

      return newState;
    });
  };

  // 获取饼干按钮的类名
  const getCookieButtonClass = () => {
    let className = 'cookie-button';
    if (combo >= 5) className += ' quantum-effect';
    if (combo >= 10) className += ' neon';
    if (combo >= 20) className += ' burn';
    return className;
  };

  // 重置游戏状态
  const handleReset = () => {
    setGameState(initialGameState);
    setCombo(0);
    setCracks(0);
    localStorage.removeItem('cookieClickerState');
    showAchievement('游戏已重置！');
  };

  return (
    <div style={{
      backgroundColor: gameState.theme.backgroundColor,
      color: gameState.theme.textColor,
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <img src="/src/assets/game_logo.png" alt="Game Logo" style={{ width: '300px', marginBottom: '20px' }} />
      <h1>Cookie Clicker 2.0</h1>

      <div className="stats" style={{ marginBottom: '20px' }}>
        <p>饼干数量: {Math.floor(gameState.cookies)}</p>
        <p>点击产量: {gameState.cookiesPerClick}/次</p>
        <p>自动产量: {gameState.cookiesPerSecond}/秒</p>
      </div>

      <div className="cookie-container">
        <button
          className={getCookieButtonClass()}
          onClick={handleCookieClick}
          style={{
            fontSize: '48px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '20px',
            position: 'relative'
          }}
        >
          <img src="/src/assets/cookie_icon.png" alt="Cookie" style={{ width: '200px', height: '200px' }} />
          {Array.from({ length: cracks }).map((_, i) => (
            <div key={i} className="crack visible" style={{
              transform: `translate(-50%, -50%) rotate(${45 + i * 30}deg)`
            }} />
          ))}
        </button>
      </div>

      {combo > 0 && (
        <div className="combo-counter">
          连击 x{combo}
        </div>
      )}

      {achievement && (
        <div className="achievement">
          {achievement}
        </div>
      )}

      <div className="upgrades">
        <h2>升级商店</h2>
        {gameState.upgrades.map(upgrade => (
          <button
            key={upgrade.id}
            onClick={() => handleUpgrade(upgrade.id)}
            disabled={upgrade.purchased || gameState.cookies < upgrade.cost}
            style={{
              backgroundColor: gameState.theme.buttonColor,
              color: gameState.theme.textColor,
              margin: '5px',
              opacity: upgrade.purchased ? 0.5 : 1
            }}
          >
            <img src="/src/assets/upgrade_icon.png" alt="Upgrade" style={{ width: '30px', height: '30px', verticalAlign: 'middle', marginRight: '5px' }} />
            {upgrade.name} ({upgrade.cost} 饼干)
            <br />
            <small>{upgrade.description}</small>
          </button>
        ))}
        <button
          onClick={() => {
            if (window.confirm('确定要重置游戏吗？所有进度将丢失！')) {
              handleReset();
            }
          }}
          style={{
            backgroundColor: '#ff4444',
            color: '#ffffff',
            margin: '5px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff0000';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ff4444';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ⚠️ 重新开始 ⚠️
        </button>
      </div>
    </div>
  );
}
