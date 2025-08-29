# schedule_slot

## SETUP
1. Clone the repository and install dependencies
  ```bash
  git clone https://github.com/NishthaM30/schedule_slot
  cd schedule_slot
  npm install 
  ```

2. Generate .env with data
```bash 
MONGO_URL=mongodb://localhost:27017/schedule_slot
JWT_TOKEN=YOUR_SECRET_KEY
# you can generate it with 
node -e "console.log(require('crypto).randomBytes(64).toString('base64))"
```

3. Seed Database
```bash
node seed.js
```

4.Run Server
```bash
node server.js
```

## API Endpoint

1. Authentication

### `POST /auth/login`
```json 
Request body:
{
  "email":"admin@gmail.com",
  "password":"abc123"
}

or 
{
  "email":"user1@gmail.com",
  "password":"abc123"
}

Response: 
{
  "token" : "Bearer token"
}
```

2. Availability slots of User
Add availability for next 7 days
### `POST 
```json
Headers: Authorization: Bearer <token>

Request:
{
  "date": "2025-08-30",
  "startTime":"10:30",
  "endTime":"15:00"
}

Response: 
{
    "message": "availability added",
    "availability": {
        "userId": "68b1371b4a012af8e7715b0a",
        "date": "2025-08-30",
        "startTime": "10:30",
        "endTime": "15:00",
        "_id": "68b15412f219d24f62c5eab6",
        "__v": 0
    }
}

```
3. Get availability slots 
### `GET admin/slots/2025-08-30`
Headers: Authorization: Bearer <token>
```json
Response: [
    {
        "userId": "68b1371b4a012af8e7715b0a",
        "name": "User1",
        "email": "user1@gmail.com",
        "slots": []
    }
]

```

## Tech-stack
- node
- express
- mongodb
- JWT

## Remaining Task
- book slot by admin  