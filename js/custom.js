(function () {
  function mountMobileSubmit() {
    const root = document.querySelector('#hexo-blog-encrypt');
    if (!root) return;

    const input = root.querySelector('input[type="password"]');
    if (!input || input.dataset.hbeFormWrapped) return;

    // 让手机键盘更像“提交”
    input.setAttribute('enterkeyhint', 'done');

    // 找到原本的“解密/确认”按钮（插件内部的）
    const realBtn = root.querySelector('button, input[type="submit"]');

    // 创建 form 包裹 input（不改变视觉）
    const form = document.createElement('form');
    form.autocomplete = 'off';
    form.style.margin = '0';
    form.style.padding = '0';

    // 把 input 换到 form 里
    const parent = input.parentNode;
    parent.insertBefore(form, input);
    form.appendChild(input);

    // label 如果紧跟着 input，也一起移进去避免布局乱
    const label = parent.querySelector('label[for="hbePass"]');
    if (label) form.appendChild(label);

    // 关键：捕获 submit
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (realBtn) realBtn.click();
    });

    input.dataset.hbeFormWrapped = '1';
  }

  document.addEventListener('DOMContentLoaded', mountMobileSubmit);
  document.addEventListener('pjax:complete', mountMobileSubmit);

  // 兜底：如果 DOM 后插入
  new MutationObserver(mountMobileSubmit).observe(document.body, { childList: true, subtree: true });
})();
