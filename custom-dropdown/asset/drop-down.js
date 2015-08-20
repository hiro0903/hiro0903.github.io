(function(){

  function initDropdown() {
      var dropdowns = Array.prototype.slice.call(document.getElementsByClassName('drop-down')),
          i, len;

      function setDropdown(dropdown){
          var selection = dropdown.getElementsByClassName('selection')[0],
              items     = Array.prototype.slice.call(dropdown.getElementsByClassName('item')),
              input     = (function() { 
                var inputs = dropdown.getElementsByTagName('input'),
                    input = inputs[0];
                if (!input) {
                    input = document.createElement('input');
                    input.type = 'hidden';
                    dropdown.appendChild(input);
                }
                return input;
              })();

          function toggleMenu() { 
              /* ie10+
              dropdown.classList.toggle('expand'); 
              */

              var className = dropdown.className;
              if (/(^.+\S)(\s?expand)(\s.+)?$/.test(className)) {
                  dropdown.className = RegExp.$1 + RegExp.$3;
              } else {
                  dropdown.className = className 
                                      + (className.length ? " " : "")
                                      + "expand";
              }
          }
          function itemSelected(text, value) {
              selection.innerText = text;
              input.value = value;
              toggleMenu();
          }

          selection.addEventListener('click', toggleMenu);
          items.forEach(function(item) {
              var attrDataValue = item.attributes['data-value'],
                  value = (typeof(attrDataValue) === 'object') ? attrDataValue.value : '';
              item.addEventListener('click', itemSelected.bind(this, item.innerText, value));
          });
      }

      dropdowns.forEach(setDropdown);
  }


  if (document.addEventListener) {
      document.addEventListener( "DOMContentLoaded", initDropdown, false );
  } 
  /*
  else if ( document.attachEvent ) {
      //ie8
      document.attachEvent("onreadystatechange", initDropdown);
  } 
  */
  else {
      console.warn('目前只支援至ie9+');
      initDropdown();
  }
})()