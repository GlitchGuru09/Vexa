# User Profile API Documentation

## Endpoint
`GET /users/profile`

## Description
Fetches the profile information of the currently logged-in user.

## Headers
- `Authorization`: Bearer token (required)

## Response
### Success Response
- **Status Code**: `200 OK`
- **Body**:
```json
{
    "_id": "<user_id>",
    "firstname": "<first_name>",
    "lastname": "<last_name>",
    "email": "<email>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>"
}
```

### Error Response
- **Status Code**: `401 Unauthorized`
- **Body**:
```json
{
    "message": "Unauthorized"
}
```

## Notes
- Ensure the user is logged in and the token is valid.
