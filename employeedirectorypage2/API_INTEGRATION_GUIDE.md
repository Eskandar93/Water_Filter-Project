# API Integration Guide

This guide explains how to connect the frontend to your external backend API.

## Setup Steps

### 1. Environment Configuration

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update the API base URL in `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://35.170.243.147:8080
   ```

### 2. Update API Endpoints

The API endpoints are configured in `lib/config/api.config.ts`. Update these based on your Swagger documentation:

```typescript
ENDPOINTS: {
  AUTH: {
    LOGIN: '/api/auth/login',    // Update with your actual endpoint
    REGISTER: '/api/auth/register',
    // ... more endpoints
  },
  // ... other endpoint groups
}
```

### 3. Verify Swagger Documentation

Visit your Swagger UI at: `http://35.170.243.147:8080/swagger-ui/index.html`

Check the following:
- Endpoint paths (e.g., `/api/auth/login` or `/auth/login`)
- Request/response formats
- Authentication method (JWT is already configured)
- Required headers

### 4. Update Auth Context

The auth context in `lib/auth-context.tsx` needs to be updated to use the real API. Replace the mock authentication with:

```typescript
import { authApi } from '@/lib/services/api/auth.api'

// In login function:
const result = await authApi.login(email, password)
if (result.success) {
  setUser(result.data)
  return true
}
return false
```

### 5. API Response Format

The API client expects responses in this format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

If your API uses a different format, update the `request` method in `lib/utils/api-client.ts`.

### 6. JWT Token Storage

Tokens are automatically stored in `sessionStorage` and included in all requests via the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## Usage Examples

### Authentication

```typescript
import { authApi } from '@/lib/services/api/auth.api'

// Login
const result = await authApi.login({ email, password })

// Register
const result = await authApi.register({ name, email, password, role })

// Logout
await authApi.logout()
```

### Employees

```typescript
import { employeeApi } from '@/lib/services/api/employee.api'

// Get all employees
const response = await employeeApi.getAll()

// Create employee
const response = await employeeApi.create(employeeData)
```

### Branches

```typescript
import { branchApi } from '@/lib/services/api/branch.api'

// Get all branches
const response = await branchApi.getAll()

// Get branch statistics
const response = await branchApi.getStats(branchId)
```

## Testing the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser console to see API request logs (prefixed with `[v0]`)

3. Try logging in - check the network tab for API calls

4. If you see errors, verify:
   - Backend is running at the specified URL
   - CORS is properly configured on your backend
   - Endpoints match your Swagger documentation
   - Request/response formats are correct

## Common Issues

### CORS Errors
Add CORS configuration to your backend to allow requests from your frontend domain.

### 401 Unauthorized
Check that JWT tokens are being properly saved and sent with requests.

### Endpoint Not Found (404)
Verify endpoint paths in `api.config.ts` match your Swagger documentation exactly.

## Next Steps

1. Review your Swagger documentation
2. Update endpoint paths in `api.config.ts`
3. Test each API integration one by one
4. Replace localStorage usage with API calls throughout the app
