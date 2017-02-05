import Ember from 'ember';
import config from 'moose/config/environment';

export default function validateCaptcha() {
  return (key, newValue, oldValue, changes, content) => {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (newValue) {
        Ember.$.ajax({
          url: `${config.APP.API_URL}/captcha/verify?text=${newValue}`,
          xhrFields: {
            withCredentials: true
          }
        }).done(()=> {
          resolve(true);
        }).fail(()=> {
          reject("Captcha didn't match please try again");
        });
      } else {
        reject("Captcha didn't match please try again");
      }
    });
  };
}
