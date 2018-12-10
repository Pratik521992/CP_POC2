
function getdata(doc) {

   
    let canvas = doc.getElementById('canvas');
    var children = canvas.childNodes;
 
    for (child in children) {
        if(typeof children[child].innerText !== 'undefined'){
            var element = document.getElementById("forOutput");
        
            if((children[child].textContent).includes('for_event')){

            var para = document.createElement("p");
            var node = document.createTextNode(createforloop(children[child]));
            para.appendChild(node);
            element.appendChild(para);
            text = text + `
            ${(createforloop())}
            `;
            

         }
       
         if((children[child].textContent).includes('any_of')||(children[child].textContent).includes('all_of')){
            var para = document.createElement("p");
            
            text = text+`
            ${(createcode(children[child],'any_of'))}
            `;
            var node = document.createTextNode(createcode(children[child],'any_of'));
            para.appendChild(node);
            
            element.appendChild(para);
            
        }
         if((children[child].textContent).includes('tactic_content')){

            var para = document.createElement("p");
            
            
            var node = document.createTextNode(createcode(children[child],'actions'));
            para.appendChild(node);
            element.appendChild(para);
            text = text +(createcode(children[child],'actions'))
            
        }
     
    } 
    }

}

function createforloop(){
    
    return ( `forEvents ([‘${document.getElementById('Selectfor').value}’]) { `);
}

function createcode(any,type){
   
    var children = any.childNodes;
    var returnValue = '';
    let name, sign, value;

   for (var i = children.length-1;i>1;i--){

    if(((children[i].textContent).includes('any_of')||(children[i].textContent).includes('all_of'))===false)
    {
        if((children[i] !== 'undefined')){
            name = (children[i].childNodes[1].childNodes[1].value);
            sign = (children[i].childNodes[1].childNodes[2].value);
            value = (children[i].childNodes[1].childNodes[3].childNodes[0].value);
            returnValue = returnValue + `
            condition : { ${name} ${sign} ${value}}
            `
        }
    }
    else {
        console.log(children[i].childNodes)
    }
    }
    if(type === 'actions'){
        return `${type} {
            ${returnValue}
        }
    }`
    }
    else{
    return `${type} {
        ${returnValue}
    }`;
}
    
}   



            
 
