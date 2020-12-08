// ! someText
// todo someText
// * someText
// // someText
// someText

('use strict');
let multiItemSlider = (function () {
  function _isElementVisible(element) {
    let rect = element.getBoundingClientRect(),
      vWidth = window.innerWidth || Element.clientWidth,
      vHeight = window.innerHeight || Element.clientHeight,
      elemFromPoint = function (x, y) {
        return document.elementFromPoint(x, y);
      };

    if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) return false;
    return (
      element.contains(elemFromPoint(rect.left, rect.top)) ||
      element.contains(elemFromPoint(rect.right, rect.top)) ||
      element.contains(elemFromPoint(rect.right, rect.bottom)) ||
      element.contains(elemFromPoint(rect.left, rect.bottom))
    );
  }

  return function (selector, config) {
    let _mainElement = document.querySelector(selector),
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper'),
      _sliderItems = _mainElement.querySelectorAll('.slider__item'),
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
      _html = _mainElement.innerHTML,
      _positionLeftItem = 0,
      _transform = 0,
      _step = (_itemWidth / _wrapperWidth) * 100,
      _items = [],
      _interval = 0,
      _states = [
        { active: false, minWidth: 0, count: 1 },
        { active: false, minWidth: 576, count: 2 },
        { active: false, minWidth: 992, count: 3 },
        { active: false, minWidth: 1200, count: 4 },
      ],
      _config = {
        isCycling: false,
        direction: 'next', //prev && next
        interval: 5000,
        pause: true,
      };

    for (let key in config) {
      if (key in _config) {
        _config[key] = config[key];
      }
    }
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    let _setActive = function () {
      let _index = 0;

      let width = parseFloat(document.body.clientWidth);

      _states.forEach(function (item, index) {
        _states[index].active = false;
        if (width >= _states[index].minWidth) _index = index;
      });
      _states[_index].active = true;
    };

    let _getActive = function () {
      let _index;

      _states.forEach(function (item, index) {
        if (_states[index].active) {
          _index = index;
        }
      });
      return _index;
    };

    let position = {
      getItemMin: function () {
        let indexItem = 0;

        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;

        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      },
    };

    let _transformItem = function (direction) {
      let nextItem;

      if (!_isElementVisible(_mainElement)) {
        return;
      }
      if (direction === 'next') {
        _positionLeftItem++;
        if (_positionLeftItem + _wrapperWidth / _itemWidth - 1 > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'prev') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
    };

    let _controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        let direction = e.target.classList.contains('slider__control_next') ? 'next' : 'prev';

        _transformItem(direction);
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    let _handleVisibilityChange = function () {
      if (document.visibilityState === 'hidden') {
        clearInterval(_interval);
      } else {
        clearInterval(_interval);
        _cycle(_config.direction);
      }
    };

    let _cycle = function (direction) {
      if (!_config.isCycling) {
        return;
      }
      // _interval = setInterval(function () {
      //   _transformItem(direction);
      // }, _config.interval);

      _interval = setInterval(
        function () {
          _transformItem(direction);
        },
        _config.interval > 1000 ? _config.interval : 1000
      );
    };

    let _refresh = function () {
      clearInterval(_interval);
      _mainElement.innerHTML = _html;
      _sliderWrapper = _mainElement.querySelector('.slider__wrapper');
      _sliderItems = _mainElement.querySelectorAll('.slider__item');
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
      _positionLeftItem = 0;
      _transform = 0;
      _step = (_itemWidth / _wrapperWidth) * 100;
      _items = [];
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });
    };

    let _setUpListeners = function () {
      _mainElement.addEventListener('click', _controlClick);
      if (_config.pause && _config.isCycling) {
        _mainElement.addEventListener('mouseenter', function () {
          clearInterval(_interval);
        });
        _mainElement.addEventListener('mouseleave', function () {
          clearInterval(_interval);
          _cycle(_config.direction);
        });
      }
      document.addEventListener('visibilitychange', _handleVisibilityChange, false);
      window.addEventListener('resize', function () {
        let _index = 0,
          width = parseFloat(document.body.clientWidth);

        _states.forEach(function (item, index) {
          if (width >= _states[index].minWidth) _index = index;
        });
        if (_index !== _getActive()) {
          _setActive();
          _refresh();
        }
      });
    };

    // инициализация
    _setUpListeners();
    if (document.visibilityState === 'visible') {
      _cycle(_config.direction);
    }
    _setActive();

    return {
      next: function () {
        _transformItem('next');
      },
      prev: function () {
        _transformItem('prev');
      },
      stop: function () {
        _config.isCycling = false;
        clearInterval(_interval);
      },
      cycle: function () {
        _config.isCycling = true;
        clearInterval(_interval);
      },
    };
  };
})();

multiItemSlider('.members', {
  // isCycling: true,
  // interval: 5000,
});

multiItemSlider('.quotes', {
  isCycling: true,
  interval: 3000,
  direction: 'prev', //prev && next
});

multiItemSlider('.sponsors', {
  // isCycling: true,
  // interval: 1000,
});
