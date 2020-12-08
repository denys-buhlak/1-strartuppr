document.querySelector('.banner__link').addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({
    top: document.querySelector('.banner').offsetHeight,
    behavior: 'smooth',
  });
});
