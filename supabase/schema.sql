-- Italiano Flash — Supabase schema
-- Run this in the Supabase dashboard (SQL Editor) on a fresh project,
-- before starting the app.

-- Per-word learning progress for each user. All timestamps are epoch
-- milliseconds (bigint) to match the client's localStorage records.
create table if not exists public.word_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  word_id bigint not null,
  level bigint not null default 0,
  correct_count bigint not null default 0,
  wrong_count bigint not null default 0,
  learned_date bigint,
  next_review bigint,
  last_reviewed bigint,
  updated_at timestamptz not null default now(),
  unique (user_id, word_id)
);

create index if not exists word_progress_user_id_idx on public.word_progress (user_id);

-- Keep updated_at current on every write (the client orders by it when syncing).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists word_progress_set_updated_at on public.word_progress;
create trigger word_progress_set_updated_at
  before update on public.word_progress
  for each row
  execute function public.set_updated_at();

-- Row-level security: each user can only touch their own rows.
alter table public.word_progress enable row level security;

drop policy if exists "Users can read own progress" on public.word_progress;
drop policy if exists "Users can insert own progress" on public.word_progress;
drop policy if exists "Users can update own progress" on public.word_progress;
drop policy if exists "Users can delete own progress" on public.word_progress;

create policy "Users can read own progress"
  on public.word_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.word_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.word_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.word_progress for delete
  using (auth.uid() = user_id);
