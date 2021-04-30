// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('.menu__link[href*="#"]')),
  animationTime = 3000,
  framesCount = 20;

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (e) {
    // убираем стандартное поведение
    e.preventDefault();

    document.querySelector('.menu').classList.remove('js__block');
    document.querySelector('[data-js="toggleMenu"]').classList.remove('i_close');
    let headerHeight = document.querySelector('.header').offsetHeight;
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY =
      document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - headerHeight;

    // ! проверить значок и немного отодвинуть

    if (document.querySelector(item.getAttribute('href')).classList.contains('section_dark')) {
      coordY = coordY - 30;
    }

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (
        scrollBy > window.pageYOffset - headerHeight - coordY &&
        window.innerHeight + window.pageYOffset - headerHeight < document.body.offsetHeight
      ) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        // window.scrollBy(0, scrollBy);
        window.scrollBy({
          top: scrollBy,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo({
          top: coordY,
          left: 0,
          behavior: 'smooth',
        });

        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
