var UT = window.UT || {};

UT.UnitLoaderCollection = Backbone.Collection.extend({
    url: function() {
        return UT.Config.getAllApprovedUnits + '?' + this.setQueryParams();
    },
    model: UT.Unit,
    startDate: '',
    endDate: '',
    range: 1000000000,
    initialize: function(){
        var that = this;
        this.listenTo(UT.timer,'change', that.changeUnitLoaderCollection);
        this.fetch({
            success: function(){
                //Remove this comments after this collection usage
                console.log('UnitLoaderCollection is', that);
            }
        });
    },
    changeUnitLoaderCollection: function() {
        var that = this;
        if(UT.timer.getTime() < this.startDate || UT.timer.getTime() > this.endDate) {
            this.setQueryParams();
            this.fetch({
                success: function(){
                    //Remove this comments after this collection usage
                    console.log('UnitLoaderCollection after changes is', that);
                }
            });
        }
    },
    setQueryParams: function(){
        var time = UT.timer.getTime();
        var startDate = time - this.range;
        var endDate = time + this.range;
        this.startDate = startDate;
        this.endDate = endDate;
        var query='startDate='+startDate+'&'+'endDate='+endDate;
        return query;
    }
});



