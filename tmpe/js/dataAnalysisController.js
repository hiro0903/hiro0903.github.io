define(['jquery', 'config-data-analysis', 'chart'], function($, config) {

  function showChart(type) {  
    $('#chart').highcharts(config.data[type]);
  }

  function init() {
    $('.data-analysis').on('click', '[data-show]', function(e) {
        var chartType = $(this).data('show');
        showChart(chartType);
    });
  }

  return init;
})