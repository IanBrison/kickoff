jQuery(function(){
    // 社員のデータが書いてあるJsonを読み込む(実際読み込んでるわけではないが)
    var players = playersJsonArray;
    players.forEach(function(player, index){ //社員の顔写真をセット
        $('div.roulette').append('<img src="img/' + index + '.png"/>');
    });

    // 名前のグルグル用の数字と関数
    var tmpForNameSpinner = 0;
    var nameSpinnerFunction = function(){
        $('#name').html(players[tmpForNameSpinner].name);
        tmpForNameSpinner = (tmpForNameSpinner + 1) % players.length;
    };

    // ルーレットの設定
    var option = {
        speed : 10,
        duration : 5,
        stopImageNumber : 0,
        startCallback: function() {
            this.stopImageNumber = Math.floor(Math.random() * players.length);
            nameSpinner = setInterval(nameSpinnerFunction, 100);
        },
        slowDownCallback: function() {
        },
        stopCallback: function() {
            clearInterval(nameSpinner);
            $('#name').html(players[this.stopImageNumber].name);
        }
    }
    $('div.roulette').roulette(option);

    // START!
    $('.start').click(function(){
        $('div.roulette').roulette('start');
    });

    // STOP!
    $('.stop').click(function(){
        $('div.roulette').roulette('stop');
    });
});
