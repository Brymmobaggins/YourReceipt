/** @format */
const rowBody = document.querySelector("#row-body");
const addItemBtn = document.getElementById("add-item-btn");
const resetBtn = document.getElementById("reset");

const prinBtn = document.getElementById("print-btn")

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
  syncInputToPreview(
    "customer-name",
    "preview-customer-name",
    "Customer Address",
  );
  syncInputToPreview(
    "customer-address",
    "preview-customer-address",
    "Customer Address",
  );
  syncInputToPreview("invoice-number", "preview-invoice-number", "Invoice Number")

  syncItemsToPreview();
}

init();

function syncInputToPreview(inputId, previewId, fallback) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value || fallback;
  });
}

function formatMoney(value) {
  return value.toFixed(2);
}

function resetTextPreviews() {
  previewFieldConfigs.forEach(({ previewId, fallback }) => {
    document.getElementById(previewId).textContent = fallback;
  });
}

function createItemRow() {
  const newRow = document.createElement("tr");
  newRow.classList.add("item-row");
  newRow.innerHTML = `
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-desc border border-gray-400 w-full px-2 py-1 break-word"
                    type="text"
                  />
                </td>
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-qty border border-gray-400 w-full px-2 py-1"
                    type="number"
                    min="1"
                  />
                </td>
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-price border border-gray-400 w-full px-2 py-1"
                    type="text"
                  />
                </td>
                <td class="item-amount text-center whitespace-nowrap font-bold">
                  0.00
                </td>

                <td class="border border-gray-400 p-1.5 text-center">
                  <button
                    type="button"
                    class="remove-btn border text-center border-red-200 text-red-700 w-full rounded px-1 py-0.5 text-sm hover:bg-red-100 hover:cursor-pointer"
                  >
                    X
                  </button>
                </td>
  `;
  return newRow;
}
// Adds a new item row to the invoice input table and updates the preview accordingly.

function addNewRow() {
  const newRow = createItemRow();
  rowBody.appendChild(newRow);
  syncItemsToPreview();
}

addItemBtn.addEventListener("click", addNewRow);

function syncItemsToPreview() {
  const previewItemsBody = document.getElementById("preview-items-body");
  const previewSubtotal = document.getElementById("preview-subtotal");
  const previewTax = document.getElementById("preview-tax");
  const previewTotal = document.getElementById("preview-total");
  const previewDiscount = document.getElementById("preview-discount");

  let previewRowsHTML = "";
  let subTotal = 0;

  const itemRows = document.querySelectorAll(".item-row");
  itemRows.forEach((row) => {
    const desc = row.querySelector(".item-desc").value.trim();
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
    const price = parseFloat(row.querySelector(".item-price").value) || 0;
    const amount = price * qty;

    row.querySelector(".item-amount").textContent = formatMoney(amount);

    if (!desc && qty === 0 && price === 0) {
      return;
    }
    subTotal += amount;

    previewRowsHTML += `
      <tr class="text-center">
            <td>${desc}</td>
            <td>${qty}</td>
            <td>${formatMoney(price)}</td>
            <td>${formatMoney(amount)}</td>
      </tr>
    `;
  });

  if (previewRowsHTML.trim() === "") {
    previewItemsBody.innerHTML = `
      <tr>
        <td class="text-gray-900 text-center" colspan="4">No Items</td>
      </tr>`;
  } else {
    previewItemsBody.innerHTML = previewRowsHTML;
  }
  const taxInput = document.getElementById("tax");
  const taxRate = parseFloat(taxInput.value) || 0;
  const taxAmount = subTotal * (taxRate / 100);

  const discountInput = document.getElementById("discount");
  const discountRate = parseFloat(discountInput.value) || 0;
  const discountAmount = subTotal * (discountRate / 100);
  const total = subTotal + taxAmount - discountAmount;

  previewSubtotal.textContent = `Subtotal: ${formatMoney(subTotal)}`;
  previewTax.textContent = `Tax (${taxRate}%): ${formatMoney(taxAmount)}`;
  previewDiscount.textContent = `Discount (${discountRate}%): ${formatMoney(discountAmount)}`;
  previewTotal.textContent = `Total: ${formatMoney(total)}`;
}

document.addEventListener("input", function (e) {
  if (
    e.target.classList.contains("item-desc") ||
    e.target.classList.contains("item-qty") ||
    e.target.classList.contains("item-price") ||
    e.target.id === "tax" ||
    e.target.id === "discount"
  ) {
    syncItemsToPreview();
  }
});

rowBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    handleDeleteRow(e.target);
  }
});

//  function to delete row when x is clicked
function handleDeleteRow(btn) {
  const row = btn.closest(".item-row");
  if (row) {
    row.remove();
    syncItemsToPreview();
  }
}

prinBtn.addEventListener("click", function(){
  window.print()
})