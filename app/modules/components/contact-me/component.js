import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from './../../../config/environment';

export default Ember.Component.extend(EmberValidations, {

  messageSentSuccess: true,

  messageSentFailure: true,

  showErrors: false,

  validations: {
    'name': {presence: {message: 'Name must not be blank'}},
    'email': {presence: {message: 'Email address must not be blank'}},
    'message': {presence: {message: 'Message must not be blank'}},
    'captcha': {presence: {message: 'Captcha text must not be blank'}}
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
        resolve();
      }).error(()=> {
        reject();
      });
    });

  },

  _sendEmail(){
    this.attrs.sendEmail(this.get('name'), this.get('email'), this.get('message')).then(()=> {
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
      this.clearValidationErrors();
      this.validate().then(()=> {
        this.verifyCaptcha(this.get('captcha')).then(()=> {
          this._sendEmail();
        }).catch(()=> {
          this.notifyPropertyChange('resetCaptcha');
          this.set('errors.captcha', ["Captcha didn't match please try again"]);
        });
      }).catch(()=> {
        console.log(this.get('isValid'));
      });
    }

  }


});
