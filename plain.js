
let dragingElement = null;
function allowDroponCanvas(ev) {
    ev.preventDefault();
}

function allowDroponElement(ev) {
    ev.preventDefault();
}

function dragItem(ev) {
    //ev.preventDefault();
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.target.innerHTML);
    dragingElement = ev.target.innerHTML;
}

function dragElement(ev) {
    //ev.preventDefault();
    console.log('dragElement: ',ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropItem(ev) {
    ev.preventDefault();

    //console.log(ev.target.classList.contains('element'));
    var data = ev.dataTransfer.getData("text");
    var dragObj = document.getElementById(data);
    //console.log();
    // var el = document.createElement('div');
    // el.className = 'element';

    if (dragingElement === 'Conditions') {
        var el = document.createElement('div');
        el.className = 'el_conditions';
        el.setAttribute('id', uniqueId());
        el.setAttribute('ondragstart', "dragElement(event)");
        el.setAttribute('draggable', "true");
        el.setAttribute('dropElement', "true");
        el.setAttribute('ondrop', 'dropElement(event)');

        var el_select = document.createElement('div');
        el_select.className = "el_select";
        var el_span = document.createElement('span');
        el_span.className = 'el_span';
        
        var text = document.createTextNode(dragingElement);
        el_span.appendChild(text);
        el_select.appendChild(el_span);
       
        var sel = document.createElement('select');
        sel.name = 'drop1';
        sel.id = 'Select1';
        sel.className = 'form-control'

        var inputs = [
            "a.tacticId",
            "a.times",
            "p.professionId",
            "p.country",
            "p.specialityId",
            "p.occupationId",
            "a.leadspec",
            "a.within",
            "a.channel",
            "a.activityName",
            "a.exp"

        ];

        var options_str = "";

        inputs.forEach(function (inputs) {
            options_str += '<option value="' + inputs + '">' + inputs + '</option>';
        });

        sel.innerHTML = options_str;
        el_select.appendChild(sel);

        var label, textbox;
        label = document.createElement('label');
      
        textbox = document.createElement('input');
        textbox.type = 'text';
        textbox.className = 'form-control';
        textbox.placeholder = "add value";
        label.appendChild(textbox);
        el_select.appendChild(label);
        el.appendChild(el_select);
        ev.target.appendChild(el);

    }
    if (dragObj.classList.contains('element')) {
        ev.target.appendChild(document.getElementById(data));
    }
    else if (dragingElement != 'Conditions') {
        var el = document.createElement('div');
        el.className = 'element';
        el.setAttribute('id', uniqueId());
        el.setAttribute('ondragstart', "dragElement(event)");
        el.setAttribute('draggable', "true");
        el.setAttribute('dropElement', "true");
        el.setAttribute('ondrop', 'dropElement(event)');

        var el_span = document.createElement('span');
        var el_span2 = document.createElement('span');
        el_span.className = 'el_span';
        el_span2.className = 'el_span2';
        var text = document.createTextNode(dragingElement);
        el_span.appendChild(text);
        var el_del = document.createElement('del');
        el_del.className = "glyphicon glyphicon-remove";
        var el_drag = document.createElement('drag');
        el_drag.className = 'glyphicon glyphicon-move';
        el.appendChild(el_span);
        el_span2.appendChild(el_drag);
        el_span2.appendChild(el_del);
        el.appendChild(el_span2);
        ev.target.appendChild(el);
    }

    
}

function dropElement(ev) {
    // ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // console.log(data);
    // ev.target.appendChild(document.getElementById(data));
    //console.log(dragObj.nodeName);
}

var uniqueId = function () {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

