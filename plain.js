
let dragingElement = null;
let text = '';

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

    if ((dragObj.classList.contains('element') || (dragObj.classList.contains('el_conditions')))) {
        ev.target.appendChild(document.getElementById(data));
    }
    else if (dragingElement === 'conditions') {
        condition(ev);

    }
    else if (dragingElement === 'for_event') {
        forEvent(ev);

    }
    else if (dragingElement === 'tactic_content') {
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

function doCopy(id) {
    
    getdata(document);


}

function doClose(id) {

   
    id.remove();


}
function doCloseOutput(id) {

    document.getElementById(id).style.display = 'none';


}

function doShow(id) {
    document.getElementById(id).style.display = 'block';
}

function genscript(){
    initElement = document.getElementById('canvas').innerHTML;
    json = html2json(initElement);
    console.log(json);
    //doShow('overlay');
}

var regParam = /(#)(param)(#)/g;
var regChild = /(#)(param)(#)/g;

var template = new Array();
template['for_event'] = 'forEvent( #params# ) { #children# }';
template['in_session_event'] = 'inSessionEvent( #params# ) { #children# }';
template['no_event'] = '{ #children# }';

var codeString = "";

function getCodeString(json){
    
    if( typeof json == 'object'){
        for( var key in json ){
            getCodeString(json[key]);
        }
    }

    return codeString;
}

function delnodes() {
    console.log('removing..')
    let element = document.getElementById("forOutput");
    element.parentNode.removeChild(element);
    location.reload();
}

function log() {

    console.log('downloading...')

    var fileName = "data.txt";
    var pp = document.createElement('a');
    text = text.replace(/\n/g, "%0D%0A");
    pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + text);
    pp.setAttribute('download', fileName);
    pp.click();

}




