const draggables = document.querySelectorAll(".draggables");
const container = document.querySelector(".container");
const resizers = document.querySelectorAll(".resizer");
console.log(draggables);
const growBtn = document.getElementById("growBtn");
growBtn.addEventListener("click", growContainer);

let isResizing = false;
// el.addEventListener("mousedown", mousedown);

dragElements();
function dragElements() {
  for (let draggable of draggables) {
    draggable.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      console.log(e.target);
      let classNames = e.target.classList.value;
      // let currentBlock = e.target;
      // currentBlock.classList.add("current");
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      let prevX = e.clientX;
      let prevY = e.clientY;
      function mousemove(e) {
        if (!isResizing) {
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;

          const rect = draggable.getBoundingClientRect();
          draggable.style.left = rect.left - newX + "px";
          draggable.style.top = rect.top - newY + "px";

          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
      function mouseup() {
        const rect = draggable.getBoundingClientRect();
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    }
  }
}

resizing();
function resizing() {
  for (let resizer of resizers) {
    resizer.addEventListener("mousedown", mousedown);

    let currentResizer;

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;
      let prevX = e.clientX;
      // let prevY = e.clientY;
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        console.log("moving");

        console.log(currentResizer.parentNode);
        const rect = currentResizer.parentNode.getBoundingClientRect();
        if (currentResizer.classList.contains("e")) {
          currentResizer.parentNode.style.width =
            rect.width - (prevX - e.clientX) + "px";
          // el.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("w")) {
          currentResizer.parentNode.style.width =
            rect.width + (prevX - e.clientX) + "px";
          currentResizer.parentNode.style.left =
            rect.left - (prevX - e.clientX) + "px";
        }

        prevX = e.clientX;
        //   prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
      }
    }
  }
}

const exportButton = document.getElementById("export");
exportButton.addEventListener("click", exportDetail);

function exportDetail(e) {
  e.preventDefault();
  let boxOne = document.querySelector(".item");
  let boxTwo = document.querySelector(".itemTwo");
  let boxThree = document.querySelector(".itemThree");
  console.log(boxOne.getBoundingClientRect());
  console.log(boxTwo.getBoundingClientRect());
  console.log(boxThree.getBoundingClientRect());

  console.log("hi");
}

// let boxOneBtn = document.getElementById("boxOneBtn");
// let boxTwoBtn = document.getElementById("boxTwoBtn");
// let boxThreeBtn = document.getElementById("boxThreeBtn");

//creat little boxes
// function createBox(boxNum) {
//   let copyBox = document.createElement("div");
//   let layOut = document.querySelector(".layOut");

//   copyBox.classList.add("draggables");
//   copyBox.classList.add(boxNum);
//   layOut.appendChild(copyBox);
//   let resizerEast = document.createElement("div");
//   let resizerWest = document.createElement("div");
//   resizerEast.classList.add("resizer");
//   resizerEast.classList.add("e");
//   resizerWest.classList.add("resizer");
//   resizerWest.classList.add("w");
//   copyBox.appendChild(resizerEast);
//   copyBox.appendChild(resizerWest);

//   console.log(copyBox);
// }

//grow container

function growContainer() {
  containerRect = container.getBoundingClientRect();
  console.log(containerRect);
  container.style.height = containerRect.height + 40 + "px";
}
