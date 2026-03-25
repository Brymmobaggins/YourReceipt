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
    "Business Email Address",
  );
  synBusinessPhoneNo(
    "business-phone",
    "preview-phone-number",
    "Business Phone Number",
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
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}

function synBusinessPhoneNo(inputId, preveiewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(preveiewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}
