# just the news, please
<img width="222" height="99" alt="screenshot of web /1" src="https://github.com/user-attachments/assets/bff29471-65c2-4ec1-8c6d-a2f8606dc81e" /> <img width="222" height="99" alt="screenshot of web /2" src="https://github.com/user-attachments/assets/ec60910b-9108-4ba2-bb05-a0e92a94e61a" /> <img width="222" height="99" alt="screenshot of web /3" src="https://github.com/user-attachments/assets/02e7fb19-a37e-4d0a-8d7c-b1dce06de518" />

![API status](https://img.shields.io/website?url=https%3A%2F%2Fjustthenews.vercel.app%2Fapi%2Fv1%2Fstatus&up_message=ok&down_message=fail&label=api%20status) ![GitHub last commit](https://img.shields.io/github/last-commit/usertermed/justthenews) ![GitHub / Vercel build passing](https://img.shields.io/github/checks-status/usertermed/justthenews/main?label=build)



simple headline-based news website for gathering quick information

ad free, overstimulation-free, forever

# API docs
jtn has a small RESTful api (`/api/v1/`).

## v1 Endpoints

### `GET /api/v1/get/headline`
Returns a random headline from the top stories.
**Response**: JSON object containing article details.

### `GET /api/v1/get/categories`
Returns a list of valid news categories.
**Response**: `{"categories": ["business", "entertainment", ...]}`

### `GET /api/v1/get/headline/[category]`
Returns a random headline from a specific category.
**Example**: `/api/v1/get/headline/technology`
**Response**: JSON object containing article details (or 404 if empty).

### `GET /api/v1/search?q=[query]`
Returns a random headline matching the search query.
**Example**: `/api/v1/search?q=bitcoin`
**Response**: JSON object containing article details (or 404 if no match).

### `GET /api/v1/status`
Returns API health status.
**Response**: `{"status": "ok", "uptime": 123.45, ...}`

