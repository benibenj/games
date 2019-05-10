/* Fairy Dust Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/jWmZxZ/
 */


function loadPlayerRanking(action) {
    getAjax("/scoreboard/players", function(text){
        action(JSON.parse(text));
    });
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

(function fairyDustCursor() {

  var bestPlayer = null;
  loadPlayerRanking(function(array){
    if(array.length > 0){
      bestPlayer = array[0].username;
    }
  });

  var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
  var width = window.innerWidth;
  var height = window.innerHeight;
  var cursor = {x: width/2, y: width/2};
  var particles = [];

  function init() {
    bindEvents();
    loop();
  }

  // Bind events that are needed
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize(e) {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function onMouseMove(e) {
    if(e.clientX != null){
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    } else 
    if(e.touches[0] != null){
      cursor.x = e.touches[0].pageX;
      cursor.y = e.touches[0].pageY;
    } else
    if(e.originalEvent.touches[0] != null){
      cursor.x = e.originalEvent.touches[0].pageX;
      cursor.y = e.originalEvent.touches[0].pageY;
    } else
    if(e.originalEvent.changedTouches[0] != null){
      cursor.x = e.originalEvent.changedTouches[0].pageX;
      cursor.y = e.originalEvent.changedTouches[0].pageY;
    }   

    addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random()*possibleColors.length)]);
  }

  function addParticle(x, y, color) {
    var particle = new Particle();
    particle.init(x, y, color);
    particles.push(particle);
  }

  function updateParticles() {

    // Updated
    for( var i = 0; i < particles.length; i++ ) {
      particles[i].update();
    }

    // Remove dead particles
    for( var i = particles.length -1; i >= 0; i-- ) {
      if( particles[i].lifeSpan < 0 ) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }

  }

  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }

  /**
   * Particles
   */
  function Particle() {
    this.rand = Math.random()*((bestPlayer !== null)?1000:900);
    
    if (this.rand < 100) {
      this.character = "👏";
    }else
    if(this.rand < 200){
      this.character = "🎲";
    }else
    if(this.rand < 300){
      this.character = "🎮";
    }else
    if(this.rand < 400){
      this.character = "👾";
    }else
    if(this.rand < 500){
      this.character = "🕹️";
    }else
    if(this.rand < 600){
      this.character = "❤️";
    }else
    if(this.rand < 700){
      this.character = "😊";
    }else
    if(this.rand < 800){
      this.character = "🍀";
    }else
    if(this.rand < 900){
      this.character = "🤪";
    }else{
      this.character = "👑"+bestPlayer+"👑";
    }
    this.lifeSpan = 100; //ms
    this.initialStyles ={
      "position": "fixed",
      "display": "inline-block",
      "top": "0px",
      "left": "0px",
      "pointerEvents": "none",
      "touch-action": "none",
      "z-index": "10000000",
      "fontSize": "25px",
      "will-change": "transform"
    };

    // Init, and set properties
    this.init = function(x, y, color) {

      this.velocity = {
        x:  (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
        y: 1
      };

      this.position = {x: x, y: y};
      this.initialStyles.color = "#000000";
      this.initialStyles.fontWeight = "bold";

      this.element = document.createElement('span');
      this.element.innerText = this.character;
      //this.element.position = "absolute";
      applyProperties(this.element, this.initialStyles);
      this.update();

      document.querySelector('.js-cursor-container').appendChild(this.element);
    };

    this.update = function() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;

      this.element.style.transform = "translate3d(calc(" + this.position.x + "px - 50%), calc(" + this.position.y + "px - 50%), 0) scale(" + (this.lifeSpan / 120) + ")";
    }

    this.die = function () {
      this.element.parentNode.removeChild(this.element);
    }

  }


  /**
   * Utils
   */

  // Applies css `properties` to an element.
  function applyProperties( target, properties ) {
    for( var key in properties ) {
      target.style[ key ] = properties[ key ];
    }
  }

  if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
})();