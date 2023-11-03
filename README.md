# BooksMMR

Welcome to the BooksMMR API documentation. This API is open source and allows anyone to create, read, update, and delete books in the catalog. It provides endpoints for managing books in a simple catalog. Below, you will find information on how to use the various endpoints.

## API Documentation

**Base URL**

The base URL for this API is: `https://localhost:8080`

### End Points

***Get A List Of Books***

**`GET /api/v1/book/fetch-all?page=1&limit=10`**

This endpoint allows you to retrieve a list of all books in the catalog.

***Request:***

No request parameters are required for this endpoint.

Query Parameters:

For pagination provide `'page'` & `'limit'` as query parameter

In case query parameters are not provided, first 10 books will appear in response. As page has been set to 1 and limit has been set to 10 by default.

***Response:***

**HTTP Status Code: 200 OK**

Response Body:
```javascript
{
   "success": true,
   "message": "Fetched all the books",
   "totalDocsCount": 7,
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
```
***Error Responses:***

**HTTP Status Code: 404 NOT FOUND**

Response Body:
```javascript
{"success": false, "message": "No Books Found"}
```
***Get A Book By ID***

**`GET /api/v1/book/fetch/{id}`**

This endpoint allows you to retrieve information about a specific book by providing its unique ID.

***Request:***

Path Parameters:

id (string, required): The unique identifier for the book.

***Response:***

**HTTP Status Code: 200 OK**

Response Body:
```javascript
{
   "success": true,
   "message": "Fetched the Book",
   "book": {
      "_id": "6540c4a5ee57cd65afd19363",
      "title": "Book-X",
      "author": "Rahmani",
      "summary": "Learn & Grow",
      "createdAt": "2023-10-31T09:11:01.688Z",
      "updatedAt": "2023-10-31T09:11:01.688Z",
      "__v": 0
   }
}
```
***Error Response:***

**HTTP Status Code: 404 NOT FOUND**

Response Body:
```javascript
{"success": false, "message": "Book Not Found"}
```
**HTTP Status Code: 400 BAD REQUEST**

Response Body:
```javascript
{"success": false, "message": "Invalid ID"}
```
***Create Book***

**`POST /api/v1/book/create`**

This endpoint allows you to create a new book in the catalog.

***Request***

Request Body:
```javascript
{
   "title": "Power Systems",
   "author": "Martin Crew",
   "summary": "Energy can neither be created nor be destroyed...",
}
```
***Response***

**HTTP Status Code: 201 Created**

Response Body:
```javascript
{
   "success": true,
   "message": "Book Created",
   "book": {
      "title": "Power Systems",
      "author": "Martin Crew",
      "summary": "Energy can neither be created nor be destroyed...",
      "_id": "6540d735b0cbeccdcc785fcb",
      "createdAt": "2023-10-31T10:30:13.406Z",
      "updatedAt": "2023-10-31T10:30:13.406Z",
      "__v": 0
   }
}
```
***Error Response:***

**HTTP Status Code: 400 BAD REQUEST**

Response Body:
```javascript
{"success": false, "message": "Validation Error / Required Fields Error"}
```
**HTTP Status Code: 409 CONFLICT**

Response Body:
```javascript
{
   "success": false,
   "message": "Book with the same title already exists"
}
```
***Update A Book By ID***

**`PUT /api/v1/book/update/{id}`**

This endpoint allows you to update an existing book in the catalog by providing its unique ID.

***Request***

Path Parameters:

id (string, required): The unique identifier for the book.

Request Body:
```javascript
{
 "title": "Power Systems",
 "author": "Martin Crew",
 "summary": "Energy can neither be created nor be destroyed...",
}
```
***Response:***

**HTTP Status Code: 200 OK**

Response Body:
```javascript
{
   "success": true,
   "message": "Book Updated",
   "book": {
      "_id": "653f904097365ac11d60d96f",
      "title": "Power Systems",
      "author": "Martin Crew",
      "summary": "Energy can neither be created nor be destroyed...",
      "createdAt": "2023-10-30T11:15:12.848Z",
      "updatedAt": "2023-10-31T03:55:27.920Z",
      "__v": 0
   }
}
```
***Error Responses:***

**HTTP Status Code: 404 NOT FOUND:**

Response Body:
```javascript
{"success": false, "message": "Book Not Found"}
```
**HTTP Status Code: 400 BAD REQUEST:**

Response Body:
```javascript
{"success": false, "message": "Invalid ID / Required Fields Error"}
```
**HTTP Status Code: 409 CONFLICT:**

Response Body:
```javascript
{
   "success": false,
   "message": "Book with the same name already exists",
   "error": "error.message"
}
```
***Delete a Book by ID***

**`DELETE /api/v1/book/delete/{id}`**

This endpoint allows you to delete a book from the catalog by providing its unique ID.

***Request:***

Path Parameters:

id (string, required): The unique identifier for the book.

***Response:***

**HTTP Status Code: 200 OK**
```javascript
{"success": true, "message": "Book Deleted"}
```
***Error Responses:***

**HTTP Status Code: 400 BAD REQUEST**
```javascript
{"success": false, "message": "Invalid ID"}
```
**HTTP Status Code: 404 NOT FOUND**
```javascript
{
success: false,
message: "No book found with the provided ID",
}
```
***Search Books By Author Name Or Book Title***

**`POST /api/v1/book/search?page=1&limit=10`**

This endpoint allows you to search books from the catalog by providing author name or book title.

Query Parameters:

For pagination provide `'page'` & `'limit'` as query parameter

In case query parameters are not provided, first 10 books will appear in response. As page has been set to 1 and limit has been set to 10 by default.

***Request:***

Request Body:
```javascript
{"searchInput": "BookName/AuthorName"}
```
***Response:***

**HTTP Status Code: 200 OK**
```javascript
{
   "success": true,
   "message": "Book Found",
   "books": [
   {
      "_id": "653f905e97365ac11d60d97e",
      "title": "Book-G",
      "author": "Rahmani",
      "summary": "Learn & Grow",
      "createdAt": "2023-10-30T11:15:42.524Z",
      "updatedAt": "2023-10-30T11:15:42.524Z",
      "__v": 0
   },
   //more books if found..
   ]
}
```
***Error Responses:***

**HTTP Status Code: 400 BAD REQUEST**
```javascript
{ success: false, message: "Please provide an input to search" }
```
**HTTP Status Code: 404 NOT FOUND**
```javascript
{ success: false, message: "Search Results Not Found"}
```
## Setting Up and Running the Application Locally

To run this application on your local machine, follow these steps:

**1. Clone the Repository:**

```git clone https://github.com/minnathullah-TheMysterious/books-server.git```

**2. Navigate to the Project Directory:**

```cd books-server```

**3. Install Dependencies:**

Run the following command to install the required dependencies:
```npm install```

**4. Database Setup:**

Create a new file .env in the root directory of the project.
Open the .env file and set the value for `DB_URL` variable which is the database path

**5. Start the Development Server:**

After the dependencies are installed, start the development server with the following command:
```npm run server```

**6. Access the Application:**

Once the server is running, you can access the application in your web browser at:
```http://localhost:8080```

**7. Explore the Application:**

You are now ready to explore and interact with the application locally.

## Deployment

This section outlines the steps for deploying the Node.js application on Vercel.

**Prerequisites**

Before deploying the application, make sure you have the following:

- A Vercel account. If you don't have one, sign up at [Vercel](https://vercel.com/).

**Deployment on Vercel**

Follow these steps to deploy your Node.js application on Vercel:

1. **Connect Your GitHub Repository:**

   - Log in to your Vercel account.

   - Click the "Import Project" button in your Vercel dashboard.

   - Select the GitHub repository for your Node.js application.

   - Configure the deployment settings in your `vercel.json` file.

2. **Environment Variables:**

   - In the Vercel project settings, navigate to the "Environment Variables" section.

   - Add environment variables that correspond to your production environment settings.

3. **Deployment:**

   - After setting up the environment variables, click the "Deploy" button.

   - Vercel will automatically build and deploy your Node.js application along with the React build.

4. **Access Your Deployed Application:**

   - Once the deployment is complete, Vercel will provide you with a unique URL for your application. You can access your live application by visiting this URL.

## Conclusion

This BooksMMR catalog API allows anyone to create, read, update, and delete books in the catalog.
