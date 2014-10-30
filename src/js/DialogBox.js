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
             'z-index: 2147483647;'
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

    // Create a div to hold the dialog box
    var uidiv = document.createElement("div");
    uidiv.innerHTML = "<h1>Msg Box:</h1><p>Lorem ipsum</p>";
    uidiv.className = "ui";
    uidiv.style.top = "70%";
    uidiv.style.left = "10%";
    
    document.body.appendChild(uidiv);
};

