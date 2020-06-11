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

  if (wrapper_width >= 875) {
    const a_bottom = (wrapper_height - $a.height()) / 2;
    const a_right = (wrapper_width - $a.width()) / 2;

    const b_top = wrapper_height - $b.height() / 2;
    const b_left = wrapper_width - $b.width() / 2;

    // Default desktop
    $a.css({
      bottom: a_bottom,
      right: a_right,
    });
    $b.css({ top: b_top, left: b_left });
    $c.css({ top: wrapper_height, left: 0 });
    $("#footer").css({
      left: (wrapper_width - $("#footer").width()) / 2,
    });

    // Scroll desktop
    $window.scroll(() => {
      $a.css({
        bottom:
          ($window.scrollTop() / scroll_max) * 2 * wrapper_height + a_bottom,
        right: ($window.scrollTop() / scroll_max) * 2 * wrapper_width + a_right,
      });
      $b.css({
        top: b_top - ($window.scrollTop() / scroll_max) * wrapper_height * 0.5,
        left: b_left - ($window.scrollTop() / scroll_max) * wrapper_width * 0.5,
      });
      $c.css({
        top:
          wrapper_height -
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

    const a_bottom = (wrapper_height - $a.height()) / 2;
    const a_right = (wrapper_width - $a.width()) / 2;

    const b_top = wrapper_height;
    const b_right = wrapper_width;

    const c_bottom = wrapper_height;

    // Default mobile
    $a.css({
      bottom: a_bottom,
      right: a_right,
    });
    $b.css({ top: b_top, right: b_right });
    $c.css({ bottom: c_bottom, left: 36 });
    $("#footer").css({
      left: (wrapper_width - $("#footer").width()) / 2,
    });

    // Scroll mobile
    $window.scroll(() => {
      $a.css({
        bottom:
          ($window.scrollTop() / scroll_max) * 2 * wrapper_height + a_bottom,
        right: ($window.scrollTop() / scroll_max) * 2 * wrapper_width + a_right,
      });
      $b.css({
        top: b_top - ($window.scrollTop() / scroll_max) * b_top,
        right:
          b_right -
          ($window.scrollTop() / scroll_max) * b_right +
          (wrapper_width - $b.width() - 48) / 2,
      });
      $c.css({
        bottom:
          c_bottom -
          ($window.scrollTop() / scroll_max) * (c_bottom + $c.height()),
      });
    });
  }
});
