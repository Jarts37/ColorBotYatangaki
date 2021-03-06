function ColorWriter(tab,startX,startY){
    //console.log("script loaded");
	
	imageData = tab;
var taskQueue = [];
var taskIndex = 0;
 
var x = startX //STARTING POSITION X
var y = startY //STARTING POSITION Y
 
function generateTasks(){
    taskQueue = [];
    for(var rowIndex = 0; rowIndex < imageData.length; rowIndex++){
        var row = imageData[rowIndex];
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++){
            var dx = x + (columnIndex || 0);
            var dy = y + (rowIndex || 0);
            var pixel = ctx.getImageData(dx, dy, 1, 1).data;
            if(colors.indexOf("rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")") != row[columnIndex]) {
                //console.log(dx, dy, pixel);
                taskQueue.push([
                    dx,
                    dy,
                    (function(dx, dy, c) {
                        return function() {
							console.log("Pixel posé en " + dx + ":" +dy);
                            tryColorPixel(dx, dy, c);
                        }
                    })(dx, dy, row[columnIndex])
                ]);
            }
        }
    }
    shuffle(taskQueue);
}
setInterval(function(){
    if(taskQueue.length > 0){
        if(taskIndex < taskQueue.length ){
            var task = taskQueue[taskIndex];
            if(typeof task[2] == "function"){
                task[2]();
 
            }
            taskIndex++;
        } else {
            taskIndex = 0;
            //console.log("LETS CHANGE THIS SHIT TO 0:0");
			// Test #12 - fonction utilisé pour spammé un motif depuis l'origine une fois l'endroit terminé => bulldozer sans protection.
			// Réactivé cette fonction si le but est de spammé sur la map.
			/*
            y = y + imageData.length;		
            if(y < 999){
                y = 0;
                x += imageData[0].length;
                if(x < 999)
                    x = 0;
            }
			*/
            generateTasks();
        }
    }
    else {
        generateTasks();
    }
}, 5000); // testing default : 5000
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
generateTasks();
}
