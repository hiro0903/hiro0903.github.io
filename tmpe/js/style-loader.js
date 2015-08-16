define([], function(){

  var link;

  function createLink() {
      var _link = document.createElement('link');
      _link.rel = 'stylesheet';
      _link.type= 'text/css';
      document.getElementsByTagName('head')[0].appendChild(_link);

      return _link;
  }

  function loadCSS(path) {
      if (!link) link = createLink();
      link.href = path;
  }

  return loadCSS;
})