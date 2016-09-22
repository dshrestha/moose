import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["sticky-container"],

  elementOffsetTop: 0,

  stickToTop: false,

  initialize(){
    this.set('elementOffsetTop', Ember.$(this.get('element')).offset().top);
    Ember.$(this.get('element')).width(Ember.$(this.get('element')).parent().width());
  },

  didInsertElement(){
    this.initialize();
    Ember.$(window).on('scroll', this.orientPosition.bind(this));
    Ember.$(window).on('resize', this.initialize.bind(this));
  },

  willDestroyElement(){
    this.initialize();
    Ember.$(window).off('scroll', this.orientPosition);
    Ember.$(window).off('resize', this.initialize);
  },

  orientPosition(){
    let stickAfterScrollHeight = this.get('elementOffsetTop') - Ember.$(window).scrollTop();
    this.set('stickToTop', (stickAfterScrollHeight < 0));
  }
});
