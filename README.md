+----------------------------------------------------------------------------------+
| yourreceipt                                              [ Save ]   [ Print ]   |
| Simple receipts. Professional results.                                         |
+----------------------------------------------------------------------------------+

+-----------------------------------+----------------------------------------------+
| CREATE INVOICE                    | LIVE PREVIEW                                 |
|                                   |                                              |
| Business Info                     |  yourreceipt                                 |
| [Business Name______________]     |  ----------------------------------------    |
| [Address____________________]     |  Your Business Name                          |
| [Email______________________]     |  Address, Email, Phone                       |
| [Phone______________________]     |                                              |
|                                   |  Bill To:            Invoice Info:          |
| Customer Info                    |  Customer Name        Invoice #: YR-001       |
| [Customer Name_____________]      |  Customer Address     Date: __/__/____       |
| [Customer Address__________]      |  Customer Email       Due: __/__/____        |
|                                   |                                              |
| Invoice Details                  |  +----------------------------------------+  |
| [Invoice No: YR-001_______]      |  | Description | Qty | Price | Amount     |  |
| [Invoice Date____________]       |  +----------------------------------------+  |
| [Due Date________________]       |  | Item 1      |  2  | 500   | 1000       |  |
|                                   |  | Item 2      |  1  | 700   | 700        |  |
| Items                             |  +----------------------------------------+  |
| +-----------------------------+   |                                              |
| | Desc | Qty | Price | [x]    |   |                     Subtotal:     1700       |
| +-----------------------------+   |                     Tax:          170        |
| | [______________] [__] [__]  |   |                     Discount:     100        |
| | [______________] [__] [__]  |   |                     Total:        1770       |
| +-----------------------------+   |                                              |
| [ + Add Item ]                    |  Notes:                                      |
|                                   |  ________________________________________    |
| Charges                           |                                              |
| [Tax %__________]                 |                                              |
| [Discount_______]                 |                                              |
|                                   |                                              |
| Actions                           |                                              |
| [ Generate Invoice ]              |                                              |
| [ Reset ]                         |                                              |
+-----------------------------------+----------------------------------------------+


 

 ### logic for items on the table to be view
 step 1: I read all the item-row with `.item-row`
 step 2: for each row; get description, quantity and price.
 step 3: calculate the amount with `amount = qty * price`
 step 4: update the editable row amount
