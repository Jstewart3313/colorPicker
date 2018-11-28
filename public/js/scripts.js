const generateRandomHex = () => {
  let possibleRandom = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hex = '#';
  for (var i = 0; i < 6; i++) 
  hex += possibleRandom[(Math.floor(Math.random() * 16))];
  return hex
}

const changeHex = () => {
  $('.a').css('background-color', generateRandomHex())
  $('.b').css('background-color', generateRandomHex())
  $('.c').css('background-color', generateRandomHex())
  $('.d').css('background-color', generateRandomHex())
  $('.e').css('background-color', generateRandomHex())
}

$('.a').css('background-color', generateRandomHex())
$('.b').css('background-color', generateRandomHex())
$('.c').css('background-color', generateRandomHex())
$('.d').css('background-color', generateRandomHex())
$('.e').css('background-color', generateRandomHex())


$('.nav-button').click(() => {
  changeHex()})