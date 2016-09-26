import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ["sticky-container"],

  elementOffsetTop: 0,

  stickToTop: false,

  initialize(){
    let componentDOM = Ember.$(this.get('element'));
    this.set('elementOffsetTop', componentDOM.offset().top);

    /**
     * placeholder div that will take the height that the original sticky div will take so that we don't get the jarring
     * effect when sticky bar becomes sticky
     * */
    componentDOM.find('.sticky-placeholder').css('height', componentDOM.height());
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
