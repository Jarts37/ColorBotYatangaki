function ColorWriter(tab,startX,startY){
    console.log("citron");
	
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
                console.log(dx, dy, pixel);
                taskQueue.push([
                    dx,
                    dy,
                    (function(dx, dy, c) {
                        return function() {    
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
            console.log("a");
            y = y + imageData.length;
            if(y < 999){
                y = 0;
                x += imageData[0].length;
                if(x < 999)
                    x = 0;
            }
            generateTasks();
        }
    }
    else {
        generateTasks();
    }
}, 5000);
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}
generateTasks();
}
