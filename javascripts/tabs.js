'use strict';

import $ from 'jquery';

class Tabs {

  constructor(element) {
    this.cacheEls(element);
    this.bindEvents();

    let hash = window.location.hash.substring(1);

    if (hash) {
      this.toggleTab(this.tabs.filter(`#tab-${hash}`));
    } else {
      this.toggleTab(this.tabs.filter('.is-selected'));
    }
  }

  cacheEls(element) {
    this.element = $(element);
    this.tabs = this.element.find('.tabs-nav a');
    this.panels = this.element.find('.tabs-panel');
    this.errors = this.element.find('.tabs-errors');
  }

  bindEvents() {
    this.tabs.on('click', this.clickTab);
  }

  clickTab = (event) => {
    event.preventDefault();
    this.toggleTab($(event.target));
  };

  toggleTab(tab) {
    tab.parents('.tabs-nav')
      .find('a')
      .removeClass('is-selected');

    tab
      .addClass('is-selected');

    this.panels.hide();
    this.errors.hide();

    if (tab.length < 1) {
      return;
    }

    let activePanelId = tab.attr('href').split('#')[1];
    $('#' + activePanelId).addClass('is-selected').show();
    $('#tab-error-' + activePanelId.substr(12)).addClass('is-selected').show();
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

export default Tabs;
