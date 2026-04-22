/** @format */
const rowBody = document.querySelector("#row-body");
const addItemBtn = document.getElementById("add-item-btn");
const resetBtn = document.getElementById("reset-btn");
const prinBtn = document.getElementById("print-btn");
const saveBtn = document.getElementById("save-btn");

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
  syncInputToPreview("customer-name", "preview-customer-name", "Customer Name");
  syncInputToPreview(
    "customer-address",
    "preview-customer-address",
    "Customer Address",
  );
  syncInputToPreview(
    "invoice-number",
    "preview-invoice-number",
    "Invoice Number",
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

function formatMoney(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(value);
}

function createItemRow() {
  const newRow = document.createElement("tr");
  newRow.classList.add("item-row");
  newRow.innerHTML = `
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-desc border border-gray-400 w-full 
                    px-2 py-1 break-word"
                    type="text"
                    data-invoice-field
                  />
                </td>
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-qty border border-gray-400 w-full px-2 py-1"
                    type="number"
                    min="1"
                    data-invoice-field
                  />
                </td>
                <td class="border border-gray-400 p-1.5">
                  <input
                    class="item-price border border-gray-400 w-full px-2 py-1"
                    type="text"
                    data-invoice-field
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
// Adds a new item row to the invoice input table and updates the preview accordingly and save to the local storage

function addNewRow() {
  const newRow = createItemRow();
  rowBody.appendChild(newRow);
  syncItemsToPreview();
  saveInvoiceData();
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
  let index = 1;

  const itemRows = document.querySelectorAll(".item-row");
  itemRows.forEach((row, index) => {
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
      <tr class="p-2 sapce-y-1.5">

            <td class="text-gray-600 text-center p-2 border border-gray-400">${(index += 1)}</td>
            <td class="text-gray-600 text-center p-2 border border-gray-400">${desc}</td>
            <td class="text-gray-600 text-center p-2 border border-gray-400">${qty}</td>
            <td class="text-gray-600 text-center p-2 border border-gray-400">${formatMoney(price)}</td>
            <td class="text-gray-600 text-center p-2 border border-gray-400">${formatMoney(amount)}</td>
      </tr>
    `;
  });

  if (previewRowsHTML.trim() === "") {
    previewItemsBody.innerHTML = `
      <tr>
        <td class="text-center text-gray-600 p-2" colspan="5">No Items</td>
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

  previewSubtotal.textContent = `${formatMoney(subTotal)}`;
  previewTax.textContent = ` ${formatMoney(taxAmount)}`;
  previewDiscount.textContent = `${formatMoney(discountAmount)}`;
  previewTotal.textContent = `${formatMoney(total)}`;

  saveInvoiceData();
}

document.addEventListener("input", function (e) {
  if (e.target.hasAttribute("data-invoice-field")) {
    syncItemsToPreview();
    saveInvoiceData();
  }
});

rowBody.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    handleDeleteRow(e.target);
  }
});

//  function to delete row when x butoon is clicked
function handleDeleteRow(btn) {
  const row = btn.closest(".item-row");
  if (row) {
    row.remove();
    syncItemsToPreview();
    saveInvoiceData();
  }
}

prinBtn.addEventListener("click", function () {
  window.print();
});

function getInvoiceData() {
  const businessName = document.getElementById("business-name").value;
  const businessAddress = document.getElementById("business-address").value;
  const businessEmail = document.getElementById("business-email").value;
  const businessPhone = document.getElementById("business-phone").value;

  const customerName = document.getElementById("customer-name").value;
  const customerAddress = document.getElementById("customer-address").value;

  const invoiceNumber = document.getElementById("invoice-number").value;
  const invoiceDate = document.getElementById("invoice-date").value;

  const tax = parseFloat(document.getElementById("tax").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;

  const items = [];
  const itemsRows = document.querySelectorAll(".item-row");

  itemsRows.forEach((row) => {
    const desc = row.querySelector(".item-desc").value.trim();
    const qty = parseFloat(row.querySelector(".item-qty").value) || 0;
    const price = parseFloat(row.querySelector(".item-price").value) || 0;

    if (!desc && qty === 0 && price === 0) {
      return;
    }
    items.push({ desc, qty, price });
  });

  const invoiceData = {
    business: {
      name: businessName,
      address: businessAddress,
      email: businessEmail,
      phone: businessPhone,
    },
    customer: {
      name: customerName,
      address: customerAddress,
    },
    invoice: {
      number: invoiceNumber,
      date: invoiceDate,
    },
    charges: {
      tax,
      discount,
    },
    items,
  };
  return invoiceData;
}

function loadInvoiceData() {
  const savedData = localStorage.getItem("invoiceData");
  const previewInvoiceNumber = document.getElementById(
    "preview-invoice-number",
  );
  const invoiceNumberInput = document.getElementById("invoice-number");

  if (!savedData) {
    const newInvoiceNumber = generateInvoiceNumber();
    invoiceNumberInput.value = newInvoiceNumber;
    previewInvoiceNumber.textContent = newInvoiceNumber;

    const invoiceDate = document.getElementById("invoice-date");
    invoiceDate.value = getTodayDate();

    return;
  }

  const invoiceData = JSON.parse(savedData);

  const restoredInvoiceNumber =
    invoiceData.invoice.number || generateInvoiceNumber();
  invoiceNumberInput.value = restoredInvoiceNumber;
  previewInvoiceNumber.textContent = restoredInvoiceNumber;

  document.getElementById("business-name").value =
    invoiceData.business.name || "";
  document.getElementById("business-address").value =
    invoiceData.business.address || "";
  document.getElementById("business-email").value =
    invoiceData.business.email || "";
  document.getElementById("business-phone").value =
    invoiceData.business.phone || "";

  document.getElementById("customer-name").value =
    invoiceData.customer.name || "";
  document.getElementById("customer-address").value =
    invoiceData.customer.address || "";

  document.getElementById("invoice-date").value =
    invoiceData.invoice.date || getTodayDate();

  document.getElementById("tax").value = invoiceData.charges.tax || "";
  document.getElementById("discount").value =
    invoiceData.charges.discount || "";

  rowBody.innerHTML = "";

  //  restore items
  invoiceData.items.forEach((item) => {
    const newRow = createItemRow();
    newRow.querySelector(".item-desc").value = item.desc || "";
    newRow.querySelector(".item-qty").value = item.qty || "";
    newRow.querySelector(".item-price").value = item.price || "";
    rowBody.appendChild(newRow);
  });

  if (invoiceData.items.length === 0) {
    addNewRow();
  }
  syncItemsToPreview();

  document.querySelectorAll("[data-invoice-field]").forEach((input) => {
    input.dispatchEvent(new Event("input"));
  });
}
loadInvoiceData();

// this function job is to call the `getInvoiceData()` converts the result to JSON, and store it in local storage. why did i convert plain object to string? because local storage can not store plain object directly, it only stores strings.
function saveInvoiceData() {
  const invoiceData = getInvoiceData();
  localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
}
saveBtn.addEventListener("click", saveInvoiceData);

// find all inputs with `data-invoice-field` attribute and trigger their `input` events.
document.querySelectorAll("[data-invoice-field]").forEach((input) => {
  input.dispatchEvent(new Event("input"));
});

// fuction to reset
function resetInvoice() {
  document.querySelectorAll("input").forEach((input) => {
    input.value = "";
  });

  // clear items row
  rowBody.innerHTML = "";
  document.getElementById("invoice-date").value = getTodayDate();

  addNewRow();
  localStorage.removeItem("invoiceData");

  // reset preveiew text
  document.querySelectorAll("[data-invoice-field]").forEach((input) => {
    input.dispatchEvent(new Event("input"));
  });

  // reset total and preview table
  syncItemsToPreview();
}
resetBtn.addEventListener("click", resetInvoice);

function generateInvoiceNumber() {
  let counter = localStorage.getItem("invoiceCounter");

  if (!counter) {
    counter = 1;
  } else {
    counter = parseInt(counter) + 1;
  }
  localStorage.setItem("invoiceCounter", counter);

  return `INVOICE NO-${String(counter).padStart(4, "0")}`;
}

console.log(generateInvoiceNumber());

function getTodayDate() {
  const today = new Date();

  return today.toISOString().split("T")[0];
}
