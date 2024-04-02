import { isMobile } from "./utils.js";

export default function popup() {
  $(".pl").click(function (event) {
    var pl = $(this).attr("href").replace("#", "");

    localStorage.setItem("toHover", "." + Array.from(this.classList).join("."));
    popupOpen(pl, this);
    return false;
  });
  function popupOpen(pl) {
    $(".popup").removeClass("active").hide();
    const page = document.querySelector(".wrapper");
    const scrollBarCompensation = window.innerWidth - page.offsetWidth;
    document.body.className = "lock";
    page.style.paddingRight = `${scrollBarCompensation}px`;
    $(".popup-" + pl)
      .fadeIn(300)
      .delay(300)
      .addClass("active");
    const form = $(".popup-" + pl).find(".popup-close")[0];
    $(form).focus();
    $(".popup-" + pl).keydown(function (e) {
      if (
        $(".popup-" + pl)
          .find(".last")
          .is(":focus") &&
        (e.which || e.keyCode) == 9 &&
        !e.shiftKey
      ) {
        e.preventDefault();
        $(".popup-" + pl)
          .find(".popup-close")
          .focus();
      } else if (
        $(".popup-" + pl)
          .find(".popup-close")
          .is(":focus") &&
        (e.which || e.keyCode) == 9 &&
        e.shiftKey
      ) {
        e.preventDefault();
      }
    });
  }
  function popupClose(e) {
    $(".popup").removeClass("active").fadeOut(300);
    $(".wrapper").css({ paddingRight: 0 });
    if ($(".header-mobile__menu").hasClass("active")) {
      $(".menu-btn").focus();
    }

    if (!isMobile.any()) {
      $("body").css({ paddingRight: 0 });
      $("body").removeClass("lock");
    }

    history.pushState("", "", window.location.href.split("#")[0]);
    document.querySelector(localStorage.getItem("toHover")).focus();
  }
  $(".popup").click(function (e) {
    if (
      !$(e.target).is(".popup>.popup-table>.cell *") ||
      $(e.target).is(".popup-close") ||
      $(e.target).is(".popup__close")
    ) {
      popupClose(e);
      return false;
    }
  });
  $(document).on("keydown", function (e) {
    if (e.which == 27) {
      popupClose();
    }
  });
}
