import mask from "inputmask";
export default function val() {
  const imPhone = new Inputmask({
    mask: "+7 (999) 999-99-99",
    onincomplete: function (e) {
      $(e.target).addClass("err");
    },
    oncomplete: function (e) {
      $(e.target).removeClass("err");
    },
  });
  $(".input.phone").each((i, e) => {
    imPhone.mask($(e));
  });
  const imEmail = new Inputmask({
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    onincomplete: function (e) {
      $(e.target).addClass("err");
    },
    oncomplete: function (e) {
      $(e.target).removeClass("err");
    },
  });
  $(".input.email").each((i, e) => {
    imEmail.mask($(e));
  });
}
