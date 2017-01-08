const {addClass, removeClass} = require('../lib/elementstuff');

function addEventListenerList(list, event, fn) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener(event, fn, false);
  }
}

class Tabs {

  constructor(element) {
    this.cacheEls(element);
    this.bindEvents();

    let hash = window.location.hash.substring(1);
    let tabElement;

    if (hash) {
      tabElement = element.querySelector(`#tab-${hash}`);
    }

    if (!tabElement || tabElement.length === 0) {
      tabElement = element.querySelector('.is-selected');
    }

    this.toggleTab(tabElement);
  }

  cacheEls(element) {
    this.element = element;
    this.tabs = this.element.querySelectorAll('.tabs-nav a');
    this.panels = this.element.querySelectorAll('.tabs-panel');
    this.errors = this.element.querySelectorAll('.tabs-errors');
  }

  bindEvents() {
    addEventListenerList(this.tabs, 'click', this.clickTab);
  }

  clickTab = (event) => {
    event.preventDefault();
    this.toggleTab(event.target);
  };

  toggleTab(tab) {

    if (!tab || tab.length === 0) return;

    removeClass(this.tabs, 'is-selected');
    removeClass(this.errors, 'is-selected');
    addClass(tab, 'is-selected');
    addClass(this.panels, 'hidden');


    if (tab.length < 1) {
      return;
    }

    let activePanelId = tab.href.split('#')[1];

    const activePanel = document.querySelector('#' + activePanelId);
    addClass(activePanel, 'is-selected');
    removeClass(activePanel, 'hidden');

    const errorElement = document.querySelector('#tab-error-' + activePanelId.substr(12));
    if (errorElement) {
      addClass(errorElement, 'is-selected');
      removeClass(errorElement, 'hidden');
    }
    Tabs.updateUrl(activePanelId.substr(12));
  }

  static updateUrl(tab) {
    if (typeof window.history.pushState === 'function') {
      const fullUrl = window.location.href;
      let pos = fullUrl.indexOf('#');
      if (pos == -1) pos = fullUrl.length;
      const newUrl = fullUrl.substring(0, pos) + '#' + tab;
      window.history.pushState(null, null, newUrl);
    }
  }
}

module.exports = Tabs;
