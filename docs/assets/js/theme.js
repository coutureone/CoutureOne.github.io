(function() {
  // 主题切换器
  class ThemeToggle {
    constructor() {
      this.root = document.documentElement;
      this.init();
    }

    init() {
      // 初始化主题
      const savedTheme = localStorage.getItem('theme') || 'light';
      this.applyTheme(savedTheme);

      // 绑定点击事件
      const themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', () => this.toggle());
      }
    }

    applyTheme(theme) {
      // 设置主题
      this.root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      // 强制更新样式
      document.body.style.setProperty('background-color', theme === 'dark' ? '#1a1a1a' : '#ffffff', 'important');
      document.body.style.setProperty('color', theme === 'dark' ? '#e0e0e0' : '#24292f', 'important');

      // 更新所有链接颜色
      const links = document.getElementsByTagName('a');
      const linkColor = theme === 'dark' ? '#6ea8fe' : '#0969da';
      for (let link of links) {
        link.style.setProperty('color', linkColor, 'important');
      }

      // 更新代码块背景
      const codeBlocks = document.getElementsByTagName('pre');
      const codeBg = theme === 'dark' ? '#2d2d2d' : '#f6f8fa';
      for (let block of codeBlocks) {
        block.style.setProperty('background-color', codeBg, 'important');
      }

      // 更新加载器背景
      const loader = document.getElementById('loader');
      if (loader) {
        loader.style.setProperty('background-color', 
          theme === 'dark' ? 'rgba(26, 26, 26, .95)' : 'rgba(255, 255, 255, .95)', 
          'important'
        );
      }
    }

    toggle() {
      const currentTheme = this.root.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      this.applyTheme(newTheme);
    }
  }

  // 在页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
  } else {
    new ThemeToggle();
  }
})(); 