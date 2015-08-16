define(['jquery', 'handlebars'], function($, HB) {
  var template = HB.compile( $('#weather-template').html() );
  return template;
});