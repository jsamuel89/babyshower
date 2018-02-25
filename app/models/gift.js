import DS from 'ember-data';

export default DS.Model.extend({
    name : DS.attr('string')
    ,status : DS.attr('string',{defaultValue : 'queued'})
    ,type : DS.attr('string')
    ,blockedby : DS.attr()
    ,blockedbycontact : DS.attr()
    ,blockedon : DS.attr('date')
    ,createdon : DS.attr('date',{defaultValue : new Date()})
    ,createdby : DS.attr()

});
