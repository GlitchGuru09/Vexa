# Ride Routes Documentation

This document explains the `/api/ride/create` endpoint, its parameters, expected responses, and error handling.

---

## POST `/api/ride/create`

Creates a new ride request in the system.

### Request Body Parameters

| Parameter     | Type   | Required | Description                                 |
|---------------|--------|----------|---------------------------------------------|
| pickup        | string | Yes      | The pickup location (min 3 characters)      |
| destination   | string | Yes      | The drop location (min 3 characters)        |
| vehicleType   | string | Yes      | Type of vehicle: `auto`, `car`, `motorcycle`|

**Example:**
```json
{
  "pickup": "cortalim",
  "destination": "margao",
  "vehicleType": "car"
}
```

### Authentication

- Requires user to be logged in (JWT/session).

---

### Success Response

- **Status:** 201 Created
- **Body:**
  ```json
  {
    "user": "685697eb77e0044093ebfb64",
    "pickup": "cortalim",
    "dropLocation": "margao",
    "fare": 405.246,
    "status": "pending",
    "otp": "521368",
    "_id": "687220e1cc735765fd7f375a",
    "__v": 0
  }
  ```

---

### Error Responses

- **Status:** 400 Bad Request
  - Missing or invalid parameters (pickup, destination, vehicleType).
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid pickup address.",
          "param": "pickup",
          "location": "body"
        }
      ]
    }
    ```

- **Status:** 401 Unauthorized
  - User is not authenticated.

- **Status:** 500 Internal Server Error
  - Server error or failure in ride creation.
  - Example:
    ```json
    {
      "error": "User, pickup, dropLocation and vehicleType are required"
    }
    ```

---

### Notes

- The `fare` is calculated based on the distance between pickup and destination and the selected vehicle type.
- The `otp` field is generated for ride verification and is not returned in queries by default (for security).
- The `status` is set to `pending` as default


## GET `/api/ride/fare`

**Description:**  
Calculates and returns the estimated fare for a ride between a pickup and destination location for all vehicle types.

---

### **Request**

- **Method:** `GET`
- **URL:** `/api/ride/get-fare`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>` (required, user must be authenticated)

- **Query Parameters:**
  - `pickup` (string, required): The pickup address or location. Must be at least 3 characters.
  - `destination` (string, required): The destination address or location. Must be at least 3 characters.

**Example:**
```
GET /api/ride/fare?pickup=Connaught%20Place&destination=India%20Gate
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

### **Responses**

#### **Success**
- **Status:** `200 OK`
- **Body:**
    ```json
    {
      "auto": 120.5,
      "car": 180.75,
      "motorcycle": 98.2
    }
    ```
  - Each key represents a vehicle type and its calculated fare.

#### **Validation Error**
- **Status:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid pickup address.",
          "param": "pickup",
          "location": "query"
        },
        {
          "msg": "Invalid destination address.",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

#### **Authentication Error**
- **Status:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

#### **Server Error**
- **Status:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Error message describing the problem"
    }
    ```

---

### **Notes**
- Both `pickup` and `destination` must be valid strings with at least 3 characters.
- The user must be authenticated (valid JWT token in the `Authorization` header).
- The response contains fare estimates for all supported vehicle types.