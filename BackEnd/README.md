# PropSync API

Java 11 / Spring Boot backend starter for the PropSync CRM UI.

## Prerequisites

- Java 11 (already available in this environment)
- Maven 3.8 or newer

## Run locally

```bash
cd BackEnd
mvn spring-boot:run
```

The service starts on `http://localhost:8080`.

## Verify

```bash
curl http://localhost:8080/api/health
```

Expected response contains `"status": "UP"`.

## Test API endpoints

All APIs use the `/api` prefix. They currently use seeded, in-memory data so the UI can be tested without a database. Restarting the API resets the test data.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/auth/login` | Test login; accepts `email` and `password` |
| GET | `/dashboard` | Dashboard stats, funnel, attention rows, and visits |
| GET | `/agents` | Available agents |
| GET | `/leads` | Leads board; supports `search`, `project`, `status`, `agent` filters |
| POST | `/leads` | Create a lead |
| GET/PATCH/DELETE | `/leads/{id}` | Read, update, or delete a lead |
| POST | `/leads/{id}/merge` | Test merge action |
| GET | `/leads/unassigned` | Unassigned leads queue |
| POST | `/leads/assignments` | Bulk lead assignment |
| POST | `/organization/team` | Save team members |
| PATCH | `/organization/work-mode` | Save onboarding mode |
| GET | `/health` | Service health check |

## UI connection

The UI defaults to `http://localhost:8080/api`. To override it, copy `UI/.env.example` to `UI/.env` and set `VITE_API_BASE_URL`.

## Next production step

Replace `CrmStore` with database entities, repositories, and services. The API paths used by the UI can remain unchanged.
