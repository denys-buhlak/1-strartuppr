showSearch();
showMenu();

function showSearch() {
  let _navbar = document.querySelector('.navbar'),
    _btnShow = _navbar.querySelector("[data-js='toggleSearch']"),
    _searchForm = _navbar.querySelector('.navbar__form'),
    _btnClose = _searchForm.querySelector('.i_close');

  _btnShow.addEventListener('click', (event) => {
    event.preventDefault();
    _searchForm.style = 'transform:scale(1)';
  });

  _btnClose.addEventListener('click', (event) => {
    event.preventDefault();
    _searchForm.style = 'transform:scale(0)';
  });
}

function showMenu() {
  let _navbar = document.querySelector('.navbar'),
    _btnMenu = _navbar.querySelector('[data-js="toggleMenu"]'),
    _menu = _navbar.querySelector('.menu');

  _btnMenu.addEventListener('click', (event) => {
    event.preventDefault();

    _menu.classList.toggle('js__block');
    _menu.classList.toggle('js__menu_show');
    _btnMenu.classList.toggle('i_close');
  });
}
