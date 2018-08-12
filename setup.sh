mkdir web/static
mkdir web/static/js
mkdir web/static/css

curl http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js > web/static/js/jquery.min.js
curl http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js > web/static/js/jquery-ui.min.js
curl http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/ui-lightness/jquery-ui.css > web/static/css/jquery-ui.css
curl https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js > web/static/js/materialize.min.js
curl https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css > web/static/css/materialize.min.css

curl https://raw.githubusercontent.com/akira-kuriyama/roulette.js/master/roulette.js > web/static/js/roulette.js
