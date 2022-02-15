const slider = document.getElementById("myRange");
const output = document.getElementById("slider-value");
const container = document.querySelector(".container");
const colorUserInput = document.querySelector("#dot-color");
const colorful = document.querySelector("#colorful");
const colorfulAlpha = document.querySelector("#colorful-alpha");
const greyscale = document.querySelector("#greyscale");
const random = document.querySelector("#random");
const eraser = document.querySelector("#eraser");
const reset = document.querySelector("#reset");

let userColor = "";
let newDiv = () => {
  let div = document.createElement("div");
  div.classList.add("grid-item");
  container.appendChild(div);
};

let newDivArray = (number) => {
  for (let i = 1; i <= number * number; i++) {
    newDiv();
  }
  container.style.setProperty(
    "--columns",
    Math.ceil(Math.sqrt(container.children.length))
  );
};

let deleteDivArray = () => {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
};

newDivArray(slider.value);

output.textContent = `${slider.value} x ${slider.value}`;

slider.oninput = function () {
  output.textContent = `${this.value} x ${this.value}`;
  deleteDivArray();
  newDivArray(this.value);
  divArray = document.querySelectorAll(".grid-item");
  drawingLoop();
};

const getRandomColor = () => {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
};

const getRandomColorAlpha = () => {
  let r = () => (Math.random() * 256) >> 0;
  let a = () => Math.random() * 0.5;
  let alphaColor = `rgb(${r()}, ${r()}, ${r()}, ${a()})`;
  return alphaColor;
};

const getRandomGreyScale = () => {
  var v = ((Math.random() * 256) | 0).toString(16);
  return "#" + v + v + v;
};

colorUserInput.oninput = function () {
  userColor = this.value;
  method = userColor;
  drawingLoop();
};

let isDrawing = false;
let divArray = document.querySelectorAll(".grid-item");
let method;

colorful.addEventListener("click", (e) => {
  method = "colorful";
});
colorfulAlpha.addEventListener("click", (e) => {
  method = "colorfulAlpha";
});

greyscale.addEventListener("click", (e) => {
  method = "greyscale";
});

random.addEventListener("click", (e) => {
  method = getRandomColor();
});

eraser.addEventListener("click", (e) => {
  method = "white";
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

reset.addEventListener("click", (e) => {
  for (let i = 0; i < divArray.length; i++) {
    clearColor(i);
  }
  function clearColor(i) {
    setTimeout(function () {
      divArray[i].style.backgroundColor = "white";
    }, (500 / divArray.length) * i);
  }
  drawingLoop();
});

let draw = (i, method = getRandomColor()) => {
  divArray[i].style.backgroundColor = method;
};

let colorfulDraw = (i) => {
  divArray[i].style.backgroundColor = getRandomColor();
};

let colorfulAlphaDraw = (i) => {
  divArray[i].style.backgroundColor = getRandomColorAlpha();
};

let greyScaleDraw = (i) => {
  divArray[i].style.backgroundColor = getRandomGreyScale();
};

let drawingLoop = () => {
  for (let i = 0; i < divArray.length; i++) {
    divArray[i].addEventListener("mousedown", (e) => {
      isDrawing = true;
      if (method == "colorful") {
        colorfulDraw(i);
      }
      if (method == "colorfulAlpha") {
        colorfulAlphaDraw(i);
      }
      if (method == "greyscale") {
        greyScaleDraw(i);
      } else {
        draw(i, method);
      }
    });
  }
  for (let i = 0; i < divArray.length; i++) {
    divArray[i].addEventListener("mouseover", (e) => {
      if (isDrawing == true) {
        if (method == "colorful") {
          colorfulDraw(i);
        }
        if (method == "colorfulAlpha") {
          colorfulAlphaDraw(i);
        }
        if (method == "greyscale") {
          greyScaleDraw(i);
        } else {
          draw(i, method);
        }
      }
    });
  }
  for (let i = 0; i < divArray.length; i++) {
    divArray[i].addEventListener("mouseup", (e) => {
      if (isDrawing == true) {
        if (method == "colorful") {
          colorfulDraw(i);
        }
        if (method == "colorfulAlpha") {
          colorfulAlphaDraw(i);
        }
        if (method == "greyscale") {
          greyScaleDraw(i);
        } else {
          draw(i, method);
        }
        isDrawing = false;
      }
    });
  }
};
drawingLoop();
