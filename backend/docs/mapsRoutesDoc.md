# Maps Routes Documentation

This document describes the API endpoints for map-related operations in the backend.

## 1. GET `/api/maps/get-coordinates`

Retrieves the latitude and longitude for a given address using the Google Maps Geocoding API.

### Query Parameters
- `address` (string, required): The address to geocode. Must be at least 3 characters long.

### Authentication
- Requires user to be logged in (JWT or session-based).

### Success Response
- **Status:** 200 OK
- **Body:**
  ```json
  {
    "ltd": <latitude>,
    "lang": <longitude>
  }
  ```

### Error Responses
- **Status:** 400 Bad Request
  - Missing or invalid `address` parameter.
- **Status:** 401 Unauthorized
  - User is not authenticated.
- **Status:** 404 Not Found
  - No results found for the given address.
- **Status:** 500 Internal Server Error
  - Error fetching coordinates or server error.

---

## 2. GET `/api/maps/get-distance-time`

Retrieves the distance and estimated travel time between two locations using the Google Maps Distance Matrix API.

### Query Parameters
- `origin` (string, required): The starting address or location. Must be at least 3 characters long.
- `destination` (string, required): The destination address or location. Must be at least 3 characters long.

### Authentication
- Requires user to be logged in (JWT or session-based).

### Success Response
- **Status:** 200 OK
- **Body:**
  ```json
  {
    "distance": { "text": "5.2 km", "value": 5200 },
    "duration": { "text": "12 mins", "value": 720 },
    ...
  }
  ```
  (The response contains the distance, duration, and other details as provided by the Google Maps API.)

### Error Responses
- **Status:** 400 Bad Request
  - Missing or invalid `origin` or `destination` parameter.
- **Status:** 401 Unauthorized
  - User is not authenticated.
- **Status:** 404 Not Found
  - No distance and time data found for the given locations.
- **Status:** 500 Internal Server Error
  - Error fetching distance and time or server error.

---

## Notes
- All endpoints require authentication.
- All responses are in JSON format.
- For more details on error messages, refer to the backend service logs or the Google Maps API documentation.
