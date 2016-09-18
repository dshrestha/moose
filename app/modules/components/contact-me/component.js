import Ember from 'ember';
import EmberValidations from 'ember-validations';
import config from './../../../config/environment';

export default Ember.Component.extend(EmberValidations, {

  messageSentSuccess: false,

  messageSentFailure: false,

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
      }).error(()=> {
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
      alert("error in send email");
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
      this.clearValidationErrors();
      this.validate().then(()=> {
        this.verifyCaptcha(this.get('captcha')).then(()=> {
          this.sendEmail();
        }).catch(()=> {
          alert("error");
          this.notifyPropertyChange('resetCaptcha');
          this.set('errors.captcha', ["Captcha didn't match please try again"]);
        });
      });
    }

  }


});
