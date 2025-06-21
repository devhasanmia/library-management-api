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

# API Endpoints

1. **Create Book**  
   `POST /api/books`

2. **Get All Books (with filtering & sorting)**  
   `GET /api/books?filter=&sortBy=&sort=&limit=`

3. **Get Book by ID**  
   `GET /api/books/:bookId`

4. **Update Book**  
   `PUT /api/books/:bookId`

5. **Delete Book**  
   `DELETE /api/books/:bookId`

6. **Borrow a Book**  
   `POST /api/borrow`

7. **Borrowed Books Summary (Aggregation)**  
   `GET /api/borrow`
## How to Install and Run

### 1. Clone the repository

```bash
git clone https://github.com/devhasanmia/library-management-api.git
cd library-management-api
npm install or yarn
```
#### Start the server
```bash
yarn dev
