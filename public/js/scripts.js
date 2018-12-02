const generateRandomHex = () => {
  let possibleRandom = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];
  let hex = "#";
  for (var i = 0; i < 6; i++)
    hex += possibleRandom[Math.floor(Math.random() * 16)];
  return hex;
};

let visualHex1 = generateRandomHex();
let visualHex2 = generateRandomHex();
let visualHex3 = generateRandomHex();
let visualHex4 = generateRandomHex();
let visualHex5 = generateRandomHex();

$(".a").css("background-color", visualHex1);
$(".b").css("background-color", visualHex2);
$(".c").css("background-color", visualHex3);
$(".d").css("background-color", visualHex4);
$(".e").css("background-color", visualHex5);

$(".a").append(visualHex1);
$(".b").append(visualHex2);
$(".c").append(visualHex3);
$(".d").append(visualHex4);
$(".e").append(visualHex5);



const toggleLock = event => {
  let lockButton = $(event.target);
  let lockContainer = $(event.target.parentNode);

  lockButton.toggleClass("lock");
  lockContainer.toggleClass("disabled");
};

const generateColors = event => {
  event.preventDefault();

  for (var i = 1; i < 6; i++) {
    if (!$(`.${i}`).hasClass("disabled")) {
      $(`.${i}`).css("background-color", generateRandomHex());
    }
  }
};

const deleteProject = event => {
  event.preventDefault();
  let projectTarget = event.target.parentNode;
  if ($(projectTarget).hasClass("project-swatches")) {
    projectTarget.parentNode.removeChild(projectTarget);
  }
};

const saveProject = () => {
  let name = $(".project-name-input").val();
  let projectName = `<li class='list-name'><p class='project-name'> ${name} </p></li>`;
  $(".projects").append(projectName);
  postProjectToDB(name)
};

const savePalette = () => {
  $(".list-name").append(`
  <div class='project-swatches'>
    <div 
      class='swatch1' 
      style="background-color:${$('.a').css('background-color')};">
    </div>
    <div 
      class='swatch2' 
      style="background-color:${$('.b').css('background-color')};">
    </div>
    <div 
      class='swatch3' 
      style="background-color:${$('.c').css('background-color')};">
    </div>
    <div 
      class='swatch4' 
      style="background-color:${$('.d').css('background-color')};">
    </div>
    <div 
      class='swatch5' 
      style="background-color:${$('.e').css('background-color')};">
    </div><button class='trash-btn'></button>
  </div>`);
};

$(".save-palette").click(() => {
  savePalette();
});

const saveToDropDown = () => {
  const projectName = $(".project-name-input").val();
  $("#project-select").append(`<option value="">${projectName}</option>`);
};

const clearProjectInput = () => {
  $(".project-name-input").val("");
};

const postProjectToDB = async (projectName) => {
  try {
  const response = await fetch('/api/v1/projects', {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    body: JSON.stringify({title: projectName}),
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
  const data = await response.json();
  console.log(data)
} catch(e) {
  throw new Error('something went wrong')
}
}

$(".project-create-button").click(() => {
  saveProject();
  saveToDropDown();
  clearProjectInput();
});

$(".projects").click(() => {
  deleteProject(event);
});

$(".mix-button").click(() => {
  generateColors(event);
});

$(".unlock").click(() => {
  toggleLock(event);
});
