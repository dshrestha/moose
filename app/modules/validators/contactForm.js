import {validatePresence} from 'ember-changeset-validations/validators';
import validateCaptcha from './captcha';

export default {
  'name': validatePresence({presence: true, message: 'Name must not be blank'}),
  'email': validatePresence({presence: true, message: 'Email address must not be blank'}),
  'message': validatePresence({presence: true, message: 'Message must not be blank'}),
  'captcha': [
    validatePresence({presence: true, message: 'Captcha text must not be blank'})
  ]
};
