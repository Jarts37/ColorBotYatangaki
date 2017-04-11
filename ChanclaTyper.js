function ChanclaTyper(X,Y,imge){
    //console.log("script loaded");
	
	var startX = X;
	var startY = Y;
	
	var image = new Image(); // or document.createElement('img'); 
	var arrzy
	image.onload = function(){
		console.log("AYAAAA INITIALIZING");
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		//alert(canvas.width +","+canvas.height);
		ctx.drawImage(image, 0, 0, image.width, image.height);
		
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);	
		var i;
		var temparray = [];
		for (i = 0; i < imgData.data.length; i += 4) {
			imgData.data[i] = imgData.data[i];
			imgData.data[i+1] = imgData.data[i+1];
			imgData.data[i+2] = imgData.data[i+2];
			imgData.data[i+3] = 255;
			
			temparray.push(RGBAtoPixel(imgData.data[i],imgData.data[i+1],imgData.data[i+2]));
		}
		
		// Tableau
		// height(lignes) puis width(colonnes)

		var appVar = [];
		var tempvar = [];
		var count = 0;
		for (l = 0; l < canvas.height ; l++)
		{
			tempvar = [];
			for (c = 0 ; c < canvas.width ; c++)
			{
				tempvar.push(temparray[count]);
				count++;
			}
			appVar.push(tempvar);
		}
		
		var script = document.createElement('script');
		script.src = "https://rawgit.com/Jarts37/ColorBotYatangaki/master/ColorWriter.js";
		script.onload = function () {
			ColorWriter(appVar,startX,startY);
		};
		document.head.appendChild(script);
		
		// TEST TABLEAU
		/*
		var arr =appVar,arrText='';

				for (var i = 0; i < arr.length; i++) {
					for (var j = 0; j < arr[i].length; j++) {
						arrText+=arr[i][j]+' ';
					}
					console.log(arrText);
					arrText='';
				}
		*/
		
	}
	image.crossOrigin = 'Anonymous';
	image.src = imge;
	
	function RGBAtoPixel(c1,c2,c3)
	{
		var finalcolor = 0;
		var colors = [
        [255,255,255],
        [228,228,228],
        [136,136,136],
        [34,34,34],
        [255,167,209],
        [229,0,0],
        [229,149,0],
        [160,106,66],
        [229,217,0],
        [148,224,68],
        [2,190,1],
        [0,211,221],
        [0,131,199],
        [0,0,234],
        [207,110,228],
        [130,0,128]
      ];
	  var colorLength = colors.length;
	  for (var i = 0; i < colorLength; i++) {
			if ((c1 > colors[i][0]-5 && c1 < colors[i][0]+5) && (c2 > colors[i][1]-5 && c2 < colors[i][1]+5) && (c3 > colors[i][2]-5 && c3 < colors[i][2]+5))
			{
				finalcolor = i;
			}
		}
		return finalcolor;
	}
}