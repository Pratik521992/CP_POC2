
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
        tactic(ev);

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
    //console.log(json.child[0]);
    //doShow('overlay');
    var rawString = getCodeString(json.child);
}

var regParam = /(#)(param)(#)/g;
var regChild = /(#)(children)(#)/g;

var template = new Array();
template['for_event'] = 'forEvent( #params# ) { #children# }';
template['campaign'] = 'campaign( #params# ) { #children# }';
template['no_event'] = '{ #children# }';

template['any_of'] = 'anyof { #children# }';
template['all_of'] = 'allof { #children# }';

template['tactic'] = 'actions { #children# }';
template['tactic_content'] = '( #params# ) { #children# }';
template['conditions'] = 'conditions( #params# ) { #children# }';

template['when'] = 'when { #params# }';
template['if'] = 'if { #params# }';
template['else'] = 'else { #params# }';


var codeString = "";
var parentString = "";
var childString = "";

function getCodeString(obj){
    //console.log('working');
    for (var key in obj) {
        
        if (obj[key].attr != undefined && obj[key].attr.class == 'element'){

            var templateLabel = obj[key].attr.codename;
            var curTemplate = template[templateLabel];

            console.log(curTemplate);

            if (parentString == '' ){
                parentString = curTemplate;
            }
            else {
                parentString = parentString.replace('#children#', curTemplate); 
                console.log(parentString);
            }

            var child = obj[key].child;
            getCodeString(child);

            // for( var key in child ){
            //     console.log(child[key].attr.codename);
            //     getCodeString(child[key]);
            //     // if(child[key].attr != undefined && child[key].attr.class == 'element'){
            //     //     console.log('child, ', child[key]);
            //     //     getCodeString(child[key]);

            //     // }
                
            // }
            // if (obj.hasOwnProperty(key)) {
            //     var val = obj[key];
            //     getCodeString(val);
            // }

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




