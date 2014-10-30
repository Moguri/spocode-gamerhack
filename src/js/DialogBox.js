var Dialog = {
    sheet: undefined,
    diagdiv: undefined,
    uiselector: '.ui',
    uirules: 'position: absolute;' +
             'background-color: rgba(1, 1, 1, 0.5);' +
             'width: 80%;' +
             'height: 20%;' +
             'padding: 5px;' +
             'border: 3px solid black;' +
             'border-radius: 10px;' +
             'z-index: 2147483647;',
    divid: 'dialogui'
};

Dialog.setup = function() {

    // Create a style sheet
    Dialog.sheet = (function() {
        var style = document.createElement('style');

        // Webkit hack
        style.appendChild(document.createTextNode(''));
        
        document.head.appendChild(style);

        return style.sheet;
    })();

    Dialog.sheet.insertRule(Dialog.uiselector + '{' + Dialog.uirules + '}', 0);
};

Dialog.show = function(msg, speaker) {
    var uidiv,
        html;

    // Create a div to hold the dialog box
    uidiv = document.getElementById(Dialog.divid) || document.createElement("div");
    uidiv.id = Dialog.divid;
    uidiv.className = "ui";
    uidiv.style.top = "70%";
    uidiv.style.left = "10%";
  

    html = "<p>" + msg + "</p>";
    if (speaker !== undefined)
        html = "<h2>" + speaker + "</h2>" + html;
    uidiv.innerHTML = html;

    document.body.appendChild(uidiv);
};

Dialog.remove = function() {
    var uidiv = document.getElementById(Dialog.divid);

    console.log(uidiv);
    if (uidiv)
        uidiv.parentNode.removeChild(uidiv);
};
