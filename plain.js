
let dragingElement = null;


function allowDroponCanvas(ev) {
    ev.preventDefault();
}

function allowDroponElement(ev) {
    ev.preventDefault();
}

function dragItem(ev) {
    
    ev.dataTransfer.setData("text", ev.target.id);
   
    dragingElement = ev.target.id;
}

function dragElement(ev) {
    
    
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropItem(ev) {
    ev.preventDefault();

  
    var data = ev.dataTransfer.getData("text");
    var dragObj = document.getElementById(data);
   
    
    if ((dragObj.classList.contains('element')|| (dragObj.classList.contains('el_conditions')))){
        ev.target.appendChild(document.getElementById(data));
    }
    else if (dragingElement === 'conditions') {
        condition(ev);
      
     }
    else if (dragingElement != 'conditions') {
        allElements(ev);
    }

    
}

function dropElement(ev) {
    
}

var uniqueId = function () {
    return 'id-' + Math.random().toString(36).substr(2, 16);
};

