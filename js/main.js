(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  var startTime;
  var elapsedTime = 0;

  function countUp() {
    setTimeout(function() {
      elapsedTime = Date.now() - startTime;
      console.log(elapsedTime);
      countUp();
    }, 10);
  }

  start.addEventListener('click', function() {
    startTime = Date.now();
    countUp();
  });
})();
