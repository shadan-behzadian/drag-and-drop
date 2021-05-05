const draggables = document.querySelectorAll(".draggables");
const container = document.querySelector(".container");
const resizers = document.querySelectorAll(".resizer");

let isResizing = false;
// el.addEventListener("mousedown", mousedown);

dragElements();
function dragElements() {
  for (let draggable of draggables) {
    draggable.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      console.log(e.target);
      let currentBlock = e.target;
      currentBlock.classList.add("current");
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
  for (let draggable of draggables) {
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

          const rect = draggable.getBoundingClientRect();
          if (currentResizer.classList.contains("e")) {
            draggable.style.width = rect.width - (prevX - e.clientX) + "px";
            // el.style.height = rect.height - (prevY - e.clientY) + "px";
          } else if (currentResizer.classList.contains("w")) {
            draggable.style.width = rect.width + (prevX - e.clientX) + "px";
            draggable.style.left = rect.left - (prevX - e.clientX) + "px";
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
}

//create table
