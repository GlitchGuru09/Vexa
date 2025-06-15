# User Logout API Documentation

## Endpoint
`GET /users/logout`

## Description
Logs out the currently logged-in user by clearing the authentication token and blacklisting it.

## Headers
- `Authorization`: Bearer token (required)

## Response
### Success Response
- **Status Code**: `200 OK`
- **Body**:
```json
{
    "message": "Logged out successfully"
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
- The token is blacklisted and will no longer be valid for authentication.
