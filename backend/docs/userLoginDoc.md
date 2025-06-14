# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: `POST`

### Description:
This endpoint is used to authenticate a user and provide a JWT token for accessing protected resources.

---

### Request Body:
The request body should be in JSON format and include the following fields:

```json
{
  "email": "string (valid email format)",
  "password": "string (min length: 6)"
}
```

---

### Response:

#### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string (user ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "socketId": "string (optional)"
  }
}
```

#### Error Responses:
1. **Validation Error:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "string (error message)",
         "param": "string (field name)",
         "location": "string (body)"
       }
     ]
   }
   ```

2. **Authentication Error:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

3. **Server Error:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
   ```json
   {
     "error": "string (error message)"
   }
   ```

---

### Example Usage:

#### Request:
```http
POST /users/login HTTP/1.1
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

---

### Notes:
- Ensure the `password` is securely compared using hashing.
- The `JWT_SECRET` environment variable must be set for token generation.
