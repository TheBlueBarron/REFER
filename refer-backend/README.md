# Refer Backend API

All endpoints are prefixed with `/api`.

## Auth
- `POST /api/auth/register` - register a new user.
- `POST /api/auth/login` - login and receive a JWT token.

## Services
- `POST /api/services/` - create a new service (authenticated).
- `GET /api/services/mine` - list services created by the authenticated user.

## Friends
- `POST /api/friends/` - add a friend by email.
- `GET /api/friends/` - list your friends.
- `GET /api/friends/services` - services offered by your friends.

## Leads
- `POST /api/leads/` - submit a lead to a friend's service.
- `GET /api/leads/mine` - leads you have sent.
- `GET /api/leads/for-me` - leads sent to your services.
- `POST /api/leads/:id/status` - update a lead's status (service owner).

