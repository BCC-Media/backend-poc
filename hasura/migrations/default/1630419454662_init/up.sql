SET check_function_bodies = false;
CREATE TABLE public.categories (
    id integer NOT NULL
);
CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
CREATE TABLE public.category_media (
    category_id integer NOT NULL,
    media_id integer NOT NULL,
    id integer NOT NULL
);
CREATE SEQUENCE public.category_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.category_media_id_seq OWNED BY public.category_media.id;
CREATE TABLE public.category_t (
    id integer NOT NULL,
    language_id integer NOT NULL,
    title text NOT NULL
);
CREATE TABLE public.filters (
    id bigint NOT NULL,
    category_id bigint,
    tag_id bigint,
    logic_id bigint
);
CREATE SEQUENCE public.filters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.filters_id_seq OWNED BY public.filters.id;
CREATE TABLE public.languages (
    id integer NOT NULL,
    name text NOT NULL,
    code text NOT NULL
);
CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;
CREATE TABLE public.logics (
    id bigint NOT NULL,
    left_filter_id bigint NOT NULL,
    operator text NOT NULL,
    right_filter_id bigint NOT NULL
);
CREATE SEQUENCE public.logics_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.logics_id_seq OWNED BY public.logics.id;
CREATE TABLE public.media (
    id bigint NOT NULL,
    type text NOT NULL,
    available_from timestamp with time zone,
    available_to timestamp with time zone,
    parent_id bigint,
    parent_type text,
    is_draft boolean DEFAULT true NOT NULL,
    image text,
    video_id integer,
    CONSTRAINT chk_media_type CHECK ((type = ANY (ARRAY['standalone'::text, 'episode'::text, 'season'::text, 'show'::text])))
);
CREATE SEQUENCE public.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;
CREATE TABLE public.media_media_rel (
    parent_id bigint NOT NULL,
    child_id bigint NOT NULL,
    id bigint NOT NULL
);
CREATE SEQUENCE public.media_media_rel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.media_media_rel_id_seq OWNED BY public.media_media_rel.id;
CREATE TABLE public.media_t (
    media_id bigint NOT NULL,
    language_id integer NOT NULL,
    title text NOT NULL,
    description text,
    longdescription text,
    is_draft boolean DEFAULT true NOT NULL,
    search_keywords text,
    id integer NOT NULL
);
COMMENT ON TABLE public.media_t IS 'Translated columns for media';
CREATE SEQUENCE public.media_t_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.media_t_id_seq OWNED BY public.media_t.id;
CREATE TABLE public.pages (
    id bigint NOT NULL,
    code text NOT NULL
);
CREATE SEQUENCE public.pages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;
CREATE TABLE public.queries (
    id bigint NOT NULL,
    name text NOT NULL,
    filter jsonb
);
CREATE SEQUENCE public.queries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.queries_id_seq OWNED BY public.queries.id;
CREATE TABLE public.sections (
    id bigint NOT NULL,
    page_id bigint NOT NULL,
    display_contract text NOT NULL,
    query_id bigint NOT NULL
);
CREATE SEQUENCE public.sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;
CREATE TABLE public.video_urls (
    id bigint NOT NULL,
    video_id bigint NOT NULL,
    type text NOT NULL,
    value text,
    "contentKeyId" text
);
COMMENT ON COLUMN public.video_urls."contentKeyId" IS 'Used in token for fetching encryption keys.';
CREATE SEQUENCE public.video_urls_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.video_urls_id_seq OWNED BY public.video_urls.id;
CREATE TABLE public.videos (
    id bigint NOT NULL,
    filename text
);
CREATE SEQUENCE public.videos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;
ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
ALTER TABLE ONLY public.category_media ALTER COLUMN id SET DEFAULT nextval('public.category_media_id_seq'::regclass);
ALTER TABLE ONLY public.filters ALTER COLUMN id SET DEFAULT nextval('public.filters_id_seq'::regclass);
ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);
ALTER TABLE ONLY public.logics ALTER COLUMN id SET DEFAULT nextval('public.logics_id_seq'::regclass);
ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);
ALTER TABLE ONLY public.media_media_rel ALTER COLUMN id SET DEFAULT nextval('public.media_media_rel_id_seq'::regclass);
ALTER TABLE ONLY public.media_t ALTER COLUMN id SET DEFAULT nextval('public.media_t_id_seq'::regclass);
ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);
ALTER TABLE ONLY public.queries ALTER COLUMN id SET DEFAULT nextval('public.queries_id_seq'::regclass);
ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);
ALTER TABLE ONLY public.video_urls ALTER COLUMN id SET DEFAULT nextval('public.video_urls_id_seq'::regclass);
ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category_media
    ADD CONSTRAINT category_media_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category_t
    ADD CONSTRAINT category_t_pkey PRIMARY KEY (id, language_id);
ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.logics
    ADD CONSTRAINT logics_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_id_key UNIQUE (id);
ALTER TABLE ONLY public.media_media_rel
    ADD CONSTRAINT media_media_rel_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.media_t
    ADD CONSTRAINT media_t_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.queries
    ADD CONSTRAINT queries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.video_urls
    ADD CONSTRAINT video_urls_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.category_media
    ADD CONSTRAINT category_media_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.category_media
    ADD CONSTRAINT category_media_media_id_fkey FOREIGN KEY (media_id) REFERENCES public.media(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.category_t
    ADD CONSTRAINT category_t_id_fkey FOREIGN KEY (id) REFERENCES public.categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.category_t
    ADD CONSTRAINT category_t_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_logic_id_fkey FOREIGN KEY (logic_id) REFERENCES public.logics(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.logics
    ADD CONSTRAINT logics_left_filter_id_fkey FOREIGN KEY (left_filter_id) REFERENCES public.filters(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.media_media_rel
    ADD CONSTRAINT media_media_rel_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.media(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media_media_rel
    ADD CONSTRAINT media_media_rel_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.media(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.media(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media_t
    ADD CONSTRAINT media_t_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media_t
    ADD CONSTRAINT media_t_media_id_fkey FOREIGN KEY (media_id) REFERENCES public.media(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY public.video_urls
    ADD CONSTRAINT video_urls_video_id_fkey FOREIGN KEY (video_id) REFERENCES public.videos(id) ON UPDATE CASCADE ON DELETE CASCADE;
