const assets = {
	hats: [
		{
			name: "cowboy",
			x: 54,
			y: 45,
			width: 211,
			height: 148
		},
		{
			name: "tophat",
			x: 107,
			y: 34,
			width: 178,
			height: 164
		},
		{
			name: "helmet",
			x: 55,
			y: 63,
			width: 196,
			height: 143
		},
		{
			name: "cap",
			x: -2,
			y: 30,
			width: 290,
			height: 195
		}
	],
	face: [
		{
			name: "glasses",
			x: 37.5,
			y: 135.75,
			width: 187,
			height: 89
		},
		{
			name: "sunglasses",
			x: 28,
			y: 118,
			width: 216,
			height: 129
		}
	],
	extras: [
		{
			name: "laptop",
			x: 147,
			y: 301,
			width: 169,
			height: 112
		},
		{
			name: "coffee",
			x: 183,
			y: 257,
			width: 160,
			height: 160
		}
	]
}


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const duck = new Image();
duck.src = "assets/duck.png";

let hatIndex = assets.hats.length > 0 ? Math.random() * assets.hats.length | 0 : -1
let faceIndex = assets.face.length > 0 ? Math.random() * assets.face.length | 0 : -1
let extraIndex = assets.extras.length > 0 ? Math.random() * assets.extras.length | 0 : -1


const hatImage = new Image(),
	extrasImage = new Image(),
	faceImage = new Image();


const drawDuck = () => {
	return new Promise((resolve, _) => {
		context.drawImage(duck, 0, 100, canvas.width, canvas.height - 100);
		resolve();
	})
}

const drawExtra = () => {
	return new Promise((resolve, _) => {

		if(extraIndex === -1) resolve();

		const extra = assets.extras[extraIndex];
		extrasImage.src = `assets/extras/${extra.name}.png`;

		extrasImage.onload = () => {
			context.drawImage(extrasImage, extra.x, extra.y, extra.width, extra.height);
			resolve();
		}
	})
}

const drawFace = () => {
	return new Promise((resolve, _) => {

		if(faceIndex === -1) resolve();

		const face = assets.face[faceIndex];
		faceImage.src = `assets/face/${face.name}.png`;

		faceImage.onload = () => {
			context.drawImage(faceImage, face.x, face.y, face.width, face.height);
			resolve();
		}
	})
}

const drawHat = () => {
	return new Promise((resolve, _) => {

		if(hatIndex === -1) resolve();

		const hat = assets.hats[hatIndex];
		hatImage.src = `assets/hats/${hat.name}.png`;

		hatImage.onload = () => {
			context.drawImage(hatImage, hat.x, hat.y, hat.width, hat.height);
			resolve();
		}
	})
}

const draw = async () => {
	//context.clearRect(0, 0, canvas.width, canvas.height);

	// set canvas background color to #f7f7f7
	context.fillStyle = "#f7f7f7";
	context.fillRect(0, 0, canvas.width, canvas.height);

	await drawDuck()
	await drawExtra()
	await drawFace()
	await drawHat()
}

duck.onload = () => {
	draw()
}

document.addEventListener("keydown", (event) => {
	//if key is left arrow increment hatIndex by 1, if hatIndex is greater than the length of the hats array set hatIndex to 0
	if(event.key === "ArrowLeft") {
		hatIndex++
		if(hatIndex > assets.hats.length - 1) {
			hatIndex = 0;
		}
	}
	//if key is right arrow decrement hatIndex by 1, if hatIndex is less than 0 set hatIndex to the length of the hats array minus 1
	else if(event.key === "ArrowRight") {
		hatIndex--
		if(hatIndex < 0) {
			hatIndex = assets.hats.length - 1;
		}
	}else {
		return;
	}
	//set pickedHat to the hat object at the index of hatIndex
	pickedHat = assets.hats[hatIndex]
	draw()
})
