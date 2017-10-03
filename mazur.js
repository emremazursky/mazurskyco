 $(document).ready(function(){
    
    $('.fuller').css('height', $(window).height());

    // Comma, not colon ----^
  });
  $(window).resize(function(){
      $('.fuller').css('height', $(window).height());
      // Comma, not colon ----^
  });

  $(function() {
  $.getJSON('https://api.dribbble.com/v1/users/emred/shots?access_token=95b84727dc793a83020edf25596825c02e46cae6c2304706a7544f6a30c3037d&callback=?', function(resp) {
    if (resp.data.length > 0) {             
      $.each(resp.data.reverse(), function(i, val) {
        $('#dribbble').prepend(
          '<li><a href="//dribbble.com/emred"><img src="'+val.images.hidpi+'" /></a></li>'
        );
      });
    }
    else {
      $('#dribbble').append('<li>No shots.</li>');
    }
  });                       
  });


  // scroller

$("a").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
 
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

// Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('.topBar').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();
      
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;
      
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('.topBar').removeClass('nav-down').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('.topBar').removeClass('nav-up').addClass('nav-down');
          }
      }
      
      lastScrollTop = st;
  }

  $('li > a').click(function() {
        $('li > a').removeClass();
        $(this).addClass('active');
    })

// SUBMIT FORM

 var $contactForm = $('#contact-form');
  $contactForm.submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: 'https://formspree.io/emre@mazursky.co',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function(data) {
        $(".btn_send").prop('value', 'Loading');
        console.log(data);
        // $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
         // $(".btn").prop('value', 'Sent!');
         $(".btn_send").hide();
          $(".btn_done").show();
          console.log(data);


        // $contactForm.find('.alert--loading').hide();
        // $contactForm.append('<div class="alert alert--success">Message sent!</div>');
      },
      error: function(err) {
         $(".btn_send").prop('value', 'Error...');
        // $contactForm.find('.alert--loading').hide();
        // $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
      }
    });
  });

