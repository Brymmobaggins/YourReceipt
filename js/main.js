/** @format */

function init() {
  syncInputToPreview("business-name", "preview-business-name", "Business Name");
  syncInputToPreview(
    "business-address",
    "preview-business-address",
    "Business Address",
  );
  syncInputToPreview(
    "business-email",
    "preview-business-email",
    "Business Email Address",
  );
  syncInputToPreview(
    "business-phone",
    "preview-phone-number",
    "Business Phone Number",
  );
  syncInputToPreview("customer-name", "preview-customer-name", "Customer Name");
  syncInputToPreview(
    "customer-address",
    "preview-customer-address",
    "Customer Address",
  );

  syncInputToPreview(
    "invoice-number",
    "preview-invoice-number",
    "Invoice number",
  );
  syncInputToPreview(
    "invoice-date",
    "preview-invoice-date",
    "Invoice Date",
  );
}
init();

function syncInputToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}

