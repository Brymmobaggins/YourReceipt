/** @format */

function init() {
  syncBusinessNameToPreview(
    "business-name",
    "preview-business-name",
    "Business Name",
  );
  syncBusinessAddressToPreview(
    "business-address",
    "preview-business-address",
    "Business Address",
  );
  syncBusinessEmailtoPreview(
    "business-email",
    "preview-business-email",
    "email Address",
  );
}

init();

function syncBusinessNameToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}
function syncBusinessAddressToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}
function syncBusinessEmailtoPreview(inputId, previewId, fallback) {
  const input = document.getElementsById(inputId);
  const preview = document.getElementById(previewId);
  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}
