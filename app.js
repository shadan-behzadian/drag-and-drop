const container = document.querySelector(".container");

const growBtn = document.getElementById("growBtn");
growBtn.addEventListener("click", growContainer);

let isResizing = false;

// el.addEventListener("mousedown", mousedown);

let boxOneBtn = document.getElementById("boxOneBtn");
let boxTwoBtn = document.getElementById("boxTwoBtn");
let boxThreeBtn = document.getElementById("boxThreeBtn");

// creat little boxes
let allBoxIDs = [];
function createBox(boxType) {
  let copyBox = document.createElement("div");
  let layOut = document.querySelector(".layOut");
  let ID = "_" + Math.random().toString(20).substr(2, 4);
  copyBox.classList.add("draggables");
  copyBox.classList.add(boxType);
  copyBox.setAttribute("id", ID);
  layOut.appendChild(copyBox);
  let resizerEast = document.createElement("div");
  let resizerWest = document.createElement("div");
  resizerEast.classList.add("resizer");
  resizerEast.classList.add("e");
  resizerWest.classList.add("resizer");
  resizerWest.classList.add("w");
  copyBox.appendChild(resizerEast);
  copyBox.appendChild(resizerWest);
  console.log(copyBox);

  allBoxIDs.push(ID);

  dragElements();

  resizing();

  console.log(allBoxIDs);
}
const exportButton = document.getElementById("export");
exportButton.addEventListener("click", function () {
  exportDetail(allBoxIDs);
  allBoxIDs = [];
});

boxOneBtn.addEventListener("click", function () {
  createBox("item");
});

boxTwoBtn.addEventListener("click", function () {
  createBox("itemTwo");
});

boxThreeBtn.addEventListener("click", function () {
  createBox("itemThree");
});

function dragElements() {
  const draggables = document.querySelectorAll(".draggables");
  for (let draggable of draggables) {
    draggable.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      // let currentBlock = e.target;
      // currentBlock.classList.add("current");
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      let prevX = e.clientX;
      let prevY = e.clientY;
      function mousemove(e) {
        if (!isResizing) {
          const boxRect = draggable.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          if (
            boxRect.top > containerRect.top &&
            boxRect.left > containerRect.left &&
            boxRect.bottom < containerRect.bottom &&
            boxRect.right < containerRect.right
          ) {
            document.body.style.cursor = "pointer";
            draggable.classList.add("inside");
            draggable.classList.remove("outside");
          } else {
            document.body.style.cursor = "not-allowed";
            draggable.classList.remove("inside");
            draggable.classList.add("outside");
          }

          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;

          draggable.style.left = boxRect.left - newX + "px";
          draggable.style.top = boxRect.top - newY + "px";

          prevX = e.clientX;
          prevY = e.clientY;
        }
      }
      function mouseup() {
        const boxRect = draggable.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (
          boxRect.top > containerRect.top &&
          boxRect.left > containerRect.left &&
          boxRect.bottom < containerRect.bottom &&
          boxRect.right < containerRect.right
        ) {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }
    }
  }
}

function resizing() {
  const resizers = document.querySelectorAll(".resizer");
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
        const rect = currentResizer.parentNode.getBoundingClientRect();

        const containerRect = container.getBoundingClientRect();

        if (currentResizer.classList.contains("e")) {
          if (rect.width - (prevX - e.clientX) < containerRect.width - 5) {
            currentResizer.parentNode.style.width =
              rect.width - (prevX - e.clientX) + "px";
            // el.style.height = rect.height - (prevY - e.clientY) + "px";
          }
        } else if (currentResizer.classList.contains("w")) {
          if (rect.width - (prevX - e.clientX) < containerRect.width - 5) {
            currentResizer.parentNode.style.width =
              rect.width + (prevX - e.clientX) + "px";
            currentResizer.parentNode.style.left =
              rect.left - (prevX - e.clientX) + "px";
          }
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

// function saveCoordinates(id) {
//   document.getElementById(id).getBoundingClientRect();

// }

function exportDetail(allBoxIDs) {
  console.log(allBoxIDs);
  let results = [];
  for (boxID of allBoxIDs) {
    let eachbox = document.getElementById(boxID);
    let eachboxCoordinates = eachbox.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    let obj = {};
    obj["id"] = boxID;
    obj["width"] = eachboxCoordinates.width;
    obj["X"] = eachboxCoordinates.x - containerRect.x;
    obj["Y"] = eachboxCoordinates.y - containerRect.y;

    results.push(obj);
    console.log(results);
  }

  // console.log(results);
  boxOneBtn.disabled = true;
  boxTwoBtn.disabled = true;
  boxThreeBtn.disabled = true;
  exportButton.disabled = true;
  growBtn.disabled = true;

  printResults(results);
}

function printResults(results) {
  console.log(results);
  let finalResults = document.querySelector(".finalResults");
  console.log(finalResults);

  results.forEach((obj) => {
    let eachBoxResult = document.createElement("div");
    if (obj.hasOwnProperty("id")) {
      let boxInfoID = document.createElement("div");
      boxInfoID.textContent = "Box ID: " + obj["id"];
      eachBoxResult.appendChild(boxInfoID);
    }

    if (obj.hasOwnProperty("width")) {
      let boxInfoWidth = document.createElement("div");
      boxInfoWidth.textContent = "Box Width: " + obj["width"];
      eachBoxResult.appendChild(boxInfoWidth);
    }
    if (obj.hasOwnProperty("X")) {
      let boxInfoX = document.createElement("div");
      boxInfoX.textContent = "Box X axis: " + obj["X"];
      eachBoxResult.appendChild(boxInfoX);
    }
    if (obj.hasOwnProperty("Y")) {
      let boxInfoY = document.createElement("div");
      boxInfoY.textContent = "Box Y axis: " + obj["Y"];
      eachBoxResult.appendChild(boxInfoY);
    }
    finalResults.appendChild(eachBoxResult);
  });
}

//grow container

function growContainer() {
  containerRect = container.getBoundingClientRect();

  container.style.height = containerRect.height + 40 + "px";
}
