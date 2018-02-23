import DS from 'ember-data';
import { camelize } from '@ember/string';

export default DS.JSONAPIAdapter.extend({
    host: 'http://localhost:3000',
    namespace: 'api',
    // change default naming scheme from dasherize to camelize
    pathForType(type) {
      var camelized = camelize(type);
      return Ember.String.pluralize(camelized);
    }
});
