const $ = require('jquery')
const ACTIVECLASS = 'autosuggest__suggestion--active';

class Autocomplete {

  constructor(element, options) {
    this.sourceField = $(element);
    this.options = options || this.sourceField.data('options');
    this.setupDisplayField();
    this.shown = false;
    this.$menu = $('<ul class="autosuggest__suggestions"></ul>');
    this.item = '<li class="autosuggest__suggestion"><a href="#"></a></li>';
    this.maxItems = 8;
    this.minLength = 1;
    this.listen();
    this.optionsUrl = this.sourceField.data('options-url');
    this.sourceField.parent().css({
      position: 'relative'
    });
    this.displayField.attr('autocomplete', this.sourceField.attr('name'));
  }

  setupDisplayField() {
    this.displayField = this.sourceField.clone();
    this.displayField.attr('id', this.sourceField.attr('id') + '-x').attr('name', '');
    this.displayField.insertAfter(this.sourceField);
    this.sourceField.hide();

    let value;

    // Display the value if the list if an object.
    if (this.options && !Array.isArray(this.options)) {
      value = this.options[this.sourceField.val()];
    } else {
      value = this.sourceField.val();
    }
    this.displayField.val(value);
  }

  select() {
    var val = this.$menu.find(`.${ACTIVECLASS}`).attr('data-value');
    var display = this.$menu.find(`.${ACTIVECLASS}`).text();
    this.sourceField.val(val).change();
    this.displayField.val(display).change();
    return this.hide();
  }

  show() {

    var pos = $.extend({}, this.displayField.position(), {
       height: this.displayField[0].offsetHeight
    });

    this.$menu
      .insertAfter(this.displayField)
      .css({
        top: pos.top + pos.height,
        left: pos.left
      })
      .show();

    this.shown = true;
    return this;
  }

  hide() {
    this.$menu.hide();
    this.shown = false;
    return this;
  }

  lookup() {
    const term = this.term = this.displayField.val();

    if (this.optionsUrl && this.optionsUrl.length > 0) {
      this.lookupAjax(term);
    } else {
      this.lookupLocal(term);
    }
  }

  lookupLocal(term) {
    if (!term || term.length < this.minLength) {
      return this.shown ? this.hide() : this;
    }

    if (Array.isArray(this.options)) {
      return this.lookupLocalArray(term);
    }

    return this.lookupLocalObject(term);
  }

  lookupLocalArray(term) {


    let matchingItems = this.options.filter((item) => {
      return item.toLowerCase().indexOf(term.toLowerCase()) !== -1;
    }).sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });

    if (matchingItems.length > 0) {
      this.render(matchingItems).show();
    } else {
      this.hide();
    }

    return null;
  }

  lookupLocalObject(term) {
    let matches = [];

    for (var key in this.options) {
      let item = this.options[key];
      if (item.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
        matches.push(key);
      }
    }

    matches.sort((a, b) => {
      return this.options[a].toLowerCase().localeCompare(this.options[b].toLowerCase());
    });

    if (matches.length > 0) {
      this.renderObject(matches).show();
    } else {
      this.hide();
    }

    return null;
  }

  lookupAjax(term) {
    const xmlhttp = new XMLHttpRequest();
    const handleAjaxResult = this.handleAjaxResult;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        const myArr = JSON.parse(xmlhttp.responseText);
        handleAjaxResult(myArr);
      }
    };

    xmlhttp.open('GET', `${this.optionsUrl}${term}`, true);
    xmlhttp.send();
  }

  handleAjaxResult = (result) => {
    if (result.length > 0) {
      result = result.sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()); });
      this.render(result).show();
    } else {
      this.hide();
    }
  };

  highlighter = (item) => {
    const term = this.term.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    return item.replace(new RegExp('(' + term + ')', 'ig'), ($1, match) => {
      return '<strong>' + match + '</strong>';
    });
  };

  render(items) {

    let itemMarkup = this.item;
    let highlighter = this.highlighter;

    let suggestionElements = items.slice(0, this.maxItems).map((item) => {
      let suggestionElement = $(itemMarkup).attr('data-value', item);
      suggestionElement.find('a').html(highlighter(item));
      return suggestionElement[0];
    });

    suggestionElements[0].className += ' ' + ACTIVECLASS;
    this.$menu.html(suggestionElements);
    return this;
  }

  renderObject(items) {
    let itemMarkup = this.item;
    let highlighter = this.highlighter;

    let suggestionElements = items.slice(0, this.maxItems).map((item) => {
      let value = this.options[item];
      let suggestionElement = $(itemMarkup).attr('data-value', item);
      suggestionElement.find('a').html(highlighter(value));
      return suggestionElement[0];
    });

    suggestionElements[0].className += ' ' + ACTIVECLASS;
    this.$menu.html(suggestionElements);
    return this;
  }

  next() {
    var active = this.$menu.find(`.${ACTIVECLASS}`).removeClass(ACTIVECLASS)
      , next = active.next();

    if (!next.length) {
      next = $(this.$menu.find('li')[0]);
    }

    next.addClass(ACTIVECLASS);
  }

  prev() {
    var active = this.$menu.find(`.${ACTIVECLASS}`).removeClass(ACTIVECLASS)
      , prev = active.prev();

    if (!prev.length) {
      prev = this.$menu.find('li').last();
    }

    prev.addClass(ACTIVECLASS);
  }

  listen() {
    this.displayField
      .on('focus', this.focus)
      .on('blur', this.blur)
      .on('keypress', this.keypress)
      .on('keyup', this.keyup);

    if (this.eventSupported('keydown')) {
      this.displayField.on('keydown', this.keydown);
    }

    this.$menu
      .on('click', this.click)
      .on('mouseenter', 'li', this.mouseenter)
      .on('mouseleave', 'li', this.mouseleave);
  }

  eventSupported(eventName) {
    var isSupported = eventName in this.displayField;
    if (!isSupported) {
      this.displayField.setAttribute(eventName, 'return;');
      isSupported = typeof this.displayField[eventName] === 'function';
    }
    return isSupported;
  }

  move = (event) => {
    if (!this.shown) return;

    switch (event.keyCode) {
      case 9: // tab
      case 13: // enter
      case 27: // escape
        event.preventDefault();
        break;

      case 38: // up arrow
        event.preventDefault();
        this.prev();
        break;

      case 40: // down arrow
        event.preventDefault();
        this.next();
        break;
    }

    event.stopPropagation();
  };

  keydown = (event) => {
    this.suppressKeyPressRepeat = ~$.inArray(event.keyCode, [40, 38, 9, 13, 27]);
    this.move(event);
  };

  keypress = (event) => {
    if (this.suppressKeyPressRepeat) return;
    this.move(event);
  };

  keyup = (event) => {
    switch (event.keyCode) {
      case 40: // down arrow
      case 38: // up arrow
      case 16: // shift
      case 17: // ctrl
      case 18: // alt
        break;

      case 9: // tab
      case 13: // enter
        if (!this.shown) return;
        this.select();
        break;

      case 27: // escape
        if (!this.shown) return;
        this.hide();
        break;

      default:
        this.lookup();
    }

    event.stopPropagation();
    event.preventDefault();
  };

  focus = () => {
    this.focused = true;
  };

  blur = () => {
    this.focused = false;
    if (!this.mousedover && this.shown) this.hide();
  };

  click = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.select();
    this.displayField.focus();
  };

  mouseenter = (event) => {
    this.mousedover = true;
    this.$menu.find(`.${ACTIVECLASS}`).removeClass(ACTIVECLASS);
    $(event.currentTarget).addClass(ACTIVECLASS);
  };

  mouseleave = () => {
    this.mousedover = false;
    if (!this.focused && this.shown) this.hide();
  };

}

module.exports = Autocomplete;
