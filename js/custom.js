(function () {
  function submitHBE(root) {
    const realBtn = root.querySelector('button, input[type="submit"]');
    if (realBtn) realBtn.click();
  }

  function mountHBE() {
    const root = document.querySelector('#hexo-blog-encrypt');
    if (!root) return;

    const input = root.querySelector('input[type="password"]');
    if (!input) return;

    // 让手机键盘更倾向显示“完成/前往”
    input.setAttribute('enterkeyhint', 'done');
    // 如果你密码是纯数字可开；否则删掉这行
    // input.setAttribute('inputmode', 'numeric');

    // 1) 用 form submit 捕获手机“完成/前往”
    if (!root.querySelector('#hbe-form')) {
      const form = document.createElement('form');
      form.id = 'hbe-form';
      form.autocomplete = 'off';

      // 用 form 包住 input（不改变视觉结构）
      const parent = input.parentNode;
      parent.insertBefore(form, input);
      form.appendChild(input);

      // label 如果紧跟 input，也一起移入，避免样式错位
      const label = parent.querySelector('label[for="hbePass"]');
      if (label) form.appendChild(label);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (input.value && input.value.trim().length > 0) submitHBE(root);
      });
    }

    // 2) 兜底：部分键盘“完成”只会触发失焦/变更
    if (!input.dataset.hbeMobileBound) {
      input.addEventListener('change', function () {
        if (input.value && input.value.trim().length > 0) submitHBE(root);
      });
      input.addEventListener('blur', function () {
        if (input.value && input.value.trim().length > 0) submitHBE(root);
      });

      // 少数机型会触发 keyup Enter（保留，不伤害）
      input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (input.value && input.value.trim().length > 0) submitHBE(root);
        }
      });

      input.dataset.hbeMobileBound = '1';
    }
  }

  function init() {
    mountHBE();
    // 加密块可能是后渲染/PJAX 切页后出现：监听 DOM 变化
    const obs = new MutationObserver(() => mountHBE());
    obs.observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('pjax:complete', mountHBE);
})();
