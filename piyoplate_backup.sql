--
-- PostgreSQL database dump
--

\restrict x39eRFJrMkocg5NtAstPZRClo8rmwI69zIPfckFD3FfhZVwSVDav4HDeKtbgGLq

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: log_source; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.log_source AS ENUM (
    'recipe',
    'manual',
    'photo'
);


ALTER TYPE public.log_source OWNER TO postgres;

--
-- Name: users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.users_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookmarks (
    id integer NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO postgres;

--
-- Name: bookmarks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookmarks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookmarks_id_seq OWNER TO postgres;

--
-- Name: bookmarks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookmarks_id_seq OWNED BY public.bookmarks.id;


--
-- Name: nutrition_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition_logs (
    id integer NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer,
    food_name text,
    calories_added integer NOT NULL,
    logged_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ai_breakdown text,
    ai_confidence character varying(10),
    source public.log_source DEFAULT 'manual'::public.log_source NOT NULL
);


ALTER TABLE public.nutrition_logs OWNER TO postgres;

--
-- Name: nutrition_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutrition_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nutrition_logs_id_seq OWNER TO postgres;

--
-- Name: nutrition_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutrition_logs_id_seq OWNED BY public.nutrition_logs.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    author_id integer NOT NULL,
    title character varying(100) NOT NULL,
    cuisine_type character varying(50),
    description text,
    calories_per_serving integer NOT NULL,
    cook_time_minutes integer,
    ingredients text NOT NULL,
    instructions text NOT NULL,
    image_url character varying(255),
    video_url character varying(255),
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ai_calorie_breakdown text
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recipes_id_seq OWNER TO postgres;

--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    recipe_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(100),
    daily_calorie_goal integer DEFAULT 2000 NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role public.users_role DEFAULT 'user'::public.users_role NOT NULL,
    weight double precision,
    height double precision,
    profile_picture_url character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bookmarks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks ALTER COLUMN id SET DEFAULT nextval('public.bookmarks_id_seq'::regclass);


--
-- Name: nutrition_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_logs ALTER COLUMN id SET DEFAULT nextval('public.nutrition_logs_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookmarks (id, user_id, recipe_id, "createdAt") FROM stdin;
8	2	18	2026-06-10 14:52:23.365
9	4	18	2026-06-15 14:48:57.229
10	4	17	2026-06-15 14:48:58.866
11	4	12	2026-06-15 14:49:01.405
\.


--
-- Data for Name: nutrition_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nutrition_logs (id, user_id, recipe_id, food_name, calories_added, logged_at, ai_breakdown, ai_confidence, source) FROM stdin;
12	2	\N	Mie Ayam	100	2026-06-07 14:50:28	\N	\N	manual
14	2	\N	Ayam panggang, kentang goreng crinkle-cut, tumis sayuran (brokoli, wortel, zucchini, paprika merah)	580	2026-06-07 16:04:16	Ayam panggang (~150g): 300 kcal, Kentang goreng crinkle-cut (~80g): 220 kcal, Tumis sayuran campur (~100g): 60 kcal	high	photo
15	2	\N	Ayam panggang, kentang goreng crinkle-cut, tumis sayuran (brokoli, wortel, zucchini, paprika merah)	580	2026-06-07 16:04:20	\N	\N	manual
16	2	\N	Spaghetti jamur dan tomat ceri, roti bawang (garlic bread), minyak zaitun/balsamic	750	2026-06-07 16:04:41	Spaghetti dengan tumisan jamur dan tomat ceri: 510 kkal, Roti bawang (1 lembar): 180 kkal, Saus celup minyak/balsamic (1 sdm): 60 kkal.	high	photo
17	2	\N	Spaghetti jamur dan tomat ceri, roti bawang (garlic bread), minyak zaitun/balsamic	750	2026-06-07 16:04:53	\N	\N	manual
18	2	\N	Ayam panggang, kentang goreng, tumis sayuran (brokoli, wortel, zucchini, paprika)	550	2026-06-07 16:09:51	Ayam panggang (150 gram) sekitar 280 kcal, kentang goreng crinkle-cut (80 gram) sekitar 220 kcal, dan tumis sayuran campur (100 gram) sekitar 50 kcal.	high	photo
19	2	\N	Ayam panggang, kentang goreng, tumis sayuran (brokoli, wortel, zucchini, paprika)	550	2026-06-07 16:09:52	\N	\N	manual
20	2	\N	Spaghetti aglio olio dengan jamur dan tomat ceri, roti bawang (garlic bread), saus minyak zaitun dan balsamic	750	2026-06-07 16:15:51	Spaghetti dengan tumis jamur dan tomat ceri (~500 kcal), Roti bawang panggang (1 lembar, ~150 kcal), Saus celup minyak zaitun/balsamic (~100 kcal)	high	photo
21	2	\N	Spaghetti aglio olio dengan jamur dan tomat ceri, roti bawang (garlic bread), saus minyak zaitun dan balsamic	750	2026-06-07 16:15:53	\N	\N	manual
22	2	\N	Spaghetti tumis jamur dan tomat, roti bawang, minyak celup balsamiko	700	2026-06-07 16:20:29	Spaghetti dengan tumisan jamur kancing dan tomat ceri: ~470 kcal; Roti panggang bawang (garlic bread) 1 lembar: ~150 kcal; Saus celup minyak zaitun & balsamic: ~80 kcal	high	photo
23	2	\N	Ayam panggang, kentang goreng, brokoli, wortel, zucchini, paprika	580	2026-06-07 16:44:11	\N	\N	photo
24	2	\N	Mie Ayam	20	2026-06-07 16:44:26	\N	\N	manual
25	2	\N	Spageti tumis jamur dan tomat ceri, roti bawang, saus minyak zaitun/balsamik	750	2026-06-07 16:46:04	\N	\N	manual
26	2	\N	Spaghetti aglio e olio dengan jamur dan tomat ceri, roti bawang (garlic bread), saus celup minyak zaitun dan balsamic	780	2026-06-07 16:46:34	\N	\N	manual
27	2	\N	Ayam panggang, kentang goreng crinkle-cut, tumis sayuran (brokoli, wortel, zucchini, paprika)	530	2026-06-07 16:47:56	\N	\N	manual
28	2	\N	Ayam panggang, kentang goreng, sayuran tumis (brokoli, wortel, zukini, paprika)	500	2026-06-07 16:51:05	\N	\N	photo
29	2	\N	mie	20	2026-06-07 16:51:28	\N	\N	manual
30	2	\N	Spaghetti aglio olio dengan jamur dan tomat ceri, roti bawang (garlic bread), saus celup balsamic minyak zaitun	750	2026-06-07 16:51:54	\N	\N	photo
31	2	\N	Ayam panggang, kentang goreng bergelombang, sayuran campur (brokoli, wortel, zucchini, paprika)	490	2026-06-07 16:52:21	\N	\N	photo
32	2	\N	Spageti dengan jamur dan tomat ceri, roti bawang, minyak zaitun/cuka balsamik	820	2026-06-07 16:55:05	\N	\N	photo
33	2	\N	Ayam panggang, Kentang goreng, Sayuran (brokoli, wortel, paprika, zukini)	590	2026-06-08 05:27:01	\N	\N	photo
34	2	\N	Spaghetti aglio olio dengan jamur dan tomat ceri, Roti bawang (garlic bread), Saus celup minyak zaitun	850	2026-06-08 05:40:18	\N	\N	photo
35	2	\N	Mie Ayam	350	2026-06-08 05:46:03	\N	\N	manual
36	2	\N	Ayam panggang, kentang goreng, sayuran tumis (brokoli, wortel, zucchini, paprika merah)	560	2026-06-08 05:59:34	\N	\N	photo
37	2	\N	mie yam	500	2026-06-09 04:52:01	\N	\N	manual
38	2	\N	Bubur gandum (oatmeal), pisang, stroberi, bluberi, serbuk sari lebah (bee pollen)	330	2026-06-09 04:54:42	\N	\N	photo
1	1	\N	nasgor	280	2026-05-30 07:46:19	\N	\N	manual
2	1	\N	nasgor	280	2026-05-30 07:49:45	\N	\N	manual
3	1	\N	nasgor	280	2026-05-30 07:50:10	\N	\N	manual
4	1	\N	nasgor	280	2026-05-30 08:09:29	\N	\N	manual
7	1	\N	nasgor	280	2026-05-30 09:18:39	\N	\N	manual
5	1	\N	Mie Goreng	60	2026-05-30 08:31:53	\N	\N	manual
6	1	\N	Mie Goreng	60	2026-05-30 08:46:46	\N	\N	manual
8	1	\N	Mie Goreng	60	2026-05-30 09:24:27	\N	\N	manual
9	1	\N	Mie Goreng	60	2026-05-30 09:38:00	\N	\N	manual
10	1	\N	Mie Goreng	60	2026-05-30 09:46:29	\N	\N	manual
11	2	\N	Nasi Goreng Spesial	1040	2026-06-07 14:49:50	\N	\N	recipe
13	2	\N	Chicken Steak	420	2026-06-07 16:00:50	\N	\N	recipe
39	2	15	Caesar Salad	75	2026-06-10 14:31:41	\N	\N	recipe
40	2	15	Caesar Salad	75	2026-06-10 14:33:32	\N	\N	recipe
41	2	\N	Bubur ikan (congee), cakwe, bawang putih goreng, daun bawang, jahe	420	2026-06-10 14:52:15	\N	\N	photo
42	4	15	Caesar Salad	75	2026-06-15 15:03:21	\N	\N	recipe
43	4	14	Overnight Oats	320	2026-06-15 15:04:06	\N	\N	recipe
44	4	14	Overnight Oats	320	2026-06-15 15:04:21	\N	\N	recipe
45	4	\N	Mie Ayam	430	2026-06-15 15:06:00	\N	\N	manual
46	4	\N	Ayam panggang, kentang goreng gelombang (crinkle-cut), sayuran campur (brokoli, wortel, zucchini, paprika)	570	2026-06-15 15:12:16	\N	\N	photo
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, author_id, title, cuisine_type, description, calories_per_serving, cook_time_minutes, ingredients, instructions, image_url, video_url, created_at, updated_at, ai_calorie_breakdown) FROM stdin;
11	2	Pancake	Dessert	\N	300	60	Tepung 400 gr, Maple Syrup, Eggs 2 butir, Sugar 30 gr, Milk 100 ml	Masukkan bahan kering ke wadah. Tuangkan susu. Aduk adonan sampai rata. Masak pancake di teflon hingga berwarna kuning kecoklatan	http://10.0.2.2:3000/uploads/1780979797593-930879352.jpeg	\N	2026-06-09 04:36:38	2026-06-09 04:36:38	\N
12	2	Aglio Olio	Western	\N	695	50	Pasta 250 gr, Olive Oil, Protein 100 gr	Oseng smuanya	http://10.0.2.2:3000/uploads/1780979874149-489239270.jpg	\N	2026-06-09 04:38:06	2026-06-09 04:38:06	Pasta (250gr matang) sekitar 350 kkal, Olive Oil (1.5 sdm/15ml) sekitar 180 kkal, dan Protein (asumsi dada ayam 100gr) sekitar 165 kkal.
13	2	chicken steak	Asia	\N	500	60	ayam 500 gr	bakar ayamnya	http://10.0.2.2:3000/uploads/1780980775570-361251258.jpg	\N	2026-06-09 04:52:56	2026-06-09 04:52:56	\N
14	2	Overnight Oats	Lainnya	\N	320	300	Youghurt Greek 400 gr, Oat instan 400 gr, Susu sapi 5 sdm, Chia seeds 1 sdm, Garam, Madu 2 sdm, Buah pilihan 100 gr	Campurkan dan aduk semua bahan ke dalam mangkuk, kecuali buah-buahan cincang.. Tutup dan diamkan selama 4 jam di dalam kulkas (lebih disarankan untuk mendiamkan semalaman). Menaburkan buah cincang dingin sebagai topping saat ingin dimakan	http://10.0.2.2:3000/uploads/1781099396992-795833519.jpeg	\N	2026-06-10 13:49:57	2026-06-10 13:49:57	\N
15	2	Caesar Salad	Lainnya	\N	75	15	Parmesan Cheese 50 ml, Mayonnaise 50 ml, Milk 2 sdm, Lemon Juice 1 sdm, Garlic 1 buah, Romaine 450 gr	Aduk semua bahan di sebuah wadah kecuali romaine (dressing saus). Siapkan romaine di wadah lain. Tuangkan dressing saus ke romaine dan caesar salad siap disajikan	http://10.0.2.2:3000/uploads/1781100066690-218269327.jpeg	\N	2026-06-10 14:01:07	2026-06-10 14:01:07	\N
16	2	Avocado Toast	Western	\N	275	30	Avocado 500 gr, Eggs 2 butir, Bread 450 gr, Butter 20 gr	Scramble Eggs. Toast your bread. Slice your avocado in half and cut it again into long slices. Top the eggs and avocados on the toasted bread	http://10.0.2.2:3000/uploads/1781100681581-896393907.png	\N	2026-06-10 14:11:22	2026-06-10 14:11:22	\N
17	2	Grilled Salmon Steak	Western	\N	362	15	Salmon Fillet, Minyak Olive, Bubuk garlic, Garam, Parsley, Bawang 2 sdt, Dried Basil	Potong salmon menjadi potongan kecil sebelum dipanggang. Olesi setiap potongan dengan sedikit minyak zaitun. Taburi seasonings per potongan. Panasi wajan. Masukkan salmon ke dalam wajan sekitar 10 menit. Grilled Salmon Steak siap dihidangkan	http://10.0.2.2:3000/uploads/1781100979879-673684775.png	\N	2026-06-10 14:16:21	2026-06-10 14:16:21	\N
18	2	Ikan Stim	Asia	\N	610	100	Ikan 500 gr, Jahe, Baput 3 buah, Saus tiram 3 sdm, Minyak wijen, Air 250 ml, Merica	Bersihkan ikan dan taburi sedikit garam dan merica. Letakkan jahe di atas ikan. Panaskan kukusan dan kukus ikan selama 10 - 15 menit. Ikan siap dihidangkan	http://10.0.2.2:3000/uploads/1781102176349-210904418.png	\N	2026-06-10 14:36:17	2026-06-10 14:36:17	\N
21	4	Fish Congee	Asia	\N	180	100	Uncooked rice 250 gr	Soaked in water	http://10.0.2.2:3000/uploads/1781534758875-173033914.jpeg	\N	2026-06-15 14:45:59	2026-06-15 14:45:59	\N
22	4	Pancake	Lainnya	\N	140	30	Egg, Butter	Melt the butter in microwave	http://10.0.2.2:3000/uploads/1781535284143-225435817.jpeg	\N	2026-06-15 14:54:44	2026-06-15 14:54:44	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, recipe_id, rating, comment, "createdAt") FROM stdin;
7	2	11	4	enak	2026-06-09 04:50:35.271
8	2	15	5	Enak	2026-06-10 14:32:27.979
9	2	15	3	tidak sesuai selera	2026-06-10 14:33:42.315
10	4	17	5	WORTH TO TRY!	2026-06-15 14:46:31.984
11	4	16	4	It's ok	2026-06-15 14:46:51.968
12	4	18	5	Very healthy indeed	2026-06-15 14:47:11.206
13	4	14	5	Very delicious and healthy!	2026-06-15 15:04:02.618
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, full_name, daily_calorie_goal, created_at, updated_at, role, weight, height, profile_picture_url) FROM stdin;
1	vina	vina@gmail.com	$2b$10$HX4TXuh7RHQYK4H1eRVrtu1zWKByNx4qb6SbeQiVrmXiaic/QBu3u	\N	2000	2026-05-30 07:40:42	2026-05-30 07:40:42	user	\N	\N	\N
2	Vinnie	v@gmail.com	$2b$10$9EnXF1/oMn2SD7o5mtkk4eCv6Gc9WHKC33TFLPG/dZx9YU7pMRame	\N	2000	2026-06-07 14:35:02	2026-06-07 14:35:02	user	\N	\N	\N
3	john_doe	john@example.com	$2b$10$P7QDQ1SISQSq1.LKgtf.KOTMPxZZnqnlTQeAEzouHy5L/GQR8Ev7C	\N	2000	2026-06-10 13:40:22	2026-06-10 13:40:22	user	\N	\N	\N
4	Vin	va@gmail.com	$2b$10$7uHJmNVDuBk19mRGFvxGHOqzZ97wpxhvQ.I2WhjS0WpSWNnkORR3i	Vinnie	1800	2026-06-15 07:35:59	2026-06-15 07:35:59	user	\N	\N	\N
\.


--
-- Name: bookmarks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookmarks_id_seq', 11, true);


--
-- Name: nutrition_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_logs_id_seq', 46, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_id_seq', 22, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (id);


--
-- Name: nutrition_logs nutrition_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_logs
    ADD CONSTRAINT nutrition_logs_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bookmarks_user_id_recipe_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bookmarks_user_id_recipe_id_key ON public.bookmarks USING btree (user_id, recipe_id);


--
-- Name: email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX email ON public.users USING btree (email);


--
-- Name: username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX username ON public.users USING btree (username);


--
-- Name: bookmarks bookmarks_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bookmarks bookmarks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nutrition_logs nutrition_logs_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_logs
    ADD CONSTRAINT nutrition_logs_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: nutrition_logs nutrition_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition_logs
    ADD CONSTRAINT nutrition_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: recipes recipes_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict x39eRFJrMkocg5NtAstPZRClo8rmwI69zIPfckFD3FfhZVwSVDav4HDeKtbgGLq

