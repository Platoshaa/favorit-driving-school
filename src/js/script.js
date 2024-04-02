import * as flsFunctions from "./modules/functions.js";
import WOW from "wowjs";
import "animate.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import headerScripts from "./modules/header.js";
import popup from "./modules/popup.js";
import "slick-carousel/slick/slick.js";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import val from "./modules/validation.js";
import { isMobile } from "./modules/utils.js";
flsFunctions.isWebp();
gsap.registerPlugin(ScrollTrigger);

$(function () {
  val();
  if (
    document.location.pathname == "/index.html" ||
    document.location.pathname == "/"
  ) {
    initMainPage();
  }
  function initMainPage() {
    popup();
    $(".main-slider").slick({
      autoplay: true,
      autoplaySpeed: 10000,
      arrows: false,
      dots: false,
      infinite: true,
    });
    let sqx = $(".main-slider__item");
    $(".main-slider__item.slick-current").addClass("active");
    $(".main-slider").on(
      "afterChange",
      function (event, slick, currentSlide, nextSlide) {
        $(sqx).removeClass("active");
        $(sqx[currentSlide + 1]).addClass("active");
      }
    );

    $(".advantages-list").slick({
      arrows: false,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 7000,
      dots: false,
      responsive: [
        {
          breakpoint: 1355,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    function tabEvent() {
      $(".item-tab__text").removeClass("active");
      $(this).siblings().addClass("active");
      $(".item-tab__text").not(".item-tab__text.active").slideUp();
      $(".item-tab").removeClass("active");
      $(this).parent().addClass("active");
      $(this).siblings().slideDown();
    }
    $(".item-tab__title").on("click", tabEvent);
    $(".item-tab__title").on("keydown", (e) => {
      if (e.keyCode === 13) {
        tabEvent.bind(e.target)();
      }
    });
  }

  if (location.hash) {
    var hsh = location.hash.replace("#", "");
    if ($("div." + hsh).length > 0) {
      $("body,html").animate(
        { scrollTop: $("div." + hsh).offset().top },
        500,
        function () {}
      );
    }
  }
  headerScripts();
});
var act = "click";
if (isMobile.iOS()) {
  var act = "touchstart";
}

$(".goto").click(function () {
  var el = $(this).attr("href").replace("#", "");
  var offset = 0;
  $("body,html").animate(
    { scrollTop: $("." + el).offset().top + offset },
    500,
    function () {}
  );

  if ($(".menu__body").hasClass("active")) {
    $(".menu__body,.icon-menu").removeClass("active");
    $("body").removeClass("lock");
  }
  return false;
});

$(function () {
  $(".item").addClass("active");
  if ($(".item").hasClass("active")) {
    $("body").removeClass("lock");
    new WOW.WOW().init();
    document.querySelectorAll(".wow").forEach((e) => {
      e.classList.add("animate__animated");
    });
  }
  dynamicHeader();
  partnerScrollAnimation();
});

function dynamicHeader() {
  $(document).scroll(function () {
    if ($(document).scrollTop() >= 50) {
      $(".header").addClass("greybg");
    } else {
      $(" .header").removeClass("greybg");
    }
  });
  var lastScrollTop = 0;
  window.addEventListener(
    "scroll",
    function () {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && st > 100) {
        $("header").css({
          top: "-180px",
        });
      } else if (st > lastScrollTop && st < 200) {
        $("header").css({
          top: 0,
        });
      } else {
        $("header").css({
          top: 0,
        });
      }
      lastScrollTop = st <= 0 ? 0 : st;
    },
    false
  );
}
function partnerScrollAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-partners__list",
      start: "top bottom",
      scrub: 10,
    },
  });
  tl.addLabel("start")
    .to(".about-partners__list", { xPercent: -100 })
    .addLabel("end");
}
