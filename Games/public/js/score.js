/*

----------
HOW TO USE
----------

1. Copy-paste this code into your game .js file, do not include it
   with a separate script tag as this code has to be obfuscated with
   your game .js files as well

2. Implement the needed functions (submitScore(), loadMyScores(), 
   loadGameScores(), loadPlayerScores())

3. IMPORTANT: Obfuscate all the code of your game .js file with a 
   javascript obfuscator, for example 
   https://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx,
   make sure you have a backup of your clean code (NOT IN THE PUBLIC
   FOLDER!)

*/

// Submits the score (integer) to the specified game (string)
// Example: submitScore(100, "minesweeper")
function submitScore(score, game) {
    getAjax("/scoreboard/request", function(request) {
        console.log(request);
        let object = JSON.parse(request);
        let value = parseInt(score) * parseInt(object.y) + parseInt(object.z);
        console.log(value);
        postAjax("/scoreboard/submit", {
            "key": object.x,
            "value": value,
            "game": game
        }, function(submit){});
    });
}

// Load the current player scores into an array and executes the
// specified function with this array
// Example: loadMyScores(function(array){alert(array[0].username);}); 
function loadMyScores(action) {
    getAjax("/scoreboard/self", function(text){
        action(JSON.parse(text));
    });
}

// Load the ranking of the specified game into an array and executes
// the specified function with this array
// Example: loadGameRanking("minesweeper", function(array){alert(array[0].username);}); 
function loadGameRanking(game, action) {
    getAjax("/scoreboard/games?game=" + game, function(text){
        action(JSON.parse(text));
    });
}

// Load the ranking of all players into an array and executes
// the specified function with this array
// Example: loadPlayerRanking(function(array){alert(array[0].username);});
function loadPlayerRanking(action) {
    getAjax("/scoreboard/players", function(text){
        action(JSON.parse(text));
    });
}

// From https://plainjs.com/javascript/ajax/send-ajax-get-and-post-requests-47/
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

function getAjax(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
        if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
}