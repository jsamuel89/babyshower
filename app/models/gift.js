import DS from 'ember-data';

export default DS.Model.extend({
    name : DS.attr()
    ,status : DS.attr()
    ,blockedby : DS.attr()
    ,blockedbycontact : DS.attr()
    ,blockedon : DS.attr('date')
    ,createdon : DS.attr('date')
    ,createdby : DS.attr()

});
