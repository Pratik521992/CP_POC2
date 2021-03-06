
function dropdown(type){
    var sel = document.createElement('select');
    sel.name = 'dropfor';
    sel.id = 'Selectfor';
    sel.className = 'sel_params';

    
    var inputs = null;
    switch(type){
        case "for":{ inputs = ['article', 'email', 'ipp', 'cme', 'headline', 'impr', 'infosite', 'partner', 'pla', 'scene', 'search', 'social mtv', 'offline']; }break;
        case "condition_main" : inputs = ["a.tacticId", "a.times", "p.professionId", "p.country", "p.specialityId", "p.occupationId", "a.leadspec", "a.within", "a.channel", "a.activityName", "a.exp"];break;
        case "condition_operator" : inputs = ['==', '!=', '>', '<', ':'];break;
        case "tactic_value" : inputs = ['assign', 'stop'];break;
        case "colon": inputs = [':']; break;
        case "action": inputs = ['tacticId']; break;
    }
    
    var options_str = "";

    inputs.forEach(function (inputs) {
        options_str += '<option value="' + inputs + '">' + inputs + '</option>';
    });

    sel.innerHTML = options_str;
    
    return sel;
    
}