# noteflow-97824-abfeb5f5

# NoteFlow Backend (notes_backend)

This is the backend RESTful API for NoteFlow, a note-taking application implemented with [Express](https://expressjs.com/). It provides endpoints for creating, retrieving, updating, deleting, and organizing notes, as well as health checks and OpenAPI/Swagger documentation.

---

## Features

- CRUD operations for notes (Create, Read, Update, Delete)
- Organize notes by folder and tags
- Rich API documentation (Swagger OpenAPI 3.0)
- In-memory data store (no database required)
- Health check endpoint

---

## Setup & Running

### Requirements

- Node.js (v18+ recommended)
- npm

### Install dependencies

```bash
cd notes_backend
npm install
```

### Run the server (development mode with auto-reload)

```bash
npm run dev
```

### Run the server (production mode)

```bash
npm start
```

Server will run on `http://localhost:3000` by default.

---

## API Documentation

Interactive documentation is available at: `http://localhost:3000/docs`  
OpenAPI JSON: `http://localhost:3000/openapi.json`

---

## Note Model

All note objects follow this schema:

```json
{
  "id": "string (UUID)",
  "title": "string",
  "content": "string",
  "folder": "string",
  "tags": ["string"],
  "createdAt": "ISO8601 datetime",
  "updatedAt": "ISO8601 datetime"
}
```

- `title` and `content` are required for creation.
- `folder` and `tags` are optional.

---

## API Endpoints

### Health

- **GET /**  
  Returns health status.

### Notes

- **GET /notes?folder=...&tag=...**  
  List all notes. Optional query params: `folder`, `tag`.

- **GET /notes/:id**  
  Retrieve a note by ID.

- **POST /notes**  
  Create a new note.  
  JSON body: `{ "title": "...", "content": "...", "folder": "...", "tags": ["..."] }`

- **PUT /notes/:id**  
  Update a note by ID.  
  JSON body: any of the note fields.

- **DELETE /notes/:id**  
  Delete a note by ID.

- **PATCH /notes/:id/organize**  
  Change folder or tags.  
  JSON body: `{ "folder": "...", "tags": ["..."] }`

---

## Sample Requests

### Create a New Note

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Project Ideas", "content":"Brainstorm AI tools", "folder":"Work", "tags":["brainstorm","ai"]}'
```

### List Notes in Folder

```bash
curl "http://localhost:3000/notes?folder=Work"
```

### Update a Note

```bash
curl -X PUT http://localhost:3000/notes/<note_id> \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'
```

### Organize a Note

```bash
curl -X PATCH http://localhost:3000/notes/<note_id>/organize \
  -H "Content-Type: application/json" \
  -d '{"folder":"Personal","tags":["todo"]}'
```

---

## Testing

- Run tests with (if implemented):  
  ```bash
  npm test
  ```

---

## License

MIT or as otherwise specified.