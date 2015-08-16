define(['jquery', 'config-main', 'config-navbar', 'style-loader'], function($, config, navbar, loadCSS) {
  $(function($){
      var $content = $('#' + config.contentId);  

      function showPage(option) {
        //load stylesheet => html => javascript
        //so it shows correct style when the html loaded.
        //the javascript must be the last, since requirejs won't actually load it after it was cached.
        if (option) {

          loadCSS(option.css); //load css by link tag in head

          $.ajax({
              url: option.html,
              dataType: 'html',
              success: function(html) {
                  $content.html(html);
                  require([option.script], function(init) {  //using require([option.script]) would not trigger twice, so we need to init it.
                    if ($.isFunction(init)) { 
                      init();
                    }
                    return; 
                  });
              }
          })
        }
        return;
      }

      $('.navbar').on('click', 'li', function(e){  
          var page = $(this).data('nav'),
              option = navbar[page];
          return showPage(option);
      });

  });
})