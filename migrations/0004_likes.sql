alter table dives
  add column if not exists likes integer not null default 0;
