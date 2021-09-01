
alter table "public"."filters" drop constraint "filters_logic_id_fkey";

DROP table "public"."logics";

alter table "public"."filters" drop column "logic_id" cascade;
