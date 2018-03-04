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

        //   , queued : Ember.computed.filterBy('qview', 'queued', true) //.filterBy('yettoarrive',false) // .sort Timeorder.

        //   // This should be waiting.
        //   , arrived : Ember.computed.filterBy('queued', 'yettoarrive', false)


        //   , uniquedeptartments : Ember.computed.uniqBy('all','deptname')

        //   , deptartments : Ember.computed.map('uniquedeptartments',function(deptartment) {
        //       return {title : deptartment.get('deptname') }
        //   })

        //   , uniquedoctors : Ember.computed.uniqBy('qview','proname') 

        //   , doctors : Ember.computed.map('uniquedoctors',function(doctor) {
        //       return {title : doctor.get('proname') }
        //   })

        //   , selecteddepartments : []

        //   , filtereddepartments : Ember.computed('selecteddepartments.[]' , function() {

        //     console.log(this.get('qview'))
        //     if(this.get('selecteddepartments').length > 0) {
        //       return this.get('qview').filter( (element) => {            
        //         if((this.get('selecteddepartments').indexOf(element.get('deptname'))) > -1) {
        //           return element;
        //         }            
        //       })

        //     }
        //     else {
        //       return this.get('all')
        //     }

        //   })

        //   , selecteddoctors : []

        //   , filtereddoctors : Ember.computed('selecteddoctors.[]' , function() {
        //       console.log(this.get('qview'))        
        //       if(this.get('selecteddoctors').length > 0) {

        //         return this.get('qview').filter( (element) => {        
        //           if((this.get('selecteddoctors').indexOf(element.get('proname'))) > -1) {
        //             return element;
        //           }            
        //         })

        //       }
        //       else {
        //         return this.get('all')
        //       }

        //   })

        ,
      giftsByGroups: groupBy('qview', 'type')


      // , waiting : Ember.computed.filterBy('queueByDoctors','visitstatus','waiting')

      //   , calling : Ember.computed.filterBy('queueByDoctors','visitstatus','calling')

    }).create();


    // var visitStates = ['waiting', 'calling', 'serving', 'consumed'];
    // visitStates.forEach(function(element) {
    //   Ember.defineProperty(this, element, Ember.computed.filterBy('qview', 'visitstatus', element))
    // }, this.gifts);



    return this.store.findAll('gift').then((gifts) => {

      //   Ember.set(this.gifts, 'qviewfilter', 'all');

      return Ember.RSVP.hash({
        gifts: this.gifts.get('all'),
        qi: this.gifts,
        newgift : this.store.createRecord('gift')
      })
    })

  }
  , actions : {
    addnewgift(newgift) {
      // var self = this;
      newgift.save().then( () => {
        this.controller.set('model.newgift',this.store.createRecord('gift'))
        // self.set('newgift','');
      })
    
    }
  }
});
