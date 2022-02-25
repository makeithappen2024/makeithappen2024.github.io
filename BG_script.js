////---------Cashing default elements//---------
const body = document.querySelector("body");
const container = document.querySelector(".container");
const twoThree = document.querySelector(".twoThree");
const colorPickers = document.querySelector(".colorPickers");


//---------Cashing primary buttons---------
const buttonTwo = document.querySelector(".buttonTwo");
const buttonThree = document.querySelector(".buttonThree");
const buttonLinear = document.querySelector(".buttonLinear");
const buttonRadial = document.querySelector(".buttonRadial");


//---------Cashing secondary buttons---------
//---------Cashing colorPickers---------
let input1 = document.createElement("input");
input1.setAttribute("type","color");
input1.setAttribute("value","#82dce8");
input1.className = "colorPicker";
let input2 = document.createElement("input");
input2.setAttribute("type","color");
input2.setAttribute("value","#f09347");
input2.className = "colorPicker";
let input3 = document.createElement("input");
input3.setAttribute("type","color");
input3.setAttribute("value","#fd8aff");
input3.className = "colorPicker";
//---------Cashing randomizer---------
const randomizer = document.createElement("button");
randomizer.className = "randomizer";
//---------Cashing hexReference---------
const hexReferences = document.querySelector(".hexReferences");
let hexFirstColor = document.createElement("h5");
let hexSecondColor = document.createElement("h5");
let hexThirdColor = document.createElement("h5");


//---------Creating pickers & randomizer---------
const createDoubleSetButtons = () => {  //какие функции нельзя задавать через const? Те, где возвращаются разные значения? И что по умолчанию оправданнее стратегически - стремиться делать максимум const где уверен, что можешь?
	twoThree.appendChild(input1);
	twoThree.appendChild(input2);
	if (twoThree.children.length > 2){
		twoThree.removeChild(input3);
		hexReferences.removeChild(hexThirdColor);
	}
	createRandomizer();
	renderLinearOrRadialBackground();
}

const createTripleSetButtons = () => {
	createDoubleSetButtons();
	twoThree.appendChild(input3);
	createRandomizer();
	renderLinearOrRadialBackground();
}

const createRandomizer = () => {
	colorPickers.appendChild(randomizer);
	randomizer.textContent = "Generate it!";
}


//---------Rendering background---------
let generateColor = () => {
	let symbols = "0123456789abcdef"
	var color = "#"; //почему нельзя задать через let/const?
	for(let i =0; i<6; i++){
		var color = color + symbols[Math.floor(Math.random()*16)];} 
	return color;
}

const coloringPickers = () => {
	if (twoThree.children.length > 2){
	input1.value = generateColor();
	input2.value = generateColor();
	input3.value = generateColor();
	} else{	input1.value = generateColor();
	input2.value = generateColor();
}
	renderLinearOrRadialBackground();
}

const renderLinearBackground = () => {
	if (twoThree.children.length > 2){
	body.style.background = "linear-gradient(to right,"  
	+input1.value
	+"," 
	+input2.value 
	+","
	+input3.value	
	+")";
	}
	else{body.style.background = "linear-gradient(to right,"  
	+input1.value
	+"," 
	+input2.value 
	+")";	
	}
	createHexReference(); 
}

const renderRadialBackground = () => {
	if (twoThree.children.length > 2){
	body.style.background = "radial-gradient(circle at center,"  
	+input1.value
	+" 0," 
	+input2.value 
	+" 35%,"
	+input3.value	
	+" 100%)";
	}
	else{body.style.background = "radial-gradient(circle at center,"  
	+input1.value
	+" 0," 
	+input2.value 
	+" 100%";
	}
	createHexReference(); 
}

const renderLinearOrRadialBackground = () => {
	if (buttonRadial.getAttribute("name") === "active"){
		renderRadialBackground();
	}else{renderLinearBackground()
	}
}
//---------Setting tooglers for Linear or Radial rendering//---------
const activateLinearRendering = () => {
	buttonLinear.setAttribute("name", "active");
	buttonLinear.classList.add("buttonLinearFocus");
	renderLinearBackground();
	if (buttonRadial.getAttribute("name") === "active"){
		buttonRadial.removeAttribute("name");
	}
}

const activateRadialRendering = () => {
	buttonRadial.setAttribute("name", "active");
	renderRadialBackground();
	if (buttonLinear.getAttribute("name") === "active"){
		buttonLinear.removeAttribute("name");
	}
}

//---------Setting CLICKABLE hex text at the bottom section//---------
const createHexReference = () => {
	hexReferences.appendChild(hexFirstColor);
	hexFirstColor.textContent = input1.value;
	hexReferences.appendChild(hexSecondColor);
	hexSecondColor.textContent = input2.value;
	 	if (twoThree.children.length > 2){
	 	hexReferences.appendChild(hexThirdColor);
		hexThirdColor.textContent = input3.value;
	}
}
const copyHexFirstColor = () => {
  navigator.clipboard.writeText(hexFirstColor.textContent);
  popupHexCopied();
}
const copyHexSecondColor = () => {
  navigator.clipboard.writeText(hexSecondColor.textContent);
  popupHexCopied();
}
const copyHexThirdColor = () => {
  navigator.clipboard.writeText(hexThirdColor.textContent);
  popupHexCopied();
}

//попАп нужен кк тут colorpicker.io, когда жмешь на #блок: чтобы появлялся и пропадал. Тут он вписывается в html и удаляется из него через 3-4 сек, реализовано явно в JS + вижу, что они подгружают картинку в попАп - это наверное средствами DOM не делают?
const popupHexCopied = () => {
	let popupHexCopiedText = document.createElement("h6");
	container.appendChild(popupHexCopiedText);
	popupHexCopiedText.classList.add("popupHexCopied");
	popupHexCopiedText.textContent = "Copied!";
	removeExtraHexCopied();
}

const removeExtraHexCopied = () => {
	let removeExtraHexCopied = document.querySelectorAll(".popupHexCopied"); //Почему консоль НЕ ВИДИТ значение этой переменной? Оно же задано в родительской функции popupHexCopied.  
	if (removeExtraHexCopied.length > 1){
		container.removeChild(popupHexCopiedText);
	}
	console.log(removeExtraHexCopied);
}


//---------Configuring Randomizer---------
// let twoOrThree = document.getElementsByClassName("twoThree")[0].childElementCount; - just another form for getting this .length
var twoOrThree = twoThree.children.length;//почему переменная не берет это значение????????????
const launchRandomizer = () => {
	coloringPickers();
	createHexReference();
}


//---------Listening to primary buttons---------
buttonTwo.addEventListener("click", createDoubleSetButtons);
buttonThree.addEventListener("click", createTripleSetButtons);
buttonLinear.addEventListener("click", activateLinearRendering);
buttonRadial.addEventListener("click", activateRadialRendering);


//---------Listening to secondary buttons---------
input1.addEventListener("input", renderLinearOrRadialBackground);
input2.addEventListener("input", renderLinearOrRadialBackground);
input3.addEventListener("input", renderLinearOrRadialBackground);
randomizer.addEventListener("click", launchRandomizer);

hexFirstColor.addEventListener("click", copyHexFirstColor); //как наложить listener сразу на группу из трех объектов, но чтобы слушало в итоге индивидуально каждого?
hexSecondColor.addEventListener("click", copyHexSecondColor);
hexThirdColor.addEventListener("click", copyHexThirdColor);