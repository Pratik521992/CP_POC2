
function allowDroponCanvas(ev) {
    ev.preventDefault();
}

function allowDroponElement(ev) {
    ev.preventDefault();
}

function dragItem(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragElement(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropItem(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    var el = document.createElement('div');
    el.className = 'element';
    var el_span = document.createElement('span');
    var el_span2 = document.createElement('span');
    el_span.className = 'el_span';
    el_span2.className = 'el_span2';
    var text = document.createTextNode("Tag Name");
    el_span.appendChild(text);
    var el_del = document.createElement('del');
    el_del.className = "glyphicon glyphicon-remove";
    var el_drag = document.createElement('drag');
    el_drag.className = 'glyphicon glyphicon-fullscreen';
    
  
    el.appendChild(el_span);
    
    el_span2.appendChild(el_drag);
    el_span2.appendChild(el_del);
    el.appendChild(el_span2);

    ev.target.appendChild(el);
}

/*****************************************************
 * var template = {
    _if: '<div class="el_block"><span class="drag_handle">+</span><span class="delete">x</span></div>',
    _allof: '<div class="el_block"><span class="drag_handle">+</span><span class="delete">x</span></div>',
    _anyof: '<div class="el_block"><span class="drag_handle">+</span><span class="delete">x</span></div>'
  };

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

  var el = document.createElement('div');
  el.className = 'el_block';
  //el.setAttribute('draggable', true);
  //el.setAttribute('ondragstart', 'drag(event)');
  //el.setAttribute('ondrop', 'drop(event)');
  //el.setAttribute('ondragover', 'allowDrop(event)');
  var el_label = '';

  switch(data){
         case 'el_if':
            el_label = '<span class="el_label">if</span>'
         break;
      case 'el_allof':
            el_label = '<span class="el_label">allof</span>'
         break;
      case 'el_anyof':
            el_label = '<span class="el_label">anyof</span>'
         break;
   }

  el.innerHTML = el_label + '<span class="buttons"><span class="drag_handle">+</span><span class="delete">x</span></span>';

  //console.log(data);
  ev.target.appendChild( el );
console.log(data);
}
 * 
 * ********************************************* */