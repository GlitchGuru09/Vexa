# Captain Logout Endpoint Documentation

## Endpoint: `/captain/logout`

### Method: `GET`

### Description:
This endpoint logs out the currently authenticated captain by invalidating their JWT token.

## Authentication

Requires a valid JWT token either:
- In the Authorization header as a Bearer token
- In the cookies as 'capToken'

## Example Request

```bash
curl -X GET http://localhost:3000/api/captain/logout \
  -H "Authorization: Bearer your_jwt_token_here"
```

## Success Response

**Code:** 200 OK

```json
{
  "message": "Logged out successfully"
}
```

## Error Response

**Code:** 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized"
}
```

## Notes

- The endpoint invalidates the current JWT token by adding it to a blacklist
- The 'capToken' cookie is cleared if it exists
- Any subsequent requests with the same token will be rejected
- The captain will need to log in again to get a new valid token
