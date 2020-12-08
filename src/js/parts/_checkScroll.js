/*  */
function checkScroll() {
  if (
    window.pageYOffset >
    document.querySelector('.banner').offsetHeight - document.querySelector('.header').offsetHeight
  ) {
    document.querySelector('.header').classList.add('js__sticky');
  } else {
    document.querySelector('.header').classList.remove('js__sticky');
  }

  /*  */
  if (window.pageYOffset >= document.querySelector('.banner').offsetHeight / 2) {
    document.querySelector('.indicator').classList.remove('js__hidden');
    document.querySelector('.indicator').classList.remove('js__none');
  } else {
    document.querySelector('.indicator').classList.add('js__hidden');
    document.querySelector('.indicator').classList.add('js__none');
  }
}

window.onscroll = () => {
  checkScroll();
};
