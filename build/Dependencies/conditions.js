function condition(ev) {
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
    var el_span2 = document.createElement('span');
    el_span2.className = 'el_span2';
    var text = document.createTextNode(dragingElement);
    el_span.appendChild(text);
    el_select.appendChild(el_span);

    var sel = dropdown("condition_main");
    el_select.appendChild(sel);
    var sel2 = dropdown("condition_operator");
    el_select.appendChild(sel2);

    var label, textbox;
    label = document.createElement('label');

    textbox = document.createElement('input');
    textbox.type = 'text';
    textbox.className = 'form-control';
    textbox.placeholder = "add value";
    label.appendChild(textbox);
    el_select.appendChild(label);
    var el_del = document.createElement('a');
    el_del.href = "#";
    el_del.className = "far fa-trash-alt ";
    el_del.style = "color:white";
   
    el_del.addEventListener("click", function(){
        doClose(el);
    });
    var el_drag = document.createElement('a');
    el_drag.className = 'glyphicon glyphicon-move';
    el_drag.style = "color:white";
    el_span2.appendChild(el_drag);
    el_span2.appendChild(el_del);
    el.appendChild(el_span2);
    el.appendChild(el_select);
    
    ev.target.appendChild(el);
}