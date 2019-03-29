var $ = require('jquery');
var _ = require('lodash');

$('.main-nav__opener').click(function(){
  if ($(this).hasClass('open')) {
    $(this).removeClass('open')
    $('.main-nav ul').slideUp()
  }else{
    $(this).addClass('open')
    $('.main-nav ul').slideDown()
  }
});

$(window).click(function(){
  $('.search').removeClass('is-active')
});

$('.search').click(function(){
  event.stopPropagation()
});

$('.search > button').on('click', function(){
  $('.search').addClass('is-active')
  if ($('.main-nav__opener').hasClass('open')) {
    $('.main-nav__opener').removeClass('open')
    $('.main-nav ul').slideUp()
  }
});

// var menu = document.querySelector('.header__menu');
// var menuOpener = document.querySelector('.main-nav__opener');
// menuOpener.on('click', function() {
//    menu.classList.toggle('is-active');
//    menuOpener.classList.toggle('is-active');
// });