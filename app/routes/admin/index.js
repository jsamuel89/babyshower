import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import groupBy from 'ember-group-by';


export default Route.extend({

  model() {

    var thisObj = this;

    this.gifts = Ember.Object.extend({
      all: Ember.computed(function () {
          return thisObj.store.peekAll('gift');
        })
        ,
      qview: Ember.computed('all', function () {
          return this.get('all');
        })
        ,
      giftsByGroups: groupBy('qview', 'type')

    }).create();

    return this.store.findAll('gift').then((gifts) => {

      return Ember.RSVP.hash({
        
        gifts: this.gifts.get('all'),
        qi: this.gifts,
        newgift: this.store.createRecord('gift')
        ,isValidated : true
        
      })
    })

  }
	, setupController: function(controller,model) {
    this._super(controller, model);
    
  }
  ,actions: {
    addnewgift(newgift) {
      // var self = this;
      newgift.save().then(() => {
        this.controller.set('model.newgift', this.store.createRecord('gift'))
        // self.set('newgift','');
      })

    }
    
    , authenticate (username,password) {
      var modelObject = this.modelFor(this.routeName);
      if(username === '1' && password === '1') { 
        Ember.set(modelObject, "isValidated", true);
        Materialize.toast('Login success', 4000 , 'green rounded') // 4000 is the duration of the toast

      } else {
        Materialize.toast('Invalid credentials', 4000 , 'red rounded') // 4000 is the duration of the toast
      }
    }
  }
});
