import Ember from 'ember';

export default Ember.Component.extend({

  header: {head: true},

  body: {body: true},

  toggleOnHover: false,

  collapsed: true,

  openBody () {
    var componentDOM = Ember.$(this.get('element'));
    componentDOM.find('.body').slideDown();
  },

  closeBody () {
    var componentDOM = Ember.$(this.get('element'));
    componentDOM.find('.body').slideUp();
  },

  toggleBody () {
    this.toggleProperty('collapsed');
    if (this.get('collapsed')) {
      this.closeBody();
    } else {
      this.openBody();
    }
  },

  didInsertElement () {
    var componentDOM = Ember.$(this.get('element')),
      collapser = componentDOM.find('.head');

    if (this.get('toggleOnHover')) {
      collapser.on('mouseenter', this.openBody.bind(this));
      componentDOM.on('mouseleave', this.closeBody.bind(this));
    } else {
      collapser.on('click', this.toggleBody.bind(this));
    }
  },

  willDestroyElement(){
    var componentDOM = Ember.$(this.get('element')),
      collapser = componentDOM.find('.head');

    if (this.get('toggleOnHover')) {
      collapser.off('mouseenter', this.openBody.bind(this));
      componentDOM.off('mouseleave', this.closeBody.bind(this));
    } else {
      collapser.off('click', this.toggleBody.bind(this));
    }
  }

});
