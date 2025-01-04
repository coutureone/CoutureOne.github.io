function initThemeToggle() {
  // 创建主题切换按钮并插入到 #bar 元素后面
  const bar = document.getElementById('bar');
  const themeSwitch = document.createElement('div');
  themeSwitch.className = 'theme-switch';
  themeSwitch.innerHTML = '<button id="theme-toggle" aria-label="切换主题">🌓</button>';
  bar.parentNode.insertBefore(themeSwitch, bar.nextSibling);

  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  
  // 检查系统主题偏好
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  // 初始化主题：优先使用保存的主题，如果没有则使用系统主题
  const savedTheme = localStorage.getItem('theme');
  const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
  root.setAttribute('data-theme', initialTheme);
  
  // 监听系统主题变化
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      updateLoaderBackground(newTheme);
    }
  });
  
  // 切换主题并更新一些特定元素的样式
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateLoaderBackground(newTheme);
  });
}

// 更新加载动画背景
function updateLoaderBackground(theme) {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.backgroundColor = theme === 'dark' 
      ? 'rgba(26, 26, 26, .95)' 
      : 'rgba(255, 255, 255, .95)';
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initThemeToggle); 