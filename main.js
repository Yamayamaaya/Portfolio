let AboutMe = document.getElementById("aboutme");
let Works = document.getElementById("works");
let Skill = document.getElementById("skill");
window.addEventListener("DOMContentLoaded", function () {
  Works.style.display = "none";
  Skill.style.display = "none";
  let height = window.innerHeight;
  setUpAccordion();
});
window.addEventListener("scroll", function () {
  target1_position = document
    .querySelector(".works")
    .getBoundingClientRect().top;
  target2_position = document
    .querySelector(".skill")
    .getBoundingClientRect().top;
  if (window.innerHeight / 2 <= target1_position) {
    once = true;
    AboutMe.style.display = "block";
    Works.style.display = "none";
    Skill.style.display = "none";
  } else if (target1_position <= window.innerHeight / 2 <= target2_position) {
    once = true;
    AboutMe.style.display = "none";
    Works.style.display = "block";
    Skill.style.display = "none";
  } else if (target2_position <= window.innerHeight / 2) {
    once = true;
    AboutMe.style.display = "none";
    Works.style.display = "none";
    Skill.style.display = "block";
  }
});
let once1 = false;
window.addEventListener("scroll", function () {
  target_position = document
    .querySelector(".skill")
    .getBoundingClientRect().top;
  if (target_position <= window.innerHeight && once1 !== true) {
    once = true;

    function skillSet() {
      $(".bar-info").each(function () {
        total = $(this).data("total");
        $(this).css("width", total + "%");
      });
      $(".percent").each(function () {
        var $this = $(this);
        $({
          Counter: 10,
        }).animate(
          {
            Counter: $this.text(),
          },
          {
            duration: 3000,
            easing: "swing",
            step: function () {
              $this.text(Math.ceil(this.Counter) + "%");
            },
          }
        );
      });
    }
    setTimeout(skillSet, 1000);
  }
});
var unit = 100,
  canvasList,
  info = {},
  colorList;

function init() {
  info.seconds = 0;
  info.t = 0;
  canvasList = [];
  colorList = [];
  canvasList.push(document.getElementById("waveCanvas"));
  colorList.push(["#CCDEFF", "#CCDEFF", "#B0C0F0 "]);
  for (var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    canvas.width = document.documentElement.clientWidth;
    canvas.height = 800;
    canvas.contextCache = canvas.getContext("2d");
  }
  update();
}

function update() {
  for (var canvasIndex in canvasList) {
    var canvas = canvasList[canvasIndex];
    draw(canvas, colorList[canvasIndex]);
  }
  info.seconds = info.seconds + 0.014;
  info.t = info.seconds * Math.PI;
  setTimeout(update, 35);
}

function draw(canvas, color) {
  var context = canvas.contextCache;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawWave(canvas, color[0], 0.5, 3, 0);
  drawWave(canvas, color[1], 0.4, 2, 250);
  drawWave(canvas, color[2], 0.2, 1.6, 100);
}

function drawWave(canvas, color, alpha, zoom, delay) {
  var context = canvas.contextCache;
  context.fillStyle = color;
  context.globalAlpha = alpha;
  context.beginPath();
  drawSine(canvas, info.t / 2, zoom, delay);
  context.lineTo(canvas.width + 10, canvas.height);
  context.lineTo(0, canvas.height);
  context.closePath();
  context.fill();
}

function drawSine(canvas, t, zoom, delay) {
  var xAxis = Math.floor(canvas.height / 2);
  var yAxis = 0;
  var context = canvas.contextCache;
  var x = t;
  var y = Math.sin(x) / zoom;
  context.moveTo(yAxis, unit * y + xAxis);
  for (i = yAxis; i <= canvas.width + 10; i += 10) {
    x = t + (-yAxis + i) / unit / zoom;
    y = Math.sin(x - delay) / 3;
    context.lineTo(i, unit * y + xAxis);
  }
}
init();
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running";
  const IS_OPENED_CLASS = "is-opened";
  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }
      if (element.open) {
        element.classList.toggle(IS_OPENED_CLASS);
        const closingAnim = content.animate(
          closingAnimKeyframes(content),
          animTiming
        );
        element.dataset.animStatus = RUNNING_VALUE;
        closingAnim.onfinish = () => {
          element.removeAttribute("open");
          element.dataset.animStatus = "";
        };
      } else {
        element.setAttribute("open", "true");
        element.classList.toggle(IS_OPENED_CLASS);
        const openingAnim = content.animate(
          openingAnimKeyframes(content),
          animTiming
        );
        element.dataset.animStatus = RUNNING_VALUE;
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
};
const animTiming = {
  duration: 400,
  easing: "ease-out",
};
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
