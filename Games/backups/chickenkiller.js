window.addEventListener("load", function() {
    
    let score = 0;
    let health = 10;
    let fields = [];
    let pause = true;

    function Field(id) {
        this.id = id;
        let self = this;
        this.chicken = document.getElementById("chicken-" + this.id);
        this.chicken.addEventListener("mousedown", function() {
            self.killedChicken(self);
        });
        this.gnome = document.getElementById("gnome-" + this.id);
        this.gnome.addEventListener("mousedown", function() {
            self.killedGnome(self);
        });
        this.mode = 0;
        this.counter = 0;
    }

    Field.prototype.update = function() {
        switch(this.mode) {
            case 0:
                this.chicken.classList.remove("active");
                this.gnome.classList.remove("active");
                break;
            case 1:
                this.chicken.classList.add("active");
                this.gnome.classList.remove("active");
                break;
            case 2:
                this.chicken.classList.remove("active");
                this.gnome.classList.add("active");
                break;
        }
    }

    Field.prototype.killedChicken = function(self) {
        if(self.mode === 1) {
            self.mode = 0;
            self.update();
            self.counter = 0;
            score++;
        }
    }

    Field.prototype.killedGnome = function(self) {
        if(self.mode === 2) {
            self.mode = 0;
            self.update();
            self.counter = 0;
            health--;
            if(health === 0) {
                end();
            }
        }
    }

    Field.prototype.run = function() {
        if(this.mode === 0) {
            
            if(Math.random() < 1 - 1/((score/10000 + 1 + 0.001))) {
                if(Math.random() < 0.5) {
                    this.mode = 1;
                    this.update();
                } else {
                    this.mode = 2;
                    this.update();
                }
            }
        } else {
            this.counter++;
            if(this.counter > 200/(score/50 + 1)) {
                if(this.mode === 1) {
                    health--;
                    if(health === 0) {
                        end();
                    }
                }
                this.mode = 0;
                this.update();
                this.counter = 0;
            }
        }
    }

    Field.prototype.reset = function() {
        this.mode = 0;
        this.counter = 0;
        this.update();
    }

    let start = document.getElementById("start");
    let gameover = document.getElementById("gameover");
    let startButtons = document.getElementsByClassName("start");
    let scores = document.getElementsByClassName("score");
    let healths = document.getElementsByClassName("health");

    for(let i = 0; i < startButtons.length; i++){
        startButtons[i].onclick = function() {
            start.style.display = "none";
            gameover.style.display = "none";
            reset();
        };
    }

    for(let i = 0; i < 8; i++) {
        fields.push(new Field(i));
    }

    run();
    setInterval(function() {
        run();
    }, 16);

    function run() {
        if(!pause) {
            updateOverlay();
            for(let i = 0; i < 8; i++) {
                fields[i].run();
            }
        }
    }

    function reset() {
        score = 0;
        health = 10;
        pause = false;
        for(let i = 0; i < 8; i++) {
            fields[i].reset();
        }
        updateOverlay();
    }

    function end() {
        updateOverlay();
        pause = true;
        for(let i = 0; i < 8; i++) {
            fields[i].mode = 0;
            fields[i].update();
        }
        gameover.style.display = "block";
        submitScore(score, "chickenkiller", function(){}, function(){});
    }

    updateOverlay();
    function updateOverlay() {
        for(let i = 0; i < scores.length; i++){
            scores[i].innerHTML = score;
        }
        for(let i = 0; i < healths.length; i++){
            healths[i].innerHTML = "";
            for(let j = 0; j < health; j++){
                healths[i].innerHTML += "❤️";
            }
        }
    }


}, false);

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

// Trap functions
function t1(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 54 + parseInt(score) * parseInt(object.y) + parseInt(object.z) + 85;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t2(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 3527 + parseInt(score) * parseInt(object.y) + parseInt(object.z) - 3;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t3(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value =  - 2245 + parseInt(score) * parseInt(object.y) + parseInt(object.z);
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t4(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + parseInt(object.z) + 1349865;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
// More Trap Functions
function t5(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score) * parseInt(object.y) + parseInt(object.z) + 85;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t6(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score);
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t7(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = - parseInt(score) * 100;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t8(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 54 + parseInt(score) + parseInt(object.z) + 5688;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}

// Submits the score (integer) to the specified game (string), executes
// action (function) if the submission was successful
function submitScore(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = 345 + parseInt(score) * parseInt(object.y) + parseInt(object.z) - 345;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}

function t9(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y);
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
    });
}
function t10(score, game, action, error) {
    getAjax("/scoreboard/request", function(request) {
        if(request !== "error") {
            let object = JSON.parse(request);
            let value = parseInt(score) * parseInt(object.y) + 100;
            postAjax("/scoreboard/submit", {
                "key": object.x,
                "value": value,
                "game": game
            }, function(submit){
                action(submit);
            });
        } else {
            error();
        }
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