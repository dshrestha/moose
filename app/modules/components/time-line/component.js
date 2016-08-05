import Ember from 'ember';

export default Ember.Component.extend({

  timeLineInstance: null,

  data: null,

  containerHeight: '600px',

  containerWidth: '100%',

  options: {
    start_at_end: true,
    default_bg_color: {r: 0, g: 0, b: 0},
    timenav_height_percentage: 50,
    ga_property_id: "UA-27829802-4"
  },

  resizeTimeline(e) {
    var context = e.data.scope;
    context.get('timeLineInstance').updateDisplay();
  },

  setupContainerWidthHeight() {
    Ember.$(this.get('element')).css({'width': this.get('containerWidth'), 'height': this.get('containerHeight')});
  },

  didInsertElement() {
    var data = this.get('data'),
      options = this.get('options');

    this.setupContainerWidthHeight();
    this.set('timeLineInstance', new TL.Timeline(this.get('elementId'), data, options));
    Ember.$(window).on('resize', {scope: this}, this.resizeTimeline);
  },

  willDestroyElement() {
    delete this.get('timeLineInstance');
    Ember.$(window).off('resize', this.resizeTimeline);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('timeLineFocusId')) {
      this.send('goToId', this.get('timeLineFocusId'));
    }
  },

  actions: {

    goToId(id){
      this.get('timeLineInstance').goToId(id);
    }

  }

});
