
var doc = window.document,
  context = doc.querySelector('.js-loop'),
  clones = context.querySelectorAll('.is-clone'),
  disableScroll = false,
  scrollHeight = 0,
  scrollPos = 0,
  clonesHeight = 0,
  i = 0;

function getScrollPos () {
  return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos (pos) {
  context.scrollTop = pos;
}

function getClonesHeight () {
  clonesHeight = 0;

  for (i = 0; i < clones.length; i += 1) {
    clonesHeight = clonesHeight + clones[i].offsetHeight;
  }

  return clonesHeight;
}

function reCalc () {
  scrollPos = getScrollPos();
  scrollHeight = context.scrollHeight;
  clonesHeight = getClonesHeight();

  if (scrollPos <= 0) {
    setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
  }
}

function scrollUpdate () {
  if (!disableScroll) {
    scrollPos = getScrollPos();

    if (clonesHeight + scrollPos >= scrollHeight) {
      // Scroll to the top when you’ve reached the bottom
      setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
      disableScroll = true;
    } else if (scrollPos <= 0) {
      // Scroll to the bottom when you reach the top
      setScrollPos(scrollHeight - clonesHeight);
      disableScroll = true;
    }
  }

  if (disableScroll) {
    // Disable scroll-jumping for a short time to avoid flickering
    window.setTimeout(function () {
      disableScroll = false;
    }, 100);
  }
}

window.requestAnimationFrame(reCalc);

context.addEventListener('scroll', function () {
  window.requestAnimationFrame(scrollUpdate);
}, false);

context.addEventListener('touchmove', function () {
  window.requestAnimationFrame(scrollUpdate);
}, false);

window.addEventListener('resize', function () {
  window.requestAnimationFrame(reCalc);
}, false);








//Center the middle block on page load
window.onload = function () {
  setScrollPos(Math.round(clones[0].getBoundingClientRect().top + getScrollPos() - (context.offsetHeight - clones[0].offsetHeight) / 2));
};


$.fn.expose = function(options) {
	
  var $modal = $(this),
      $trigger = $("a[href=" + this.selector + "]");
  
  $modal.on("expose:open", function() {
    
    $modal.addClass("is-visible");
    $modal.trigger("expose:opened");
  });
  
  $modal.on("expose:close", function() {
    
    $modal.removeClass("is-visible");
    $modal.trigger("expose:closed");
  });
  
  $trigger.on("click", function(e) {
    
    e.preventDefault();
    $modal.trigger("expose:open");
  });
  
  $modal.add( $modal.find(".close") ).on("click", function(e) {
    
    e.preventDefault();
    
    // if it isn't the background or close button, bail
    if( e.target !== this )
      return;
    
  	$modal.trigger("expose:close");
  });
  
  return;
}

$("#Popup").expose();

// Example Cancel Button

$(".cancel").on("click", function(e) {
  
  e.preventDefault();
  $(this).trigger("expose:close");
});
