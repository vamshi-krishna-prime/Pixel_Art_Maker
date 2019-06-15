
const canvasSize = 500; // the size of the canvas defined in style.css
const cellColor = '#f0f2f5';

let resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', resetGrid);

let chngColorBtn = document.getElementById('color-btn');
chngColorBtn.addEventListener('click', randomColor);

let gridSizeBtn = document.getElementById('gridsize-btn');
gridSizeBtn.addEventListener('click', eraseGrid);

let colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('click', changeColor);

let mouseover = document.getElementById('mouse-hover');
mouseover.addEventListener('click', function() {hoverColor(1)});

let mouseClick = document.getElementById('click-effect');
mouseClick.addEventListener('click', function() {hoverColor(0)});

// let mouseHover = document.getElementById('mouse-hover');
// mouseHover.addEventListener("click", function() {
//     toggleButtons(1);
// });

// let mouseClick = document.getElementById('click-effect');
// mouseClick.addEventListener("click", function() {
//     toggleButtons(0);
// });

let toggler = document.querySelector('.switch');
console.log(toggler);
toggler.addEventListener('toggle', hoverColor);


function createCanvas(){
	const container = document.getElementById('canvas');
	const canvas = document.createElement('div');
	canvas.classList.add('canvas');
	container.appendChild(canvas);
  // const gridHeight = document.getElementById("input_height").value;
  // const gridWidth = document.getElementById("input_width").value;

  const gridHeight = $("#input_height").val();
  const gridWidth = $("#input_width").val();

  const submitButton = document.querySelector('input[type=submit]');
  submitButton.addEventListener('click', function () {
    console.log('The submit was clicked!');
    console.log(gridHeight);
    console.log(gridWidth);
  });

	for (let i=0; i<(gridHeight*gridWidth); i++){

		const cellHeight = canvasSize / gridHeight; // define the height and width of each individual cell, based on the number of cells and canvasSize.
    const cellWidth = canvasSize / gridWidth; // define the height and width of each individual cell, based on the number of cells and canvasSize.

		const cell = document.createElement('div');
		cell.style.height = `${cellHeight}px`; // create element cell and set the cell height in px
		cell.style.width = `${cellWidth}px`; // set the cell width in px
		console.log(cell.style.height);
    console.log(cell.style.width);
		cell.classList.add('cell'); // add the .cell class to the cell div
		canvas.appendChild(cell); // add the cell div to the canvas div

		// cell.addEventListener("mouseover", ()=>{
		// 	cell.setAttribute("class", "colorCell");
		// }); // on mouse over, set the class of the cell div to .colorCell

    cell.addEventListener("click", ()=>{
      // cell.setAttribute("class", "cell");
      cell.style.backgroundColor = 'black';
      cell.style.border = "thin solid white";
		});

	}
}



function deleteCanvas(){
	$(".canvas").remove();
}


function resetGrid(){
	const cell = document.querySelectorAll('.colorCell, .cell'); // get all cells where the class has been changed to .colorCell
	cell.forEach(cell => {
		cell.setAttribute("class", "cell"); // set the class to .cell.
		cell.style.backgroundColor = cellColor; // set background color for these cells back to the default color.
    cell.style.border = "thin solid black";

	});
}

function randomNumber(){
	//generate random number between 0 and 255, this number will later on represent an RGB value.
	return Math.floor(Math.random() * 256);
}

function randomColor(){
	const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
    let rColor = randomNumber();
  	let gColor = randomNumber();
  	let bColor = randomNumber();
		cell.style.backgroundColor = `rgb(${rColor},${gColor},${bColor}`;
		cell.style.border = "thin solid white";
		// cell.setAttribute("class", "colorCell");
		});
	});
}


function changeColor(){
  const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
      let selectedColor = colorPicker.value;
      console.log(selectedColor);
      cell.style.backgroundColor = selectedColor;
      cell.style.border = "thin solid white";
		});
	});
    // cell.setAttribute("class", "cell");
  };



function hoverColor(effectToggle){
  const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
    // var effect = function(cell){
    function effect() {
      let selectedColor = colorPicker.value;
      console.log(selectedColor);
      cell.style.backgroundColor = selectedColor;
      cell.style.border = "thin solid white";

    }
    if (effectToggle == 1){
      console.log("mouseover activated");
      cell.addEventListener("mouseover", effect);
    } else {
      console.log("mouseover removed");
      cell.removeEventListener("mouseover", effect);
      cell.addEventListener("click", effect);
    }

  });
    // cell.setAttribute("class", "cell");
  };

// try 1
//
// var toggleButtons = function(toggleVal, button) {
//     var activateColor, clickHandler, hoverHandler;
//
//     // callback function for listener bellow
//     activateColor = function() {
// 			const cell = document.querySelectorAll('.cell, .colorCell');
// 			cell.forEach(cell => {
// 				cell.addEventListener("click", () =>{
// 		      let selectedColor = colorPicker.value;
// 		      console.log(selectedColor);
// 		      // if (selectedColor == undefined){selectedColor = 'red';console.log(selectedColor);}
// 		      cell.style.backgroundColor = selectedColor;
// 		      cell.style.border = "thin solid white";
// 				});
// 			});
//     };
//
// 		activateHover = function() {
// 			const cell = document.querySelectorAll('.cell, .colorCell');
// 			cell.forEach(cell => {
// 				cell.addEventListener("mouseover", () =>{
// 		      let selectedColor = colorPicker.value;
// 		      console.log(selectedColor);
// 		      cell.style.backgroundColor = selectedColor;
// 		      cell.style.border = "thin solid white";
// 				});
// 			});
//     };
//
//     hoverHandler = function() {
//         button.addEventListener("click", activateHover);
//     };
//     clickHandler = function() {
//         button.removeEventListener("click", activateHover);
// 				// button.addEventListener("click", activateColor);
//     };
//
//     // when first argument is 1, make the button functional, otherwise disable its functionality
//     if (toggleVal === 1) {
//         hoverHandler();
// 				// activateHover();
//     } else {
//         clickHandler();
// 				// activateColor();
//     }
// };
//

// try 2


var toggleButtons = function(toggleVal) {

  var activateColor = function(cell){
    let selectedColor = colorPicker.value;
    console.log(selectedColor);
    cell.style.backgroundColor = selectedColor;
    cell.style.border = "thin solid white";
  }

  const cell = document.querySelectorAll('.cell, .colorCell');
  if (toggleVal === 1) {
    cell.forEach(cell => {
      cell.addEventListener("mouseover", activateColor(cell));
    });
  } else {
    cell.forEach(cell => {
      cell.removeEventListener("mouseover", activateColor(cell));
      cell.addEventListener("mouseover", activateColor(cell));
    });
  }
}












// /////////////////////////////


function eraseGrid(){
  const cell = document.querySelectorAll('.cell, .colorCell');
	cell.forEach(cell => {
		cell.addEventListener("click", () =>{
      cell.style.backgroundColor = cellColor;
      cell.style.border = "thin solid black";
		});
	});
}


$("#sizePicker").submit(function(event) {
  event.preventDefault();
	deleteCanvas();
  createCanvas();
});
