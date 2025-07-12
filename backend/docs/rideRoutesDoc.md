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
- The `status` is set to `pending` when the ride is