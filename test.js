const canvas = document.getElementById("canvas");

// set assets/duck.png as the image source
const context = canvas.getContext("2d");


const widthHeight = 3.4

const duck = new Image();
duck.src = "assets/duck.png";

const hatImage = new Image();
hatImage.src = `assets/hats/cowboy.png`;
hatImage.onload = () => {
	hatWidth = hatImage.width / widthHeight;
	hatHeight = hatImage.height / widthHeight;
	context.drawImage(hatImage, 0, 0, hatWidth, hatHeight);
}

let hatWidth = 0;
let hatHeight = 0;


const drawDuck = () => {
	context.drawImage(duck, 0, 200, canvas.width, canvas.height - 200);
}

const drawHat = (x, y) => {

	//hatImage.onload = () => {
		context.drawImage(hatImage, x, y, hatWidth, hatHeight);
	//}
}

const draw = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawDuck()
	drawHat(0,0)
}

duck.onload = () => {
	draw()
}
let halt = false

//on mouse move move the hat to the mouse position on the canvas and set the x and y position of the hat to the mouse position
canvas.addEventListener("mousemove", (event) => {

	if(halt) return;

	// remove the hat
	context.clearRect(0, 0, canvas.width, canvas.height);
	// draw the duck
	drawDuck()

	const hatX = event.offsetX - hatImage.width / 4;
	const hatY = event.offsetY - hatImage.height / 4;

	//context.drawImage(hat, hatX, hatY, hat.width / 3, hat.height / 3);
	drawHat(hatX, hatY);

	// set id xcoord and ycoord to the mouse position
	document.getElementById("xcoord").innerHTML = hatX;
	document.getElementById("ycoord").innerHTML = hatY;

	document.getElementById("width").innerHTML = hatWidth;
	document.getElementById("height").innerHTML = hatHeight
})


document.addEventListener("keydown", (event) => {
	if(event.key === "h") {
		halt = !halt;
	}
})