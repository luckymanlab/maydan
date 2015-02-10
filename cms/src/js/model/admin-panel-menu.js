var UT = window.UT || {};

UT.AdminPanelMenu = Backbone.Model.extend({
    defaults: {
        menu: [
            {
                id: 0,
                name:'Unapproved Articles'
            },
            {
                id: 1,
                name: 'Approved Articles'
            }
        ],
        current: 0
    },
    getMenuList: function() {
        return this.get('menu');
    },
    setCurrentMenuItem: function(opt) {
        this.set('current', opt);
    },
    getCurrentMenuItem: function() {
        return this.get('current');
    }

});