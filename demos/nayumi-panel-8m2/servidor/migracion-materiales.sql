-- Ampliación aditiva: conserva panel_state y los registros existentes.
CREATE TABLE IF NOT EXISTS vacancy_assets (
  vacancy_id TEXT PRIMARY KEY NOT NULL,
  mime TEXT NOT NULL,
  image_bytes BLOB NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  updated_by TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

