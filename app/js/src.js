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

$('.categories > ul > li > a').on('click', function(){
  $(this).toggleClass('in').next().slideToggle();
  $('.categories > ul > li > a').not(this).removeClass('in').next().slideUp();
});

$('.slider').each(function(){
  var $li = $('li', this);
  var $controls = $('.controls', this);
  var $pag = $controls.find('span');
  var width = $(window).width();
  if (width > 600) {
    $pag.click(function(){
      $li.eq($(this).index()).fadeIn().siblings().hide();
      $(this).addClass('active').siblings().removeClass('active');

      var $this = $(this);

      setTimeout(function(){
        $li.eq($this.index()).find('.slider__text').addClass('active');
        $li.eq($this.index()).siblings().find('.slider__text').removeClass('active');
      }, 200);
    }).first().click();
  }

});

