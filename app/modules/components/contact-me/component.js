import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import ContactFormValidations from 'moose/modules/validators/contactForm';
import config from './../../../config/environment';

export default Ember.Component.extend({

  messageSentSuccess: false,

  messageSentFailure: false,

  showErrors: false,

  formInputs: null,

  formInputsChangeSet: null,

  didInsertElement(){
    let formInputs = {'name': null, 'email': null, 'message': null, 'captcha': null};
    this.set('formInputs', formInputs);
    this.set('formInputsChangeSet', new Changeset(formInputs, lookupValidator(ContactFormValidations), ContactFormValidations));
  },

  captchaImageLink: Ember.computed('resetCaptcha', function () {
    let timeStamp = new Date().getTime();
    return `${config.APP.API_URL}/captcha?${timeStamp}`;
  }),

  verifyCaptcha(captchaText){
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: `${config.APP.API_URL}/captcha/verify?text=${captchaText}`,
        xhrFields: {
          withCredentials: true
        }
      }).done(()=> {
        resolve(true);
      }).fail((jqXHR, textStatus, errorThrown)=> {
        reject(jqXHR, textStatus, errorThrown);
      });
    });
  },

  /**
   * Makes api call which in turns sends an email.
   *
   * @method 'sendEmail'
   * @param {String} name
   * @param {String} email address of the sender
   * @param {String} message
   * @return {Ember.RSVP.Promise}
   * */
  sendEmailToMe(name, email, message){
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: `${config.APP.API_URL}/mailer`,
        method: 'POST',
        data: {
          'from': email,
          'to': 'quaint.stranger@gmail.com',
          'subject': `dshrestha.herokuapp.com : Message from ${name}`,
          'message': message
        },
        xhrFields: {
          withCredentials: true
        }
      }).done(()=> {
        resolve();
      }).fail(()=> {
        reject();
      });
    });
  },

  sendEmail(){
    this.sendEmailToMe(this.get('name'), this.get('email'), this.get('message')).then(()=> {
      this.setProperties({
        'messageSentSuccess': true,
        'messageSentFailure': false
      });
    }).catch(()=> {
      this.setProperties({
        'messageSentSuccess': false,
        'messageSentFailure': true
      });
    }).finally(()=> {
      this.setProperties({
        'name': '',
        'email': '',
        'message': '',
        'captcha': '',
        'showErrors': false
      });
      this.notifyPropertyChange('resetCaptcha');
    });
  },

  clearValidationErrors(){
    this.setProperties('errors.captcha', []);
  },

  actions: {

    submitFeedback(){
      this.set('showErrors', true);
      this.get('formInputsChangeSet').validate().then(()=> {
        if (this.get('formInputsChangeSet.isValid')) {
          this.verifyCaptcha(this.get('formInputsChangeSet.captcha')).then(()=> {
            this.sendEmail();
          }).catch(()=> {
            this.get('formInputsChangeSet').addError('captcha', {
              value: '',
              validation: "Captcha didn't match please try again"
            });
          }).finally(()=> {
            this.notifyPropertyChange('resetCaptcha');
          });
        }
      });
    }
  }


});
