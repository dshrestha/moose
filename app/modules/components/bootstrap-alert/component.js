import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * Property taht toggles the fade effect when closing the alert.
   *
   * @property 'animate'
   * @type {Boolean}
   * @default true
   * */
  animate: true,

  /**
   * Type of alert message.
   *
   * @property 'type'
   * @type {String}
   * @default null
   * */
  type: null,

  /**
   * Class associated with the type of message.
   *
   * @property 'alertClass'
   * @type {String}
   * @default 'alert-info'
   * */
  alertClass: Ember.computed('type', function () {
    let defaultMessageType = 'info';
    let messageType = this.get('type') ? Ember.$.trim(this.get('type').toLowerCase()) : defaultMessageType;
    if (['success', 'info', 'warning', 'danger'].indexOf(messageType) === -1) {
      messageType = defaultMessageType;
    }
    return `alert-${messageType}`;
  }),

  classNameBindings: [':alert', 'alertClass', 'animate:fade', 'animate:in'],

  /**
   * This method is triggered immediately when close method is invked on the alert component.
   *
   * @method 'onAlertClose'
   * @return {Void}
   * */
  onAlertClose(){
    if (this.attrs.onAlertClose) {
      this.attrs.onAlertClose();
    }
  },

  /**
   * This method is triggered after the close animation has completed.
   *
   * @method 'onAlertClosed'
   * @return {Void}
   * */
  onAlertClosed(){
    if (this.attrs.onAlertClosed) {
      this.attrs.onAlertClosed();
    }
  },

  /**
   * Event that is fired when component is inserted to DOM.
   *
   * @method 'didInsertElement'
   * @return {Void}
   * */
  didInsertElement(){
    this._super(...arguments);
    let alert = Ember.$(this.get('element'));

    alert.alert();
    alert.on('closed.bs.alert', this.onAlertClosed.bind(this));
    alert.on('close.bs.alert', this.onAlertClose.bind(this));
  },

  /**
   * Event that is fired when component is scheduled to be removed from DOM.
   *
   * @method 'willDestroyElement'
   * @return {Void}
   * */
  willDestroyElement(){
    this._super(...arguments);
    let alert = Ember.$(this.get('element'));

    alert.off('closed.bs.alert', this.onAlertClosed);
    alert.off('close.bs.alert', this.onAlertClose);
    alert.alert('close');
  }

});
