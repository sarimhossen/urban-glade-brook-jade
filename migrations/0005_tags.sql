create table if not exists tags (
  id text primary key,
  dive_id text not null references dives (id) on delete cascade,
  tag text not null
);

create index if not exists tags_dive_idx on tags (dive_id);
create index if not exists tags_tag_idx on tags (tag);
