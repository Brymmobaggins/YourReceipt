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
  syncInputToPreview("invoice-date", "preview-invoice-date", "Invoice Date");
}
init();

function syncInputToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}

function syncTableItemToPreview() {
  const itemRow = document.querySelectorAll(".item-row");
  const previewItemsBody = document.getElementById("preview-items-body");

  let previewRowsHTML = "";

  // if(previewRowsHTML === ""){
  //   previewItemsBody.innerHTML =`
  //    <tr>
  //      <td colspan="4">No item added</td>
  //    </tr>
  //   `
  // }

  itemRow.forEach((row) => {
    const desc = row.querySelector(".item-desc").value || "item";
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;

    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const amount = price * qty;

    row.querySelector(".item-amount").textContent = amount.toFixed(2);

    previewRowsHTML += `
     <tr class="text-center">
       <td>${desc}</td>
       <td>${qty}</td>
       <td>${price.toFixed(2)}</td>
       <td>${amount}</td>
     </tr>
    
    
    `;
  });
  previewItemsBody.innerHTML = previewRowsHTML;
}

document.addEventListener("input", function (e) {
  if (
    e.target.classList.contains("item-desc") ||
    e.target.classList.contains("item-qty") ||
    e.target.classList.contains("item-price")
  ) {
    syncTableItemToPreview();
  }
});
