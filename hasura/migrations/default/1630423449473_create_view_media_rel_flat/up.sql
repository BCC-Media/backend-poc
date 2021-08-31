CREATE VIEW "public"."media_media_rel_flat" AS 
 SELECT 
    id AS child_id,
    parent_id
   FROM media
UNION
 SELECT 
    child_id,
    parent_id
   FROM media_media_rel;
