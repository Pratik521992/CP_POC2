function forEvent(ev) {
    
    var el = document.createElement('div');
    el.className = 'element';
    el.setAttribute('id', uniqueId());
    
    el.setAttribute('codename', dragingElement);
    el.setAttribute('ondragstart', "dragElement(event)");
    el.setAttribute('draggable', "true");
    el.setAttribute('dropElement', "true");
    el.setAttribute('ondrop', 'dropElement(event)');

    var el_select = document.createElement('div');
    el_select.className = "el_select";
    var el_span = document.createElement('span');
    var el_span2 = document.createElement('span');
    el_span.className = 'el_span';
    el_span2.className = 'el_span2';

    el_select.appendChild(el_span);

    var sel = dropdown("for");
    el_select.appendChild(sel);
    var text = document.createTextNode(dragingElement);
    el_span.appendChild(text);
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
    el.appendChild(el_span);
    el_span2.appendChild(el_drag);
    el_span2.appendChild(el_del);
    el.appendChild(el_span2);
   
    el.appendChild(el_select);
    ev.target.appendChild(el);
}