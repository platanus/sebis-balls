controls = {
	maxSpeed: 130,
	accel: 5,
    radius: 150
};

$(function() {
    $( ".slider.speed" ).slider({ min: 0, max: 400, value: controls.maxSpeed,
    	change: function( event, ui ) {
    		controls.maxSpeed = ui.value;
    		$(event.target).closest("li").find("span").html(ui.value);
    	} 
    });

    $( ".slider.accel" ).slider({ min: 0, max: 100, value: controls.accel,
    	change: function( event, ui ) {
    		controls.accel = ui.value;
    		$(event.target).closest("li").find("span").html(ui.value);
    	} 
    });
    $( ".slider.radius" ).slider({ min: 0, max: 500, value: controls.radius,
        change: function( event, ui ) {
            controls.radius = ui.value;
            $(event.target).closest("li").find("span").html(ui.value);
        } 
    });
});
