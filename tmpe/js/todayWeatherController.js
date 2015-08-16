define(['jquery', 'weather-template'], function($, template){

    var querying, 
        $form,
        $result, 
        weatherData = {}; 

    $.support.cors = true;
    
    function resetForm() {
        $form.removeClass('error');
    }

    function render(option) {
        function parseWeatherData(json) {
            var data = (json.weather && json.weather[0]) ? json.weather[0] : {},
                desc = (data.description) ? data.description.toLowerCase() : '',
                main = json.main || {};

            data.type = (desc.indexOf('cloud') > -1) ? 'cloud' :
                        (desc.indexOf('rain')  > -1) ? 'rain'  :
                        (desc.indexOf('clear') > -1) ? 'sun'   : '';

            data.temperature = main.temp_min + '\u00B0 C ~ ' 
                             + main.temp_max + '\u00B0 C';

            data.name = json.name;

            data.humidity = main.humidity;

            return data;
        }

        querying = ('querying' in option) ? option.querying : querying;
        weatherData = option.weather ? parseWeatherData(option.weather) : weatherData;

        $result.html(template({
            weather : weatherData,
            querying: querying
        }));
    }

    function queryWeather(city, country) {
        function onError(jqXHR, status) {
          debugger;
            $form.addClass('error').find('.error-message').text(status);
            render({weather: {}, querying: false}); 
            $form.find('input').one('change', resetForm);
        }

        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            beforeSend: function() { 
              render({querying: true}); 
            },
            crossDomain: true,
            data: {
              q: city + ',' + country,
              units: 'metric'
            },
            dataType: 'json',
            error: onError,
            success: function(json, status, jqXHR) {
                if (parseInt(json.cod, 10) !== 200) { 
                  onError(jqXHR, json.message);
                } else {
                  render({weather: json, querying: false}); 
                }
            },
            method: 'get'
        });
    }

    function submitForm(e) {
        e.preventDefault(); 
        var city = this['city'],
            country = this['country'];

        if (city && country && !querying) queryWeather(city.value, country.value);  //只有在資料都有填, 並且不是查詢中才會query
    }

    function init() {  //reset variables, to work correctly if the script is cached by requirejs
        querying = false;
        $form = $(document.forms['weather']);
        $result = $('#result');
        $form.on('submit', submitForm);
    }

    return init;
});