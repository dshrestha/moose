import Ember from 'ember';
import config from './../../config/environment';

export default Ember.Route.extend({

  actions: {

    /**
     * Makes api call which in turns sends an email.
     *
     * @method 'sendEmail'
     * @param {String} name
     * @param {String} email address of the sender
     * @param {String} message
     * @return {Ember.RSVP.Promise}
     * */
    sendEmail(name, email, message){
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
    }
  }

});
