document.getElementById("year").textContent = new Date().getFullYear();

// Portfolio posters stay static until clicked, then swap in the player.
document.querySelectorAll(".video-facade").forEach(function (facade) {
  facade.addEventListener("click", function () {
    var id = facade.dataset.id;
    var frame = document.createElement("iframe");
    frame.src =
      "https://www.youtube-nocookie.com/embed/" +
      id +
      "?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&color=white";
    frame.title = facade.getAttribute("aria-label") || "Video";
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    facade.replaceWith(frame);
  });
});
