# Captain Registration API Documentation

## Endpoint
`POST /captain/register`

## Description
Registers a new captain (driver) in the system with their personal and vehicle details.

## Request Body
```json
{
    "fullname": {
        "firstname": "string",       // required, min length: 3
        "lastname": "string"         // optional, min length: 3
    },
    "email": "string",              // required, valid email format
    "password": "string",           // required, min length: 6
    "vehicle": {
        "color": "string",          // required, min length: 3
        "plate": "string",          // required, min length: 3
        "capacity": "number",       // required, must be > 0
        "vehicleType": "string"     // required, must be one of: "car", "bike", "auto"
    }
}
```

## Response
### Success Response
- **Status Code**: `201 Created`
- **Body**:
```json
{
    "token": "string",              // JWT authentication token
    "captain": {
        "_id": "string",
        "fullname": {
            "firstname": "string",
            "lastname": "string"
        },
        "email": "string",
        "vehicle": {
            "color": "string",
            "plate": "string",
            "capacity": "number",
            "vehicleType": "string"
        }
    }
}
```

### Error Responses
#### Validation Error
- **Status Code**: `400 Bad Request`
- **Body**:
```json
{
    "errors": [
        {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
        }
    ]
}
```

#### Email Already Exists
- **Status Code**: `400 Bad Request`
- **Body**:
```json
{
    "message": "Captain with this email already exists"
}
```

## Field Validations
- `fullname.firstname`: Minimum 3 characters
- `fullname.lastname`: Optional, but if provided, minimum 3 characters
- `email`: Must be a valid email format
- `password`: Minimum 6 characters
- `vehicle.color`: Minimum 3 characters
- `vehicle.plate`: Minimum 3 characters
- `vehicle.capacity`: Must be a positive integer (greater than 0)
- `vehicle.vehicleType`: Must be one of: "car", "bike", "auto"

## Notes
- The password is hashed before storing in the database
- A JWT token is generated and returned upon successful registration
- The captain's initial status is set to "active"
- Location fields (lat, lng) are initially empty and can be updated later
