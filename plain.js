
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

    //getdata(document);
    var copyText = document.getElementById("output");
    copyText.select();
    document.execCommand("copy");


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

function genscript() {
    initElement = document.getElementById('canvas').innerHTML;
    json = html2json(initElement);
    //console.log(json.child[0]);
    //doShow('overlay');
    var rawString = getCodeString(json.child);
    var tarea = document.getElementById('output');
    tarea.value = rawString;
    doShow('overlay');
    codeString = '#children#';
    level1String = '';
}

var regParam = /(#)(param)(#)/g;
var regChild = /(#)(children)(#)/g;

var template = new Array();
template['for_event'] = 'forEvent( [#params#] ) \n\r{\n\r#children#\n\r}\n\r';
template['campaign'] = 'campaign( [#params#] ) {\n\r#children#\n\r}\n\r';
template['no_event'] = '{ #children# }';

template['any_of'] = 'anyof \n\r{\n\r#children#\n\r}\n\r';
template['all_of'] = 'allof \n\r{\n\r#children#\n\r}\n\r';

template['tactic'] = 'actions { #children# }\n\r';
template['tactic_content'] = 'actions { #params# }\n\r';
template['conditions'] = 'condition { #params# }\n\r';

template['when'] = 'when { #params# }';
template['if'] = 'if { #params# }';
template['else'] = 'else { #params# }';


var codeString = "";
var parentString = "";
var childString = "";


function getParamString(codename, params) {

    var str = '';

    switch (codename) {
        case 'for_event':
            var val1 = $(params).children('.sel_params').val();
            //val1 = isNaN(val1) ? ('"' + val1 + '"') : val1;
            str = "'" + val1 + "'";
            break;

        case 'campaign':
            break;

        case 'no_event':
            break;

        case 'any_of':
            break;


        case 'all_of':
            break;

        case 'tactic':
                //str = 'assign tacticId: ' + $(params).find('input').val();
            var val2 = $(params).find('input').val();
            val2 = isNaN(val2) ? ( "'" + val2 + "'" ) : val2;
            str = $(params).find('select').eq(0).val() + ' ' + $(params).find('select').eq(1).val() + ' ' + val2;
            break;

        case 'tactic_content':
            var val3 = $(params).find('input').val();
            val3 = isNaN(val3) ? ("'" + val3 + "'") : val3;    
            str = $(params).find('select').eq(0).val() + ' ' + $(params).find('select').eq(1).val() + ' : ' + val3;
            break;

        case 'conditions':
            //console.log($(params).find('select'));
            var val4 = $(params).find('input').val();
            val4 = isNaN(val4) ? ("'" + val4 + "'") : val4;    
            str = $(params).find('select').eq(0).val() + ' ' + $(params).find('select').eq(1).val() + ' ' + val4;
            break;

        case 'when':
            break;

        case 'if':
            break;

        case 'else':
            break;

        default:
            break;
    }

    return str;
}

var level1String = '';
var level2String = '';
var level3String = '';


function getCodeString(obj){

    var tpl1 = '';
    $('div#canvas > div.element').each(function(){
        
        var codename1 = $(this).attr('codename');
        var params1 = $(this).children('span.el_span');
        var paramstring1 = getParamString(codename1, params1);

        tpl1 = template[codename1].replace('#params#', paramstring1);


        //Process level 2 children
        var child2 = $(this).children('div.element');
        var tpl2 = '';
        child2.each(function(){
            var codename2 = $(this).attr('codename');
            var params2 = $(this).children('span.el_span,div.el_select');
            var paramstring2 = getParamString(codename2, params2);
            var template2 = template[codename2];
            if (template2.indexOf('{\n\r') != -1){
                template2 = template[codename2].replace(/}/g, '\t}');
                template2 = template2.replace(/{/g, '\t{');
            }
            
            tpl2 += '\t' + template2.replace('#params#', paramstring2);
            

            //Process level 3 children
            var child3 = $(this).children('div.element');
            var tpl3 = '';
            child3.each(function(){
                var codename3 = $(this).attr('codename');
                var params3 = $(this).children('span.el_span,div.el_select');
                var paramstring3 = getParamString(codename3, params3);

                tpl3 +=  '\t\t' + template[codename3].replace('#params#', paramstring3);
            });
            tpl2 =  tpl2.replace('#children#', tpl3);
            


        });
        level1String += tpl1.replace('#children#', tpl2);
        //console.log(level1String);

        //level1String += tpl1;
    });

    return level1String;
}
/*
function getCodeString(obj) {
    for (var key in obj) {
        if (obj[key].attr != undefined && (obj[key].attr.class == 'element' || obj[key].attr.class[1] == 'element')) {

            // Create current template
            var pLabel = obj[key].attr.codename;
            var pTemplate = template[pLabel];

            // Replace Parameter in current template
            if (obj[key].child[0] && (obj[key].child[0].attr.class == 'el_span' || obj[key].child[0].attr.class == 'el_select')) {
                var paramSpan = obj[key].child[0];
                var paramString = getParamString(paramSpan, pLabel);
                pTemplate = pTemplate.replace('#params#', paramString);
                //console.log(paramString);
                //codeString = codeString.replace('#children#', pTemplate);
                //Assign to global string variable
                //tempStr += pTemplate + ' ';
            }

            var children = obj[key].child;
            var c1String = '';
            for (var key in children) {
                if (children[key].attr.class == 'element') {
                    var c1Label = children[key].attr.codename;
                    var c1Template = template[c1Label];
                    

                    if (children[key].child[0] && (children[key].child[0].attr.class == 'el_span' || children[key].child[0].attr.class == 'el_select')) {
                        var c1paramSpan = children[key].child[0];
                        var c1paramString = getParamString(c1paramSpan, c1Label);
                        c1Template = c1Template.replace('#params#', c1paramString);
                        
                    }
                    c1String += c1Template;

                    //CHILD LEVEL 2    
                        var children2 = children[key].child;
                        var c2String = '';
                        for (var key in children2) {
                            if (children2[key].attr.class == 'element') {
                                var c2Label = children2[key].attr.codename;
                                var c2Template = template[c2Label];


                                if (children2[key].child[0] && (children2[key].child[0].attr.class == 'el_span' || children2[key].child[0].attr.class == 'el_select')) {
                                    var c2paramSpan = children2[key].child[0];
                                    var c2paramString = getParamString(c2paramSpan, c2Label);
                                    c2Template = c2Template.replace('#params#', c2paramString);

                                }
                                c2String += c2Template;


                            }
                            
                        }
                    c1String = c1String.replace('#children#', c2String);
                }
                
                console.log(c1String);
            }

            pTemplate = pTemplate.replace('#children#', c1String);
        }
        codeString += pTemplate;
    }

    return codeString;
}
*/
/*
function getCodeString(obj) {
    var tempStr = '';
    for (var key in obj) {
        
        if (obj[key].attr != undefined && (obj[key].attr.class == 'element' || obj[key].attr.class[1] == 'element')) {
            // Create current template
            var pLabel = obj[key].attr.codename;
            var pTemplate = template[pLabel];

            


            // Replace Parameter in current template
            if (obj[key].child[0] && (obj[key].child[0].attr.class == 'el_span' || obj[key].child[0].attr.class == 'el_select')){
                var paramSpan = obj[key].child[0];
                var paramString = getParamString(paramSpan, pLabel);
                pTemplate = pTemplate.replace('#params#', paramString);
                //console.log(paramString);
                //codeString = codeString.replace('#children#', pTemplate);
                //Assign to global string variable
                //tempStr += pTemplate + ' ';
            }
            
            
            tempStr += pTemplate;
            console.log('codeString:', tempStr);
            codeString = codeString.replace('#children#', pTemplate);


            // Loop and replace children
            // var children = obj[key].child;
            // for( var ckey in children ){

            // }
            getCodeString(obj[key].child);

        }
        
        // codeString = codeString.replace('#children#', tempStr);
        // codeString = codeString.replace;
        
    }
    
    return codeString;
}
*/
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



$(function () {
    $('div#canvas').on("change", "select", function () {
        var val = $(this).val();
        $(this).attr('value', val);
    });
    $('div#canvas').on("keyup", "input", function () {
        var val = $(this).val();
        $(this).attr('value', val);
    });

    $('.left-block h2').click(function(){
        $(this).toggleClass('up');
        $(this).next('ul').slideToggle('fast');
    });
});
