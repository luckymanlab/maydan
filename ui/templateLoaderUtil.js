/**
 * Created by volodymyr.prasolov on 1/20/2015.
 */

function render(tmpl_name, tmpl_data) {
    if ( !render.tmpl_cache ) {
        render.tmpl_cache = {};
    }

    if ( !render.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
                this.tmpl_string = data;
            }
        });

        render.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }

    return render.tmpl_cache[tmpl_name](tmpl_data);
}


