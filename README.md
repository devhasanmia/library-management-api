# Library Management API
Welcome to the Library Management API documentation built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

## 📖 Models & Validation
### Book Model

| Field       | Type    | Required | Validation / Notes                              |
|-------------|---------|----------|-----------------------------------------------|
| `title`     | string  | Yes      | Book’s title                                  |
| `author`    | string  | Yes      | Book’s author                                 |
| `genre`     | string  | Yes      | One of: `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY` |
| `isbn`      | string  | Yes      | Unique ISBN number                            |
| `description` | string | No       | Brief summary or description                   |
| `copies`    | number  | Yes      | Non-negative integer representing total copies |
| `available` | boolean | No       | Defaults to `true` indicating availability   |

---

### Borrow Model

| Field     | Type     | Required | Validation / Notes                            |
|-----------|----------|----------|-----------------------------------------------|
| `book`    | ObjectId | Yes      | References the borrowed book’s ID             |
| `quantity`| number   | Yes      | Positive integer, number of copies borrowed   |
| `dueDate` | Date     | Yes      | Date by which the book must be returned       |

