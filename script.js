const track = document.querySelector(".track");
const panels = document.querySelectorAll(".panel");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pdfOverlay = document.getElementById("pdfViewerOverlay");
const pdfFrame = document.getElementById("pdfFrame");
const fileName = document.getElementById("fileName");
const closeViewer = document.getElementById("closeViewer");

let index = 0;

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Buttons
prev.onclick = () => {
  index = Math.max(0, index - 1);
  updateSlide();
};

next.onclick = () => {
  index = Math.min(panels.length - 1, index + 1);
  updateSlide();
};

// Keyboard navigation
document.addEventListener("keydown", e => {
  if(e.key === "ArrowRight") next.click();
  if(e.key === "ArrowLeft") prev.click();
});

// Touch / Swipe Support
let startX = 0;
let endX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if(diff < -50) next.click();     // swipe left
  if(diff > 50) prev.click();     // swipe right
});

panels.forEach(panel => {
  panel.addEventListener("click", () => {
    let pdfPath = panel.getAttribute("data-pdf");

    if (!pdfPath) {
      alert("No PDF linked for this comic yet.");
      return;
    }

    // 🔧 Auto-fix path issues
    if (pdfPath.startsWith("/")) {
      pdfPath = pdfPath.slice(1);   // remove leading slash
    }

    // Optional: log to verify
    console.log("Loading PDF:", pdfPath);

    fileName.textContent = panel.dataset.title || "Comic Reader";
    pdfFrame.src = pdfPath;
    pdfOverlay.style.display = "flex";
  });
});




// Close PDF viewer
closeViewer.onclick = () => {
  pdfOverlay.style.display = "none";
  pdfFrame.src = "";
};
