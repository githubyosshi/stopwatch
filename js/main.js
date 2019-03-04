(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  var startTime;
  var elapsedTime = 0;    // 経過時間初期化
  var timerId;
  var timeToAdd = 0;      // 再開した時からの経過時間
  var isRunning = false;  // 動作中判断

  function updateTimerText() {
    // 135.2秒経過したとして、135200 -> 02:15.200
    // m = 135200 / 60000 の商
    // s = 135200 % 60000 / 1000
    // ms = 135200 % 1000
    var m = Math.floor(elapsedTime / 60000);    // 小数点以下切捨て
    var s = Math.floor(elapsedTime % 60000 / 1000);
    var ms = elapsedTime % 1000;

    //  3 -> '03'
    // 12 -> '12'

    //  3 -> '0' +  3 -> '03'
    // 12 -> '0' + 12 -> '012'

    m = ('0' + m).slice(-2);    //末尾2桁
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms; // timer表示
  }

  function countUp() {
    timerId = setTimeout(function() {
      // elapsedTime = Date.now() - startTime;
      // 再開時の経過時間を加える
      elapsedTime = Date.now() - startTime + timeToAdd;
      // console.log(elapsedTime);
      updateTimerText();
      countUp();
    }, 10);               // 10ミリ秒後に
  }

  // start.className = 'btn';
  // stop.className = 'btn inactive';
  // reset.className = 'btn inactive';

  function updateButtonState(startButtonState, stopButtonState, resetButtonState) {
    start.className = startButtonState ? 'btn' : 'btn inactive';
    stop.className = stopButtonState ? 'btn' : 'btn inactive';
    reset.className = resetButtonState ? 'btn' : 'btn inactive';
  }

  updateButtonState(true, false, false);

  start.addEventListener('click', function() {
    if (isRunning === true) {
      return;             // 複数起動を行わない
    }
    isRunning = true;
    // start: false, stop: true, reset: false
    updateButtonState(false, true, false);
    startTime = Date.now();
    countUp();            //計算実行
  });

  stop.addEventListener('click', function() {
    if (isRunning === false) {
      return;             // timeToAddを何度も行わない
    }
    isRunning = false;
    // start: true, stop: false, reset: true
    updateButtonState(true, false, true);
    clearTimeout(timerId);    // 停止
    timeToAdd += Date.now() - startTime;  // 再開時の経過時間
  });

  reset.addEventListener('click', function() {
    if (isRunning === true) {
      return;               // 動作中はRsetを行わない
    }
    // start: true, stop: false, reset: false
    updateButtonState(true, false, false);
    elapsedTime = 0;        // 0に戻す
    timeToAdd = 0;
    updateTimerText();
  });
})();
