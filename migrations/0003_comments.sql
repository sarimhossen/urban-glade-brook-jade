alter table journal
  add column if not exists allow_guest_posts boolean not null default false;

alter table dives
  add column if not exists author_label text;

create table if not exists comments (
  id text primary key,
  dive_id text not null references dives (id) on delete cascade,
  author_name text not null,
  body text not null,
  is_family boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists comments_dive_idx on comments (dive_id, created_at asc);
