(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  var startTime;
  var elapsedTime = 0;    // 経過時間初期化

  function updateTimerText() {
    // 135.2秒経過したとして、135200 -> 02:15.200
    // m = 135200 / 60000 の商
    // s = 135200 % 60000 / 1000
    // ms = 135200 % 1000
    var m = Math.floor(elapsedTime / 60000);    // 小数点以下切捨て
    var s = Math.floor(elapsedTime % 60000 / 1000);
    var ms = elapsedTime % 1000;
    timer.textContent = m + ':' + s + '.' + ms;
  }

  function countUp() {
    setTimeout(function() {
      elapsedTime = Date.now() - startTime;
      // console.log(elapsedTime);
      updateTimerText();
      countUp();
    }, 10);               // 10ミリ秒後に
  }

  start.addEventListener('click', function() {
    startTime = Date.now();
    countUp();            //計算実行
  });
})();
