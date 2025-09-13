const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector("#sizes");
const generateBtn = document.querySelector(".generateBtn");
const downloadBtn = document.querySelector(".downloadBtn");

const qrContainer = document.querySelector(".qr-body");
const qrImg = qrContainer.querySelector("img");

function updateButtonState() {
  if (qrText.value.trim() === "") {
    generateBtn.classList.add("disabled");
  } else {
    generateBtn.classList.remove("disabled");
  }
}

// Initial button state
updateButtonState();

// Update button state while typing
qrText.addEventListener("input", updateButtonState);

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = qrText.value;
  qrImg.style.display = "block";

  if (text && generateBtn.innerHTML === "Generate") {
    // Generate QR

    QRCode.toDataURL(text, function (err, url) {
      qrImg.setAttribute("src", url);
    });
    generateBtn.innerHTML = "Remove";
  } else if (generateBtn.innerHTML === "Remove") {
    // Clear QR + input
    qrImg.removeAttribute("src");
    qrText.value = "";
    generateBtn.innerHTML = "Generate";
    qrImg.style.display = "none";
  }
});
