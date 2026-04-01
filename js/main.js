/** @format */

const addItemBtn = document.getElementById("add-item-btn");
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
  // syncItemsToPreview();
}
init();

function syncInputToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}
// function cleaRow(){
//   const ro
// }
function syncItemsToPreview() {
  const itemRows = document.querySelectorAll(".item-row");
  const previewItemsBody = document.getElementById("preview-items-body");
  let previewRowsHTML = "";

  itemRows.forEach((row) => {
    const desc = row.querySelector(".item-desc").value.trim();
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const amount = price * qty;

    row.querySelector(".item-amount").textContent = amount.toFixed(2);

    if (!desc && qty === 0 && price === 0) {
      return;
    } else {
      previewRowsHTML += `
        <tr class="text-center">
              <td>${desc}</td>
              <td>${qty}</td>
              <td>${price.toFixed(2)}</td>
              <td>${amount.toFixed(2)}</td>
        </tr>
        `;
    }
  });

  if (previewRowsHTML === "") {
    previewItemsBody.innerHTML = `
      <tr class="col-span-4 align-center">
        <td class="text-gray-900 text-center" colspan="4">No Items</td>
      </tr>`;
  } else {
    previewItemsBody.innerHTML = previewRowsHTML;
  }
}


function addNewRow() {
  const rowBody = document.querySelector("#row-body");
  const newRow = document.createElement("tr");
  // newRow.classList.add("item-row");
  newRow.innerHTML = `
    <td><input type="text" class="item-desc" placeholder="Description"></td>
    <td><input type="number" class="item-qty" min="0" step="1" placeholder="Qty"></td>
    <td><input type="number" class="item-price" min="0" step="0.01" placeholder="Price"></td>
    <td class="item-amount">0.00</td>
  `;
  rowBody.appendChild(newRow);

  syncItemsToPreview()
}
    

addItemBtn.addEventListener("click", addNewRow);

document.addEventListener("input", function (e) {
  if (
    e.target.classList.contains("item-desc") ||
    e.target.classList.contains("item-qty") ||
    e.target.classList.contains("item-price")
  ) {
    syncItemsToPreview();
  }
});
