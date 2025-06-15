# Captain Login Endpoint Documentation

## Endpoint: `/captain/login`

### Method: `POST`

### Description:
This endpoint authenticates a captain and provides a JWT token for accessing protected resources.

## Request Body

| Field    | Type   | Description                |
|----------|--------|----------------------------|
| email    | String | Captain's email address    |
| password | String | Captain's account password |

## Validation

- Email must be a valid email format
- Password must be at least 6 characters long

## Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "secure123"
}
```

## Success Response

**Code:** 200 OK

```json
{
  "capToken": "string (JWT token)",
  "captain": {
    "_id": "string (captain ID)",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "hashed",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string"
  }
}
```

## Error Responses

**Code:** 400 BAD REQUEST
```json
{
  "message": "Invalid email or password"
}
```

OR

```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "param": "email"
    }
  ]
}
```

## Notes

- The response includes a JWT token (`capToken`) that should be used for authenticated requests
- The token is also set as an HTTP-only cookie
- The password is not included in the response
