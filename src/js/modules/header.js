export default function headerScripts() {
  // TABS IN MOBILE MENU
  let contactLinks = $(".contacts-header__link");
  let lastContactLink = contactLinks[contactLinks.length - 1];
  const tabchangerForward = (e) => {
    if (e.keyCode == 9) {
      document.querySelector(".header__logo").focus();
    }
  };
  $(".header-mobile__menu").on("click", (e) => {
    if (e.target.nodeName === "A") {
      $(".header-mobile__menu").removeClass("active");
      $("body").removeClass("lock");
      $(".menu-btn").removeClass("active");
    }
  });
  const tabChangerBackward = (e) => {
    if (e.keyCode == 9 && e.shiftKey) {
      lastContactLink.focus();
    }
  };
  $(".menu-btn").on("click", function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      lastContactLink.addEventListener("keydown", tabchangerForward);
      $(".menu-btn").on("keydown", tabChangerBackward);
    } else {
      $(".menu-btn").off("keydown", tabChangerBackward);
    }
    $(".header-mobile__menu").toggleClass("active");
    $("body").toggleClass("lock");
  });

  $(".item-list__mobile").on("click", function () {
    $(this).parent().toggleClass("active");
  });
  function reverseSubMenus() {
    $(".submenu-list").each((i, e) => {
      const { width: w, x: s } = e.getBoundingClientRect();
      if (w + s + 15 >= window.innerWidth) {
        $(e).addClass("reverse");
      } else {
        $(e).removeClass("reverse");
      }
    });
  }
  reverseSubMenus();
  $(window).resize((event) => {
    adaptive_function();
    reverseSubMenus();
  });
  function adaptive_header(w, h) {
    let headerMenu = $(".header-mobile__menu");
    let headerLang = $(".header__list");
    let headerLang1 = $(".header__contacts");
    let we = $(".menu-btn");
    let we1 = $(".item-list");

    if (w < 951) {
      if (!headerLang.hasClass("done")) {
        headerLang.addClass("done").appendTo(headerMenu);
      }
    } else {
      if (headerLang.hasClass("done")) {
        headerMenu.removeClass("active");
        headerLang.removeClass("done").appendTo($(".menu"));
      }
    }

    if (w < 951) {
      if (!headerLang1.hasClass("done")) {
        headerLang1.addClass("done").appendTo(headerMenu);
      }
    } else {
      if (headerLang1.hasClass("done")) {
        headerLang1.removeClass("done").prependTo($(".header"));
      }
    }
    if (w > 950) {
      if (we.hasClass("active")) {
        we.removeClass("active");
      }
    }
    if (w > 950) {
      if (we1.hasClass("active")) {
        we1.removeClass("active");
      }
    }
    if (w < 768) {
      $(".item-tab__title").addClass("mobile");
    } else {
      $(".item-tab__title").removeClass("mobile");
    }
  }
  function adaptive_function() {
    var w = $(window).outerWidth();
    var h = $(window).outerHeight();
    adaptive_header(w, h);
  }
  adaptive_function();
}
