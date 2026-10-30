(function () {
  "use strict";

  function configureCarousel() {
    var container = document.querySelector("#past-projects .swiper");
    var swiper = container && container.swiper;
    if (!swiper || container.dataset.testimonialSwipeReady === "true") {
      return Boolean(swiper);
    }

    container.dataset.testimonialSwipeReady = "true";
    var activeIndex = swiper.activeIndex;
    var transitionDuration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 600;
    var isAnimating = false;

    swiper.params.slidesPerView = 1;
    swiper.params.centeredSlides = false;
    swiper.params.spaceBetween = 0;
    swiper.params.speed = 0;
    swiper.params.allowTouchMove = false;
    swiper.originalParams.slidesPerView = 1;
    swiper.originalParams.centeredSlides = false;
    swiper.originalParams.spaceBetween = 0;
    swiper.originalParams.speed = 0;
    swiper.originalParams.allowTouchMove = false;
    swiper.allowTouchMove = false;
    swiper.update();
    swiper.slideTo(activeIndex, 0, false);

    swiper.slides.forEach(function (slide, index) {
      slide.classList.toggle("testimonial-current", index === activeIndex);
    });

    function updateActiveBullet(index) {
      Array.prototype.forEach.call(swiper.pagination.bullets, function (bullet, bulletIndex) {
        bullet.classList.toggle("swiper-pagination-bullet-active", bulletIndex === index);
      });
    }

    function goToSlide(targetIndex) {
      if (isAnimating || targetIndex === activeIndex || targetIndex < 0 || targetIndex >= swiper.slides.length) {
        return;
      }

      var previousIndex = activeIndex;
      var direction = targetIndex > previousIndex ? 1 : -1;
      var outgoing = swiper.slides[previousIndex];
      var incoming = swiper.slides[targetIndex];
      isAnimating = true;

      swiper.slides.forEach(function (slide) {
        slide.classList.remove(
          "testimonial-current",
          "testimonial-entering",
          "testimonial-exiting"
        );
      });

      incoming.classList.add("testimonial-entering");
      outgoing.classList.add("testimonial-current", "testimonial-exiting");
      updateActiveBullet(targetIndex);

      var animations = [];
      if (transitionDuration > 0) {
        animations.push(
          incoming.animate(
            [
              { transform: "translateX(" + (direction > 0 ? "-100%" : "100%") + ")" },
              { transform: "translateX(0)" }
            ],
            {
              duration: transitionDuration,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both"
            }
          ),
          outgoing.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(" + (direction > 0 ? "100%" : "-100%") + ")" }
            ],
            {
              duration: transitionDuration,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both"
            }
          )
        );
      }

      window.setTimeout(function () {
        animations.forEach(function (animation) {
          animation.cancel();
        });
        outgoing.classList.remove("testimonial-current", "testimonial-exiting");
        incoming.classList.remove("testimonial-entering");
        incoming.classList.add("testimonial-current");
        activeIndex = targetIndex;
        isAnimating = false;
      }, transitionDuration + 50);
    }

    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!(target instanceof Element)) {
          return;
        }

        var bullet = target.closest("#past-projects .swiper .swiper-pagination-bullet");
        if (!bullet || !container.contains(bullet)) {
          return;
        }

        var targetIndex = Array.prototype.indexOf.call(
          container.querySelectorAll(".swiper-pagination-bullet"),
          bullet
        );
        if (targetIndex < 0) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        goToSlide(targetIndex);
      },
      true
    );

    var pointerStart = null;
    container.addEventListener("pointerdown", function (event) {
      if (event.target.closest(".swiper-pagination")) {
        pointerStart = null;
        return;
      }
      pointerStart = { x: event.clientX, y: event.clientY };
    });
    container.addEventListener("pointerup", function (event) {
      if (!pointerStart) {
        return;
      }

      var deltaX = event.clientX - pointerStart.x;
      var deltaY = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      goToSlide(activeIndex + (deltaX > 0 ? -1 : 1));
    });
    container.addEventListener("pointercancel", function () {
      pointerStart = null;
    });

    return true;
  }

  if (configureCarousel()) {
    return;
  }

  var observer = new MutationObserver(function () {
    if (configureCarousel()) {
      observer.disconnect();
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
