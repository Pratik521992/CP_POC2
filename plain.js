$(document).ready(function(){
   
    $("a").addClass( 'btn btn-success' );
    
    $("a").hover(function(){
        
        $(this).css("background-color", "green");
        }, function(){
        $(this).css("background-color", "#00b33c");
        
    });


});