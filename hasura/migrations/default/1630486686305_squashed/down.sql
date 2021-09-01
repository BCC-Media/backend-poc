
alter table "public"."filters" alter column "logic_id" drop not null;
alter table "public"."filters" add column "logic_id" int8;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."logics";

alter table "public"."filters"
  add constraint "filters_logic_id_fkey"
  foreign key ("logic_id")
  references "public"."logics"
  ("id") on update restrict on delete restrict;
