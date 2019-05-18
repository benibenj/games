document.addEventListener("load", function() {
    
    let difficulty = 0;
    let fields = [];

    for(let i = 0; i < 8; i++) {
        fields.push(new Field(i));
    }

    setInterval(function() {
        for(let i = 0; i < 8; i++) {
            fields[i].run();
        }
    }, 16);

    function Field(id) {
        this.id = id;
        this.chicken = document.getElementById("chicken-" + this.id);
        this.gnome = document.getElementById("gnome-" + this.id);
    }

    Field.prototype.run = function() {

    }

    Field.prototype.reset = function() {

    }

}, false);