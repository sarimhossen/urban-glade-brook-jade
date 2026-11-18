create table if not exists journal (
  id integer primary key,
  pass_hash text not null,
  pass_salt text not null,
  my_name text not null,
  sister_name text not null,
  created_by text not null,
  created_at timestamptz not null default now()
);

create table if not exists dives (
  id text primary key,
  user_id text not null,
  voice text not null,
  kind text not null,
  title text not null,
  body text not null default '',
  media text,
  extra text,
  shared boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists dives_created_idx on dives (created_at desc);
create index if not exists dives_user_idx on dives (user_id);
