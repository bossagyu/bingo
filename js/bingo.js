$ = function(x) {
  return document.getElementById(x);
}

// ビンゴ用数字配列
var numList = [2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,48,49,50,51,52,53,54,55,56,57,58,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
var bingo_count  = 0;

var isStop = true;

function startBingo() {
  // ボタンの表示切り替え
  $("start").style.display = "none";
  $("stop").style.display = "inline";
  isStop = false;
  roulette();
}

function stopBingo() {
  // ボタンの表示切り替え
  $("start").style.display = "inline";
  $("stop").style.display = "none";
  // 音声の再生
  document.getElementById( 'sound-file' ).play()
  isStop = true;
}

function roulette() {
  var id = "";
  var rnd = Math.floor(Math.random() * numList.length);
  // ストップボタンが押された
  if (isStop) {
    // 遅延呼び出しを解除
    clearTimeout(id);
    
    // 特定の回数のみ、指定した数字を表示
    // 回数に引っかかれば残りの処理をスキップする。
    if(yaotyo()) {
        return false;
    }
    if(view_num_pic(numList[rnd])) {
        return false;    
    }

    $("view").innerHTML = numList[rnd];
    if (!$("out").innerHTML) {
      $("out").innerHTML = $("out").innerHTML + numList[rnd];
    }
    else {
      $("out").innerHTML = $("out").innerHTML + "　" + numList[rnd];
    }
    
    //決定した数字をリストから削除する
    numList.splice(rnd, 1);
    // リストが空になったら終了
    if (numList.length == 0) {
      alert("最後です。");
      $("start").disabled = true;
    }
    return false;
  }
  
  // 乱数を画面に表示
  //document.write(rnd) 
  $("view").innerHTML = numList[rnd];
  // 100ms後に再帰的に実行するよう登録する
  id = setTimeout("roulette()", 100);

}

// 特定の回数のときだけ八百長します。
// 数値のリストから八百長の数字については抜いておいてください
function yaotyo() {
    var num = "";

    switch (bingo_count) {
        case 1:
            num = 1;
            view_pic(num); 
            break;
        case 10:
            num = 45;
            view_pic(num); 
            break;
        case 15:
            num = 59;
            view_pic(num); 
            break;
        case 20:
            num = 11;
            view_pic(num); 
            break;
        default: 
            bingo_count++;
            return (false);
    }
    bingo_count++;
    return(true);

}

function view_num_pic(num) {
    var img = new Image();
    var flag = false;
    img.src = "./img/" + num + ".jpg"; 
    img.onerror = function() {
        flag = false;
    }
    return flag
}

// 指定された番号の画像を挿入する
function view_pic(num) {
    $("view").innerHTML = "<figure class='relative'>" +
    "<img src ='./img/" + num + ".jpg'></img>" +
    "<figcaption class='absolute'><p>" + num + "</p></figcaption>" +
    "</figure>";
    $("out").innerHTML = $("out").innerHTML + "　" + num;
 }   

