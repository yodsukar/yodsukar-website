(function () {
  var ALLOW =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  var EMBED = "https://www.youtube-nocookie.com/embed/";

  document.getElementById("year").textContent = new Date().getFullYear();

  function player(id, params, title) {
    var frame = document.createElement("iframe");
    frame.src = EMBED + id + "?" + params;
    frame.title = title;
    frame.allow = ALLOW;
    frame.allowFullscreen = true;
    return frame;
  }

  // Hero: silent looping reel behind the poster. Skipped for visitors who
  // ask for less motion or less data; they keep the still poster instead.
  var loop = document.getElementById("reel-loop");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;

  function startLoop() {
    if (!loop || calm || saveData || loop.firstChild) return;
    var id = loop.dataset.loop;
    var frame = player(
      id,
      "autoplay=1&mute=1&playsinline=1&loop=1&playlist=" +
        id +
        "&controls=0&modestbranding=1&rel=0&iv_load_policy=3&cc_load_policy=0&disablekb=1",
      "Reel preview"
    );
    frame.tabIndex = -1;
    frame.setAttribute("aria-hidden", "true");
    frame.addEventListener("load", function () {
      // long enough for the player's start-up controls to fade on phones
      setTimeout(function () {
        loop.classList.add("ready");
      }, 3600);
    });
    loop.appendChild(frame);
  }

  function stopLoop() {
    if (!loop) return;
    loop.classList.remove("ready");
    loop.textContent = "";
  }

  // Pause control for the silent loop (anything moving > 5 s needs one)
  var pause = document.getElementById("reel-pause");
  var userPaused = false;
  var pauseLabel = pause && pause.querySelector(".sr-only");

  startLoop();

  if (pause && loop && loop.firstChild) {
    pause.hidden = false;
    pause.addEventListener("click", function () {
      userPaused = !userPaused;
      pause.setAttribute("aria-pressed", String(userPaused));
      pauseLabel.textContent = userPaused ? "Play the background preview" : "Pause the background preview";
      if (userPaused) stopLoop();
      else startLoop();
    });
  }

  // Every video link plays in a lightbox. Without scripts the same links
  // simply open the video on YouTube.
  var box = document.getElementById("lightbox");
  var stage = document.getElementById("lightbox-stage");

  if (box && typeof box.showModal === "function") {
    document.addEventListener("click", function (e) {
      var link = e.target.closest("[data-video]");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      stopLoop();
      box.classList.toggle("is-vertical", link.hasAttribute("data-vertical"));
      var client = link.querySelector(".client");
      var title = link.querySelector(".title");
      var label =
        link.dataset.title ||
        (client && title
          ? client.textContent + ": " + title.textContent
          : link.getAttribute("aria-label") || link.textContent.trim().replace(/\s+/g, " "));
      stage.appendChild(
        player(
          link.dataset.video,
          "autoplay=1&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&color=white",
          label
        )
      );
      document.getElementById("lightbox-title").textContent = label;
      document.getElementById("lightbox-yt").href = link.href;
      box.showModal();
    });

    document.getElementById("lightbox-close").addEventListener("click", function () {
      box.close();
    });

    // a click on the dialog itself (not its contents) is a click on the backdrop
    box.addEventListener("click", function (e) {
      if (e.target === box) box.close();
    });

    box.addEventListener("close", function () {
      stage.textContent = "";
      if (!userPaused) startLoop();
    });
  }

  // Copy email
  var copy = document.getElementById("copy-email");
  var status = document.getElementById("copy-status");

  if (copy && navigator.clipboard) {
    var original = copy.textContent;
    copy.addEventListener("click", function () {
      navigator.clipboard.writeText(copy.dataset.email).then(
        function () {
          copy.textContent = "Copied";
          status.textContent = "Email address copied";
          setTimeout(function () {
            copy.textContent = original;
            status.textContent = "";
          }, 2000);
        },
        function () {
          status.textContent = "Couldn't copy. The address is " + copy.dataset.email;
        }
      );
    });
  } else if (copy) {
    copy.hidden = true;
  }

  // Header gets a hairline once the page scrolls
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
