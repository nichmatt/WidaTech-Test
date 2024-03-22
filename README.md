# WidaTech-Test

### server installation

- open new terminal and hit command cd Server/
- npm install
- npx sequelize db:create
- npx sequelize db:migrate
- nodemon app.js

### client installation

- open terminal and hit command cd client/
- npm install
- npm run dev

## Section 1 - Add invoice with autocomplete for product input

- this is the overview of page Add Invoice.

![Alt text](./doc-asset/Screenshot%202024-03-22%20070419.png)

- Autocomplete product suggestions as the user types. Each product include product name, product picture, stock, and the price of the product.

![Alt text](./doc-asset/Screenshot%202024-03-22%20070437.png)

- Form cannot be submitted when at least one of the input boxes are empty

![Alt text](<./doc-asset/Screenshot%20(773).png>)

- POST API called using fetch or axios to save the invoice to database.

### POST/invoices

success response:

```JSON
{
    "message": "Invoice created"
}
```

![Alt text](./doc-asset/Screenshot%202024-03-22%20071849.png)

## Section 2 - Invoice card

- After the user submit the form. they will redirected to the List invoice page.

### GET/invoices

success response:

```JSON
{
    "invoices": [
        {
            "id": 32,
            "date": "2025-03-01T17:00:00.000Z",
            "customerName": "Abigail sharon",
            "salesPersonName": "Wendy walt",
            "notes": "Series G24",
            "productsSold": "1 of Piano.",
            "totalPrice": 10000000,
            "createdAt": "2024-03-22T00:18:56.916Z",
            "updatedAt": "2024-03-22T00:18:56.916Z"
        },

    ],
    "count": 5,
    "totalData": 34
}

```

- count is the page count
- totalData is the total of the data
- order by date DESC

![Alt text](./doc-asset/Screenshot%202024-03-22%20071906.png)

### Section 3 - Time-series graph

- The page of revenue sumerize

### GET/revenue/daily

success response:

```JSON
{
    "label": [
        "29 February 2024",
        "21 March 2024",
        "22 March 2024",
        "23 March 2024",
        "30 March 2024",
        "21 April 2024",
        "28 February 2025",
        "1 March 2025",
        "1 January 1970"
    ],
    "data": [
        "10000000",
        "38000000",
        "10000000",
        "5000000",
        "5000000",
        "2000000",
        "3000000",
        "10000000",
        null
    ]
}
```

![Alt text](./doc-asset/Screenshot%202024-03-22%20072025.png)

### GET/revenue/monthly

success response:

```JSON
{
    "label": [
        "February 2024",
        "March 2024",
        "April 2024",
        "February 2025",
        "March 2025"
    ],
    "data": [
        "10000000",
        "58000000",
        "2000000",
        "3000000",
        "10000000"
    ]
}
```

![Alt text](./doc-asset/Screenshot%202024-03-22%20072053.png)

### GET/revenue/yearly

success response:

```JSON
{
    "label": [
        "2024",
        "2025"
    ],
    "data": [
        "70000000",
        "13000000"
    ]
}
```

![Alt text](./doc-asset/Screenshot%202024-03-22%20072103.png)
