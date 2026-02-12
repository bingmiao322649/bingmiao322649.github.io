document.addEventListener("DOMContentLoaded", function () {

  // 只在 collections 页面生效
  if (!location.pathname.startsWith('/collections')) return;

  const links = document.querySelectorAll('a');

  links.forEach(link => {

    // 如果是锚点链接（#xxx），跳过
    if (link.getAttribute('href')?.startsWith('#')) return;

    // 如果是外部链接
    if (link.hostname && link.hostname !== location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener');
    }

  });

});
