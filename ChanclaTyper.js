function ChanclaTyper(X,Y,Image){
    //console.log("script loaded");
	
	var startX = X;
	var startY = Y;
	
	var image = new Image(); // or document.createElement('img'); 
	var arrzy
	image.onload = function(){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		alert(canvas.width +","+canvas.height);
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
		script.src = "https://cdn.rawgit.com/Jarts37/ColorBotYatangaki/f514a3fe/ColorWriter.js";
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
	image.src = Image;
	
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
			if (c1 == colors[i][0] && c2 == colors[i][1] && c3 == colors[i][2])
			{
				finalcolor = i;
			}
		}
		return finalcolor;
	}
}