controls = {
	maxSpeed: 1/2,
	accel: 1/6
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
    		controls.maxSpeed = ui.value;
    		$(event.target).closest("li").find("span").html(ui.value);
    	} 
    });
});
