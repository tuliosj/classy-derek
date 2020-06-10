const $window = $(window);

$window.on("load", () => {
  const $a = $("#title-container");
  const $b = $("#what-he-does");
  const $c = $("#welcome");

  const wrapper_height = $("#wrapper").height();
  const wrapper_width = $("#wrapper").width();
  const scroll_max = document.documentElement.scrollHeight - wrapper_height;

  $(this).scrollTop(0);
  $("#wrapper").css({ visibility: "visible" });

  if (document.documentElement.clientWidth >= 875) {
    const a_bottom = (document.documentElement.clientHeight - $a.height()) / 2;
    const a_right = (document.documentElement.clientWidth - $a.width()) / 2;

    const b_top = document.documentElement.clientHeight - $b.height() / 2;
    const b_left = document.documentElement.clientWidth - $b.width() / 2;

    // Default desktop
    $a.css({
      bottom: a_bottom,
      right: a_right,
    });
    $b.css({ top: b_top, left: b_left });
    $c.css({ top: document.documentElement.clientHeight, left: 0 });
    $("#footer").css({
      left: (document.documentElement.clientWidth - $("#footer").width()) / 2,
    });

    // Scroll desktop
    $window.scroll(() => {
      $a.css({
        bottom:
          ($window.scrollTop() / scroll_max) * 2 * wrapper_height + a_bottom,
        right: ($window.scrollTop() / scroll_max) * 2 * wrapper_width + a_right,
      });
      $b.css({
        top: b_top - ($window.scrollTop() / scroll_max) * wrapper_height * 0.75,
        left:
          b_left - ($window.scrollTop() / scroll_max) * wrapper_width * 0.75,
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
  } else {
    $("li").each(function (i) {
      $("li")
        .eq(i)
        .text(`• ${$("li").eq(i).text()}`);
    });

    const a_bottom = (document.documentElement.clientHeight - $a.height()) / 2;
    const a_right = (document.documentElement.clientWidth - $a.width()) / 2;

    const b_bottom = document.documentElement.clientHeight;
    const b_right = document.documentElement.clientWidth;

    // Default mobile
    $a.css({
      bottom: a_bottom,
      right: a_right,
    });
    $b.css({ bottom: b_bottom, right: b_right });
    $c.css({ top: document.documentElement.clientHeight, left: 0 });
    $("#footer").css({
      left: (document.documentElement.clientWidth - $("#footer").width()) / 2,
    });

    // Scroll mobile
    $window.scroll(() => {
      $a.css({
        bottom:
          ($window.scrollTop() / scroll_max) * 2 * wrapper_height + a_bottom,
        right: ($window.scrollTop() / scroll_max) * 2 * wrapper_width + a_right,
      });
      $b.css({
        bottom:
          b_bottom - ($window.scrollTop() / scroll_max) * wrapper_height * 0.75,
        right: (1 - $window.scrollTop() / scroll_max) * wrapper_width,
      });
      $c.css({
        top:
          document.documentElement.clientHeight -
          ($window.scrollTop() / scroll_max) * wrapper_height * 1.4,
      });
    });
  }
});
