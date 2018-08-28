jQuery(function(){
    // 社員のデータが書いてあるJsonを読み込む(実際読み込んでるわけではないが)
    var players = playersJsonArray;
    var noImgPlayerIndex = -1;
    players.some(function(player){ //社員の顔写真をセット
        if (!player.hasImage) {
            noImgPlayerIndex = player.index;
            $('div.roulette').append(
                '<div class="targets roulette_item">' +
                    '<div class="target_img_div">' +
                        '<img class="target_img" id="no_img_player_img" src="img/no.png"/>' +
                    '</div>' +
                    '<div class="target_name_div">' +
                        '<div class="target_name_1">' + player.name + '</div>' +
                        '<div class="target_name_2">' + player.name + '</div>' +
                        '<div class="target_name_3">' + player.name + '</div>' +
                    '</div>' +
                '</div>'
            );
            return true;
        }
        $('div.roulette').append(
            '<div class="targets roulette_item">' +
                '<div class="target_img_div">' +
                    '<img class="target_img" src="img/' + player.imgUrl + '"/>' +
                '</div>' +
                '<div class="target_name_div">' +
                    '<div class="target_name_1">' + player.name + '</div>' +
                    '<div class="target_name_2">' + player.name + '</div>' +
                    '<div class="target_name_3">' + player.name + '</div>' +
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
                '<div class="list_item row">' +
                    '<div class="list_item_img col s3">' +
                        '<img src="img/' + finishedPlayers[n].imgUrl + '" width="100%"/>' +
                    '</div>' +
                    '<div class="list_item_name col s9">' +
                        '<span>' + finishedPlayers[n].name + '</span>' +
                    '</div>' +
                '</div>'
            );
        }
    }

    var pipipi = $('#pipipi')[0];
    pipipi.loop = true;
    var piroon = $('#piroon')[0];
    piroon.loop = false;

    var playerIntroductionTypeArray = [
        '私、実は...',
        'もし地球最後の日だったら...',
        '活性するなら...'
    ];
    var playerIntroductionTypeP = $('#player_introduction_type');
    var playerIntroductionP = $('#player_introduction');
    var showIntroduction = function () {
        playerIntroductionTypeP.html(playerIntroductionTypeArray[players[nextPlayerNum].introductionType]);
        playerIntroductionP.html(players[nextPlayerNum].introduction[players[nextPlayerNum].introductionType]);
        next_is_stop = true;
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
            pipipi.play();
            playerIntroductionTypeP.html('');
            playerIntroductionP.html('');
        },
        slowDownCallback: function() {
            if (!next_is_stop) {
                showIntroduction();
            }
        },
        stopCallback: function() {
            finishedPlayers.push(players[nextPlayerNum]);
            console.log('fin');
            console.log(finishedPlayers);
            renderLatestFinishedPlayers();
            pressed_start = false;
            next_is_stop = false;
            pipipi.pause();
            piroon.play();
        }
    }
    $('div.roulette').roulette(option);

    var pressed_start = false;
    var next_is_stop = false;

    // START! EnterKey
    $(window).keyup(function(e){
        if (e.keyCode == 13 && !pressed_start) {
            $('div.roulette').roulette('start');
            pressed_start = true;
        }
    });

    // STOP! SpaceKey
    $(window).keyup(function(e){
        if (e.keyCode == 32 && pressed_start) {
            if (next_is_stop) {
                $('div.roulette').roulette('stop');
            } else {
                showIntroduction();
            }
        }
    });

});
