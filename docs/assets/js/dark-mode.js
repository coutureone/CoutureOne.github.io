function initThemeToggle() {
  // 创建主题切换按钮并插入到 #bar 元素后面
  const bar = document.getElementById('bar');
  const themeSwitch = document.createElement('div');
  themeSwitch.className = 'theme-switch';
  themeSwitch.innerHTML = '<button id="theme-toggle" aria-label="切换主题"><span>切换主题</span></button>';
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
    }
  });
  
  // 切换主题
  themeToggle.addEventListener('click', function() {
    console.log('Theme toggle clicked'); // 添加调试日志
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// 确保在 DOM 完全加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
  initThemeToggle();
} 