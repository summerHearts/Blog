'use strict';
var cheerio = require('cheerio');
var cdnUrl = "http://blogstatic.ccsyue.com";
var baseUrl = '/';
var loading = "/images/loading.gif";
var oldsrc = '';

function stringStartsWith(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}
function lazyloadImg(source) {
    var $ = cheerio.load(source, {
        decodeEntities: false
    });
    $('img').each(function(index, element) {
        oldsrc = $(element).attr('src');
	if(stringStartsWith(oldsrc, './images')){
	    oldsrc= "/post_images" + oldsrc.substr(8);	
	}
        if (oldsrc && stringStartsWith(oldsrc, baseUrl)  && !$(element).hasClass('hx_lazyimg') && !$(element).hasClass('skip')) {
	    $(element).addClass('hx_lazyimg');
            $(element).attr({
                src: loading,
                'data-original': cdnUrl + oldsrc +"-Watermark"
            });
			
        }
    });
	$('script').each(function(index, element) {
		oldsrc = $(element).attr('src');
		if(stringStartsWith(oldsrc, '/vender')){
			$(element).attr({src: cdnUrl+oldsrc});
		}
	});
	$('link').each(function(index, element) {
		oldsrc = $(element).attr('href');
		if(stringStartsWith(oldsrc, '/vender')){
			$(element).attr({href: cdnUrl+oldsrc});
		}
	});

    return $.html();
}
hexo.extend.filter.register('after_render:html', lazyloadImg);
