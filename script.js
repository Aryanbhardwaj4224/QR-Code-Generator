const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector("#sizes");
const generateBtn = document.querySelector(".generateBtn");
const downloadBtn = document.querySelector(".downloadBtn");

const qrContainer = document.querySelector(".qr-body");
const qrImg = qrContainer.querySelector("img");

// --------------------- Button State Management ---------------------

// Enable or disable the Generate button based on input value
function updateButtonState() {
  if (qrText.value.trim() === "") {
    generateBtn.classList.add("disabled");
  } else {
    generateBtn.classList.remove("disabled");
  }
}

// Disable download button initially
downloadBtn.classList.add("disabled");

// Run once on page load
updateButtonState();

// Update Generate button state as user types
qrText.addEventListener("input", updateButtonState);

// --------------------- Generate / Remove QR Code ---------------------

generateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = qrText.value;

  if (text && generateBtn.innerHTML === "Generate") {
    // Generate new QR code
    qrImg.style.display = "block";

    QRCode.toDataURL(text, function (err, url) {
      qrImg.setAttribute("src", url);

      // Enable the download button and set its link
      downloadBtn.classList.remove("disabled");
      downloadBtn.href = url;              // set QR image as href
      downloadBtn.download = "qrcode.png"; // file name for download
    });

    generateBtn.innerHTML = "Remove";

  } else if (generateBtn.innerHTML === "Remove") {
    // Remove QR code and reset input
    qrImg.removeAttribute("src");
    qrText.value = "";
    qrImg.style.display = "none";
    generateBtn.innerHTML = "Generate";

    // Disable the download button again
    downloadBtn.classList.add("disabled");

    // Update Generate button state
    updateButtonState();
  }
});

// --------------------- QR Code Size Handling ---------------------

sizes.addEventListener("change", (size) => {
  // Adjust QR image size based on selected value
  qrImg.style.width = `${size.target.value}px`;
  qrImg.style.height = `${size.target.value}px`;
});

// --------------------- Download Logic ---------------------

// (Download button logic is handled inside the Generate click listener above)
