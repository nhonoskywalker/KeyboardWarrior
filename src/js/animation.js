$(document).ready(function(){
    //------------------------------ui-control-play
    $("#ui-control-play").click(function() {
               
        $( "#ui-control-play" ).parent().animate({
            backgroundColor: "rgb(139, 127, 112, 0.5)"
        }, 250, function() {
            $( "#ui-control-play" ).parent().animate({
                backgroundColor: "rgb(0, 0, 0, 0)"
        }, 250);
        });
    });
    $( "#ui-control-play" ).click(function() {
        $( "#ui-control-play" ).animate({
            opacity: 0.5,
            fontSize: ["45px","swing"]
        }, 250, function() {
            //on animation complete
            if($("#ui-control-play").hasClass("ion-ios-play-outline")){
                $("#ui-control-play").removeClass("ion-ios-play-outline");
                $("#ui-control-play").addClass("ion-ios-pause-outline");
            }
            else{
                $("#ui-control-play").removeClass("ion-ios-pause-outline");
                $("#ui-control-play").addClass("ion-ios-play-outline");
            }
            $("#ui-control-play").animate({
                opacity: 1,
                fontSize: ["50px","swing"]
            },250);
        
            
        });
    });
    
    //------------------------------ui-control-volume
    $("#ui-control-volume").click(function() {
       
       $( "#ui-control-volume" ).parent().animate({
             backgroundColor: "rgb(139, 127, 112, 0.5)"
       }, 250, function() {
           $( "#ui-control-volume" ).parent().animate({
               backgroundColor: "rgb(0, 0, 0, 0)"
       }, 250);
       });
    });
    $( "#ui-control-volume" ).click(function() {
       $( "#ui-control-volume" ).animate({
           opacity: 0.5,
           fontSize: ["45px","swing"]
       }, 250, function() {
           //on animation complete
           if($("#ui-control-volume").hasClass("ion-ios-volume-high")){
               $("#ui-control-volume").removeClass("ion-ios-volume-high");
               $("#ui-control-volume").addClass("ion-ios-volume-low");
           }
           else{
               $("#ui-control-volume").removeClass("ion-ios-volume-low");
               $("#ui-control-volume").addClass("ion-ios-volume-high");
           }
           $("#ui-control-volume").animate({
               opacity: 1,
               fontSize: ["50px","swing"]
           },250);
       
           
       });
    });
});
