document.getElementById("year").textContent = new Date().getFullYear();

function buildPlayer(id, extra) {
  var frame = document.createElement("iframe");
  frame.src =
    "https://www.youtube-nocookie.com/embed/" +
    id +
    "?autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&color=white" +
    (extra || "");
  frame.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  frame.allowFullscreen = true;
  return frame;
}

// Portfolio posters stay static until clicked, then swap in the player.
document.querySelectorAll(".video-facade").forEach(function (facade) {
  facade.addEventListener("click", function () {
    var frame = buildPlayer(facade.dataset.id);
    frame.title = facade.getAttribute("aria-label") || "Video";
    facade.replaceWith(frame);
  });
});

// Hero reel opens in a lightbox instead of leaving the site.
(function () {
  var trigger = document.getElementById("play-reel");
  var modal = document.getElementById("reel-modal");
  if (!trigger || !modal) return;

  var stage = document.getElementById("reel-modal-video");
  var lastFocus = null;

  function open(e) {
    e.preventDefault();
    lastFocus = document.activeElement;
    var frame = buildPlayer(trigger.dataset.id);
    frame.title = "Main Reel";
    stage.appendChild(frame);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
  }

  function close() {
    modal.hidden = true;
    stage.innerHTML = "";
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
  }

  trigger.addEventListener("click", open);

  modal.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-close")) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) close();
  });
})();
