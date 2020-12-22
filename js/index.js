var datas = [],
    timer = null, //定時器
    flag = 0; //用於鍵盤事件狀態標記

document.querySelector('.btn_push').onclick = function () {
    var push_val = document.querySelector('.push_value').value;
    if (push_val == '') {
        alert('人生別留白');
    } else {
        datas.push(push_val);
        inHtml();
        document.querySelector('.push_value').value = '';
    }
}

function inHtml() {
    document.querySelector('.the_name').innerHTML = '';
    datas.forEach(function (data) {
        document.querySelector('.the_name').innerHTML += `<li>${data}</li>`;
    });
}

window.onload = function () {
    var play = document.getElementById('play'),
        stop = document.getElementById('stop');
    // 開始抽獎
    play.onclick = playFun;
    stop.onclick = stopFun;
    // 鍵盤事件
    document.onkeyup = function (event) {
        event = event || window.event;
        if (event.keyCode == 13) {
            if (flag == 0) {
                playFun();
                flag = 1;
            } else {
                stopFun();
                flag = 0;
            }
        }
    }
}
// 開始抽獎
function playFun() {
    if (datas.length == 0) {
        alert('目前沒有設定選項');
    } else {
        var title = document.getElementById('title');
        var play = document.getElementById('play');
        //每次都先清除上一次的定時器任務，避免抽獎效果累加頻率會越來越快
        clearInterval(timer);
        timer = setInterval(function () {
            var random = Math.floor(Math.random() * datas.length);
            title.innerHTML = datas[random];
        }, 50);
        play.style.background = '#999';
    }

}
//停止抽獎
function stopFun() {
    if (datas.length == 0) {
        alert('目前沒有設定選項');
    } else {
        clearInterval(timer);
        var winning_name = document.getElementById('title').textContent;
        datas.remove(winning_name)
        inHtml();
        var play = document.getElementById('play');
        play.style.background = '#036';
    }
}

//定義remove
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i
    }
    return -1
}
Array.prototype.remove = function (val) {
    var index = this.indexOf(val)
    if (index > -1) {
        this.splice(index, 1)
    }
}