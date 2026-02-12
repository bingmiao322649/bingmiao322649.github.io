document.addEventListener('keydown', function (e) {
  const el = document.querySelector('#hexo-blog-encrypt input[type="password"]');
  if (!el) return;
  if (e.key === 'Enter') {
    const btn = document.querySelector('#hexo-blog-encrypt button, #hexo-blog-encrypt input[type="submit"]');
    if (btn) btn.click();
  }
});
