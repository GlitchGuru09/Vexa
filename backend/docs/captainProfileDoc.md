# Captain Profile Endpoint Documentation

## Endpoint: `/captain/profile`

### Method: `GET`

### Description:
This endpoint retrieves the profile information of the currently authenticated captain.

## Authentication

Requires a valid JWT token either:
- In the Authorization header as a Bearer token
- In the cookies as 'capToken'

## Example Request

```bash
curl -X GET http://localhost:3000/api/captain/profile \
  -H "Authorization: Bearer your_jwt_token_here"
```

## Success Response

**Code:** 200 OK

```json
{
  "_id": "captain_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "active",
  "location": {
    "lat": 12.9716,
    "lng": 77.5946
  }
}
```

## Error Responses

**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized"
}
```

**Code:** 404 NOT FOUND
```json
{
  "message": "Captain not found"
}
```

## Notes

- The endpoint returns the complete captain profile excluding sensitive information like password
- Location information will be included if available
- The status field indicates whether the captain is currently active or inactive
