jQuery(function(){
    // 社員のデータが書いてあるJsonを読み込む(実際読み込んでるわけではないが)
    var players = playersJsonArray;
    var noImgPlayerIndex = -1;
    players.some(function(player){ //社員の顔写真をセット
        if (!player.hasImage) {
            noImgPlayerIndex = player.index;
            $('div.roulette').append(
                '<div class="targets row" style="margin-bottom:0px">' +
                    '<div class="col s6">' +
                        '<img id="no_img_player_img" src="img/no.png"/>' +
                    '</div>' +
                    '<div class="col s6">' +
                        '<span id="no_img_player_name">誰でしょう</span>' +
                    '</div>' +
                '</div>'
            );
            return true;
        }
        $('div.roulette').append(
            '<div class="targets row" style="margin-bottom:0px">' +
                '<div class="col s6">' +
                    '<img src="img/' + player.imgUrl + '"/>' +
                '</div>' +
                '<div class="col s6">' +
                    '<span>' + player.name + '</span>' +
                '</div>' +
            '</div>'
        );
    });

    // 残ってる社員の番号だけ入った配列
    var leftPlayerNums = players.map((_, index) => index);
    console.log('init');
    console.log(leftPlayerNums);
    // 当たった社員の入ってる配列
    var finishedPlayers = [];

    // 次の当たりの人のIndex
    var nextPlayerNum = -1;
    // もし顔写真NGの人だったら
    var isNoImgPlayer = false;

    var setNextPlayer = function() {
        randomIndex = Math.floor(Math.random() * leftPlayerNums.length);
        nextPlayerNum = leftPlayerNums[randomIndex];
        leftPlayerNums.splice(randomIndex, 1);
        if (players[nextPlayerNum].hasImage) {
            isNoImgPlayer = false;
        } else {
            isNoImgPlayer = true;
            $('#no_img_player_name').html(players[nextPlayerNum].name);
        }
    }

    // 当たった社員のリストを再描画（はぁ...フロントのフレームワーク使えばよかった...）
    var finishedListDiv = $('#finished_list');
    var renderLatestFinishedPlayers = function() {
        $('.list_item').remove();
        var start = finishedPlayers.length - 10;
        if (start < 0) start = 0;
        for (n = start; n < finishedPlayers.length; n++) {
            finishedListDiv.append(
                '<div class="list_item row" style="margin-bottom:0px">' +
                    '<div class="col s6">' +
                        '<img src="img/' + finishedPlayers[n].imgUrl + '" width="50%" height="50%"/>' +
                    '</div>' +
                    '<div class="col s6">' +
                        '<span>' + finishedPlayers[n].name + '</span>' +
                    '</div>' +
                '</div>'
            );
        }
    }

    // ルーレットの設定
    var option = {
        speed : 10,
        duration : 5,
        stopImageNumber : 0,
        startCallback: function() {
            setNextPlayer();
            if (isNoImgPlayer) {
                this.stopImageNumber = noImgPlayerIndex;
            } else {
                this.stopImageNumber = nextPlayerNum;
            }
            console.log('left');
            console.log(leftPlayerNums);
        },
        slowDownCallback: function() {
        },
        stopCallback: function() {
            finishedPlayers.push(players[nextPlayerNum]);
            console.log('fin');
            console.log(finishedPlayers);
            renderLatestFinishedPlayers();
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
