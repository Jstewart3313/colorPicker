const generateRandomHex = () => {
  let possibleRandom = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hex = '#';
  for (var i = 0; i < 6; i++) 
  hex += possibleRandom[(Math.floor(Math.random() * 16))];
  return hex
}



$('.a').css('background-color', generateRandomHex())
$('.b').css('background-color', generateRandomHex())
$('.c').css('background-color', generateRandomHex())
$('.d').css('background-color', generateRandomHex())
$('.e').css('background-color', generateRandomHex())

const toggleLock = (event) => {
  let lockButton = $(event.target)
  let lockContainer = $(event.target.parentNode)

  lockButton.toggleClass('lock');
  lockContainer.toggleClass('disabled')
}

$('.generate-btn').on('click', generateColors)

function generateColors(event) {
  event.preventDefault()
  
  for (var i = 1; i < 6; i++) {
    if (!$(`.${i}`).hasClass('disabled')) {
      $(`.${i}`).css('background-color', generateRandomHex())
      console.log($(`.${i}`))
    }
  }
}



$('.nav-button').click(() => {
  generateColors(event)
})

$('.unlock').click(() => {
  toggleLock(event)
})