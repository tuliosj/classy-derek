const $window = $(window);
const $a = $("#title-container");
const $b = $("#what-he-does");
const $c = $("#welcome");

const a_bottom = (document.documentElement.clientHeight - $a.height()) / 2;
const a_right = (document.documentElement.clientWidth - $a.width()) / 2;

const b_top = document.documentElement.clientHeight - $b.height() / 2;
const b_left = document.documentElement.clientWidth - $b.width() / 2;

const scroll_max =
  document.documentElement.scrollHeight -
  document.documentElement.clientHeight / 2;
const wrapper_height = $("#wrapper").height();
const wrapper_width = $("#wrapper").width();

$(document).ready(() => {
  $(this).scrollTop(0);
  $("#wrapper").css({ visibility: "visible" });
  $a.css({
    bottom: a_bottom,
    right: a_right,
  });
  $b.css({ top: b_top, left: b_left });
  $c.css({ top: document.documentElement.clientHeight, left: 0 });
  $("#footer").css({
    left: (document.documentElement.clientWidth - $("#footer").width()) / 2,
  });
});

$window.scroll(() => {
  $a.css({
    bottom: ($window.scrollTop() / scroll_max) * 2 * wrapper_height + a_bottom,
    right: ($window.scrollTop() / scroll_max) * 2 * wrapper_width + a_right,
  });
  $b.css({
    top: b_top - ($window.scrollTop() / scroll_max) * wrapper_height * 0.75,
    left: b_left - ($window.scrollTop() / scroll_max) * wrapper_width * 0.75,
  });
  $c.css({
    top:
      document.documentElement.clientHeight -
      ($window.scrollTop() / scroll_max) * wrapper_height * 1.4,
    left:
      375 +
      ($window.scrollTop() / scroll_max) * wrapper_width * 0.2 -
      $c.width(),
  });
});
