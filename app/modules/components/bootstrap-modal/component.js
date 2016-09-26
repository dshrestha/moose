import Ember from 'ember';

/**
 * Ember component that wraps the bootstrap modal component.
 *
 * @type {Ember.Component}
 * */
export default Ember.Component.extend({

  classNameBindings: [':modal', 'animate:fade'],

  animate: true,

  /**
   * Gets all the modal initialization options
   *
   * @method 'getInitializationOptions'
   * @return {Object}
   * */
  getInitializationOptions(){
    let options = {};
    options.backdrop = this.get('option-backdrop') || true;
    options.keyboard = this.get('option-keyboard') || true;
    return options;
  },

  /**
   * Sets up all the supported modal events. For each modal event bootstrap exposes,
   * there is a corresponding action hook that you can pass to the component.
   *
   * @method 'setupModalEvents'
   * @return {Void}
   * */
  setupModalEvents(){
    let modalElement = Ember.$(this.get('element'));
    if (this.get('onModalShow')) {
      modalElement.on("show.bs.modal", ()=> {
        this.sendAction("onModalShow");
      });
    }
    if (this.get('onModalShown')) {
      modalElement.on("shown.bs.modal", ()=> {
        this.sendAction("onModalShown");
      });
    }
    if (this.get('onModalHide')) {
      modalElement.on("hide.bs.modal", ()=> {
        this.sendAction("onModalHide");
      });
    }
    if (this.get('onModalHidden')) {
      modalElement.on("hidden.bs.modal", ()=> {
        this.sendAction("onModalHidden");
      });
    }
  },

  /**
   * Detaches all the supported modal events from the modal component.
   *
   * @method 'detachModalEvents'
   * @return {Void}
   * */
  detachModalEvents(){
    let modalElement = Ember.$(this.get('element'));
    modalElement.off("show.bs.modal");
    modalElement.off("shown.bs.modal");
    modalElement.off("hide.bs.modal");
    modalElement.off("hidden.bs.modal");
  },

  /**
   * Event that is triggered when component successfully renders its backing HTML element into the DOM
   *
   * @event 'didInsertElement'
   * @return {Void}
   * */
  didInsertElement(){
    let modalElement = Ember.$(this.get('element'));
    modalElement.modal(this.getInitializationOptions());

    this.setupModalEvents();

    if (this.get("position") === "center") {
      let windowHeight = Ember.$(window).height();
      let contentHeight = modalElement.find(".modal-body").height();
      modalElement.find(".modal-content").css({top: ((windowHeight + contentHeight) / 2)});
    }
  },

  /**
   * Event that is triggered when tearing down component
   *
   * @event 'willDestroyElement'
   * @return {Void}
   * */
  willDestroyElement(){
    Ember.$(this.get('element')).modal('hide');
    this.detachModalEvents();
  }

});
