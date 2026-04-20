<!-- @format -->

# Project description

yourreceipt is modern, web based invoice generator
designed to help users create professional invoices quickly and efficiently.

The application allow user dynamically add, edit and remove
invoice items while providing a real-time preview of the invoice. it automatically invoice amount, subtotal,tax,discount and finat total, ensuring accuracy without manual computation.




### logic for items on the table to be view

step 1: I read all the item-row with `.item-row`
step 2: for each row; get description, quantity and price.
step 3: calculate the amount with `amount = qty * price`
step 4: update the editable row amount

// added logic, when the button is clicked new role is created

// logic for delete rows
rowBody listens for all clicks inside the tbody
when you click the X button, e.target is that button
classList.contains("remove-btn") confirms it is a remove button
closest(".item-row") finds the exact row
row.remove() deletes that row
syncItemsToPreview() updates the preview immediately

// add height to preview table

<!-- print logic -->

for the print() function to work, i wrapped preview invoice in it own container. why did i do that? i need a clear section to target the print, and also keep the print logic simple. i really love where my print `button` is place. it is global action for the invoice page, the header placement makes more sense. i use `window.print()`, why? it is beginner friendly, keeps my current layout intact and easier to debug. so, when the `prinBtn` button is clicked i want user to the preview section only


+----------------------------------------------------------------------------------+
| yourreceipt [ Save ] [ Print ] |
| Simple receipts. Professional results. |
+----------------------------------------------------------------------------------+

+-----------------------------------+----------------------------------------------+
| CREATE INVOICE | LIVE PREVIEW |
| | |
| Business Info | yourreceipt |
| [Business Name______________] | ---------------------------------------- |
| [Address____________________] | Your Business Name |
| [Email______________________] | Address, Email, Phone |
| [Phone______________________] | |
| | Bill To: Invoice Info: |
| Customer Info | Customer Name Invoice #: YR-001 |
| [Customer Name_____________] | Customer Address Date: **/**/\_**\_ |
| [Customer Address**\_\_\_\_\***\*] | Customer Email Due: **/**/\_**\_ |
| | |
| Invoice Details | +----------------------------------------+ |
| [Invoice No: YR-001**\_****] | | Description | Qty | Price | Amount | |
| [Invoice Date____________] | +----------------------------------------+ |
| [Due Date________________] | | Item 1 | 2 | 500 | 1000 | |
| | | Item 2 | 1 | 700 | 700 | |
| Items | +----------------------------------------+ |
| +-----------------------------+ | |
| | Desc | Qty | Price | [x] | | Subtotal: 1700 |
| +-----------------------------+ | Tax: 170 |
| | [______________] [__] [__] | | Discount: 100 |
| | [______________] [__] [__] | | Total: 1770 |
| +-----------------------------+ | |
| [ + Add Item ] | Notes: |
| | **\*\*\*\***\*\***\*\*\*\***\_\_\_\_**\*\*\*\***\*\***\*\*\*\*** |
| Charges | |
| [Tax %__________] | |
| [Discount_______] | |
| | |
| Actions | |
| [ Generate Invoice ] | |
| [ Reset ] | |
+-----------------------------------+----------------------------------------------+