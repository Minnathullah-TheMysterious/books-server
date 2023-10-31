# BooksMMR API Documentation

Welcome to the BooksMMR API documentation. This API is open source and allows anyone to create, read, update, and delete books in the catalog. It provides endpoints for managing books in a simple catalog. Below, you will find information on how to use the various endpoints.

## Base URL

The base URL for this API is: https://localhost:8080

## End Points

### Get A List Of Books

### `GET /api/v1/book/fetch-all`

This endpoint allows you to retrieve a list of all books in the catalog.

### Request:

No request parameters are required for this endpoint.

### Response:

#### HTTP Status Code: 200 OK

#### Response Body:

{
"success": true,
"message": "Fetched all the books",
"books": [
{
"_id": "653f904597365ac11d60d972",
"title": "Power Systems",
"author": "Martin Crew",
"summary": "Energy can neither be created nor be destroyed...",
"createdAt": "2023-10-30T11:15:17.805Z",
"updatedAt": "2023-10-31T08:09:31.734Z",
"__v": 0
},
{
"_id": "653f904e97365ac11d60d978",
"title": "Strength Of Materials",
"author": "Virat King",
"summary": "Energy can neither be created nor be destroyed...",
"createdAt": "2023-10-30T11:15:26.968Z",
"updatedAt": "2023-10-30T11:15:26.968Z",
"__v": 0
},
//More Books
]
}

### Error Responses:

#### HTTP Status Code: 404 Not Found

#### Response Body:

{
"success": false,
"message": "No Books Found"
}

### Get A Book By ID

### `GET /api/v1/book/fetch/{ID}`

This endpoint allows you to retrieve information about a specific book by providing its unique ID.

### Request:

#### Path Parameters:

id (string, required): The unique identifier for the book.

### Response:

#### HTTP Status Code: 200 OK

#### Response Body:

{
"success": true,
"message": "Fetched the Book",
"book": {
"\_id": "6540c4a5ee57cd65afd19363",
"title": "Book-X",
"author": "Rahmani",
"summary": "Learn & Grow",
"createdAt": "2023-10-31T09:11:01.688Z",
"updatedAt": "2023-10-31T09:11:01.688Z",
"\_\_v": 0
}
}

### Error Response:

#### HTTP Status Code: 404 Not Found

#### Response Body:

{
"success": false,
"message": "Book Not Found"
}

#### HTTP Status Code: 400 Not Found

#### Response Body:

{
"success": false,
"message": "Invalid ID"
}

## Create Book

### `POST /api/v1/book/create`

This endpoint allows you to create a new book in the catalog.

### Request

#### Request Body:

{
"title": "Power Systems",
"author": "Martin Crew",
"summary": "Energy can neither be created nor be destroyed...",
}

### Response

#### HTTP Status Code: 201 Created

#### Response Body:

{
"success": true,
"message": "Book Created",
"book": {
"title": "Power Systems",
"author": "Martin Crew",
"summary": "Energy can neither be created nor be destroyed...",
"\_id": "6540d735b0cbeccdcc785fcb",
"createdAt": "2023-10-31T10:30:13.406Z",
"updatedAt": "2023-10-31T10:30:13.406Z",
"\_\_v": 0
}
}

### Error Response:

#### HTTP Status Code: 400 Not Found

#### Response Body:

{
"success": false,
"message": "Validation Error / Required Fields Error"
}

#### HTTP Status Code: 409 Not Found

#### Response Body:

{
"success": false,
"message": "Book with the same title already exists"
}

## Update A Book By ID

### `PUT /api/v1/update/{id}`

This endpoint allows you to update an existing book in the catalog by providing its unique ID.

### Request

#### Path Parameters:

id (string, required): The unique identifier for the book.

#### Request Body:

{
"title": "Power Systems",
"author": "Martin Crew",
"summary": "Energy can neither be created nor be destroyed...",
}

### Response:

#### HTTP Status Code: 200 OK

#### Response Body:

{
"success": true,
"message": "Book Updated",
"book": {
"\_id": "653f904097365ac11d60d96f",
"title": "Power Systems",
"author": "Martin Crew",
"summary": "Energy can neither be created nor be destroyed...",
"createdAt": "2023-10-30T11:15:12.848Z",
"updatedAt": "2023-10-31T03:55:27.920Z",
"\_\_v": 0
}
}

### Error Responses:

#### HTTP Status Code: 404 Not Found:

#### Response Body:

{
"success": false,
"message": "Book Not Found"
}

#### HTTP Status Code: 400 Not Found:

#### Response Body:

{
"success": false,
"message": "Invalid ID / Required Fields Error"
}

#### HTTP Status Code: 409 Not Found:

#### Response Body:

{
"success": false,
"message": "Book with the same name already exists",
"error": "error.message"
}

## Delete a Book by ID

### `DELETE /api/v1/book/{id}`

This endpoint allows you to delete a book from the catalog by providing its unique ID.

### Request:

#### Path Parameters:

id (string, required): The unique identifier for the book.

### Response:

#### HTTP Status Code: 200 OK

{
"success": true,
"message": "Book Deleted"
}

### Error Responses:

#### HTTP Status Code: 400 Not Found

{
"success": false,
"message": "Invalid ID"
}

#### HTTP Status Code: 404 Not Found

{
success: false,
message: "No book found with the provided ID",
}

# Conclusion

This BooksMMR catalog API allows anyone to create, read, update, and delete books in the catalog.
