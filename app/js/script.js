document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  $.fancybox.defaults.animationEffect = "fade";
  $.fancybox.defaults.transitionEffect = "slide";

  $('[data-fancybox]').fancybox({
    buttons: [
      'close'
    ],
    caption : function( instance, item ) {
      console.log(this);
      return $(this).find('.gallery__text').html();
    }
  });

  var $scrollToTopBtn = $('.scroll-to-top');
  var viewportHeight = document.documentElement.clientHeight;


  $scrollToTopBtn.on('click', function (event) {
    event.preventDefault();
    $.scrollTo(0, 500);
  });

  function onWindowScroll() {
    if (pageYOffset > viewportHeight / 2) {
      $scrollToTopBtn.addClass('scroll-to-top--showed');
    } else {
      $scrollToTopBtn.removeClass('scroll-to-top--showed');
    }
  }

  window.addEventListener('scroll', onWindowScroll);

  $.fancybox.defaults.animationEffect = "zoom";

  $('.top-news-carousel').flickity({
    wrapAround: true,
    prevNextButtons: false,
    autoPlay: true,
    contain: true,
    cellSelector: '.top-news-carousel__item'
  });

  $('.enter-tabs').tabslet({
    animation: true
  });

  $('.enter-tabs').on('_before', function () {
    $('.enter-tabs').find('form').each(function (form) {
      this.reset();
      $loginForm.resetForm();
      $signupForm.resetForm();
    });
  });

  var $loginForm = $('#login-form').validate({
    rules: {
      loginPassword: {
        minlength: 6
      }
    },
    submitHandler: function (form) {
      console.log('submit login-form');
      var data = $(form).serializeArray();
      var popupStatusLoginTemplate = '';

      var response = $.ajax({
        type: 'POST',
        url: form.action,
        data: data
      });
      response.done(function (responseData) {
        console.log('done');
        popupStatusLoginTemplate = '<div class="popup"><h2 class="popup__title">Success!</h2><p>Thank you for registering</p></div>'
      });
      response.fail(function (responseData) {
        console.log('fail');
        popupStatusLoginTemplate = '<div class="popup"><h2 class="popup__title">Something went wrong</h2><p>Please try again later.</p></div>'
      });
      response.always(function (responseData) {
        console.log('always');
        form.reset();
        $.fancybox.close(true);
        $.fancybox.open(popupStatusLoginTemplate);
      });
    }
  });

  var $signupForm = $('#signup-form').validate({
    submitHandler: function (form) {
      console.log('submit signup-form');
      var data = $(form).serializeArray();
      var popupStatusSignupTemplate = '';

      var response = $.ajax({
        type: 'POST',
        url: form.action,
        data: data
      });
      response.done(function (responseData) {
        console.log('done');
        popupStatusSignupTemplate = '<div class="popup"><h2 class="popup__title">Success!</h2><p>Thank you for registering</p></div>'
      });
      response.fail(function (responseData) {
        console.log('fail');
        popupStatusSignupTemplate = '<div class="popup"><h2 class="popup__title">Something went wrong</h2><p>Please try again later.</p></div>'
      });
      response.always(function (responseData) {
        console.log('always');
        form.reset();
        $.fancybox.close(true);
        $.fancybox.open(popupStatusSignupTemplate);
      });
    },
    rules: {
      password: {
        minlength: 6
      },
      confirmPassword: {
        minlength: 6,
        equalTo: "#field-signup-password"
      }
    },
    messages: {
      confirmPassword: {
        equalTo: "Please enter the same password as above"
      }
    }
  });

  var $fieldAddComment = $('#field-add-comment');

  $('.js-forum-comment-to-quote').on('click', function(event) {
    event.preventDefault();
    $fieldAddComment.focus();
  });
});
