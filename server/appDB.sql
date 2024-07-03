PGDMP  1    :                |           appDB    16.3    16.3 -    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    appDB    DATABASE     �   CREATE DATABASE "appDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Netherlands.1252';
    DROP DATABASE "appDB";
                postgres    false            �            1259    16398 	   admin_acc    TABLE     �   CREATE TABLE public.admin_acc (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    passhash character varying NOT NULL
);
    DROP TABLE public.admin_acc;
       public         heap    postgres    false            �            1259    16403    admin_acc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admin_acc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.admin_acc_id_seq;
       public          postgres    false    215            �           0    0    admin_acc_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.admin_acc_id_seq OWNED BY public.admin_acc.id;
          public          postgres    false    216            �            1259    16536    exercise_materials    TABLE     �   CREATE TABLE public.exercise_materials (
    title character varying(30) NOT NULL,
    amount integer NOT NULL,
    material text
);
 &   DROP TABLE public.exercise_materials;
       public         heap    postgres    false            �            1259    16528    exercise_options    TABLE     �   CREATE TABLE public.exercise_options (
    title character varying(100) NOT NULL,
    option character(1) NOT NULL,
    option_text text
);
 $   DROP TABLE public.exercise_options;
       public         heap    postgres    false            �            1259    16520    exercise_solutions    TABLE     �   CREATE TABLE public.exercise_solutions (
    title character varying(30) NOT NULL,
    prompt integer DEFAULT 0 NOT NULL,
    solution text NOT NULL
);
 &   DROP TABLE public.exercise_solutions;
       public         heap    postgres    false            �            1259    16431    exercise_types    TABLE     s   CREATE TABLE public.exercise_types (
    id integer DEFAULT 1 NOT NULL,
    type character varying(40) NOT NULL
);
 "   DROP TABLE public.exercise_types;
       public         heap    postgres    false            �           0    0    TABLE exercise_types    COMMENT     m   COMMENT ON TABLE public.exercise_types IS 'Containing the different types of exercises that are possible. ';
          public          postgres    false    221            �            1259    16473 	   exercises    TABLE     �  CREATE TABLE public.exercises (
    title character varying(40) NOT NULL,
    type integer,
    question_text text NOT NULL,
    hint text,
    strategy text,
    language character varying(20),
    material character varying(20),
    difficulty character varying(3),
    CONSTRAINT exercises_difficulty_check CHECK (((difficulty)::text = ANY (ARRAY[('mak'::character varying)::text, ('gem'::character varying)::text, ('moe'::character varying)::text])))
);
    DROP TABLE public.exercises;
       public         heap    postgres    false            �            1259    16404    students_acc    TABLE     �   CREATE TABLE public.students_acc (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    passhash character varying NOT NULL
);
     DROP TABLE public.students_acc;
       public         heap    postgres    false            �            1259    16409    students_acc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_acc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.students_acc_id_seq;
       public          postgres    false    217            �           0    0    students_acc_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.students_acc_id_seq OWNED BY public.students_acc.id;
          public          postgres    false    218            �            1259    16410    teachers_acc    TABLE     �   CREATE TABLE public.teachers_acc (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    passhash character varying NOT NULL
);
     DROP TABLE public.teachers_acc;
       public         heap    postgres    false            �            1259    16415    teachers_acc_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teachers_acc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.teachers_acc_id_seq;
       public          postgres    false    219            �           0    0    teachers_acc_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.teachers_acc_id_seq OWNED BY public.teachers_acc.id;
          public          postgres    false    220            8           2604    16416    admin_acc id    DEFAULT     l   ALTER TABLE ONLY public.admin_acc ALTER COLUMN id SET DEFAULT nextval('public.admin_acc_id_seq'::regclass);
 ;   ALTER TABLE public.admin_acc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            9           2604    16417    students_acc id    DEFAULT     r   ALTER TABLE ONLY public.students_acc ALTER COLUMN id SET DEFAULT nextval('public.students_acc_id_seq'::regclass);
 >   ALTER TABLE public.students_acc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            :           2604    16418    teachers_acc id    DEFAULT     r   ALTER TABLE ONLY public.teachers_acc ALTER COLUMN id SET DEFAULT nextval('public.teachers_acc_id_seq'::regclass);
 >   ALTER TABLE public.teachers_acc ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            �          0    16398 	   admin_acc 
   TABLE DATA           ;   COPY public.admin_acc (id, username, passhash) FROM stdin;
    public          postgres    false    215   3       �          0    16536    exercise_materials 
   TABLE DATA           E   COPY public.exercise_materials (title, amount, material) FROM stdin;
    public          postgres    false    225   ?3       �          0    16528    exercise_options 
   TABLE DATA           F   COPY public.exercise_options (title, option, option_text) FROM stdin;
    public          postgres    false    224   �3       �          0    16520    exercise_solutions 
   TABLE DATA           E   COPY public.exercise_solutions (title, prompt, solution) FROM stdin;
    public          postgres    false    223   F4       �          0    16431    exercise_types 
   TABLE DATA           2   COPY public.exercise_types (id, type) FROM stdin;
    public          postgres    false    221   �4       �          0    16473 	   exercises 
   TABLE DATA           o   COPY public.exercises (title, type, question_text, hint, strategy, language, material, difficulty) FROM stdin;
    public          postgres    false    222   5       �          0    16404    students_acc 
   TABLE DATA           >   COPY public.students_acc (id, username, passhash) FROM stdin;
    public          postgres    false    217   %7       �          0    16410    teachers_acc 
   TABLE DATA           >   COPY public.teachers_acc (id, username, passhash) FROM stdin;
    public          postgres    false    219   J7       �           0    0    admin_acc_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.admin_acc_id_seq', 1, true);
          public          postgres    false    216            �           0    0    students_acc_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.students_acc_id_seq', 1, true);
          public          postgres    false    218            �           0    0    teachers_acc_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.teachers_acc_id_seq', 1, false);
          public          postgres    false    220            ?           2606    16420    admin_acc admin_acc_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.admin_acc
    ADD CONSTRAINT admin_acc_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.admin_acc DROP CONSTRAINT admin_acc_pkey;
       public            postgres    false    215            A           2606    16422     admin_acc admin_acc_username_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.admin_acc
    ADD CONSTRAINT admin_acc_username_key UNIQUE (username);
 J   ALTER TABLE ONLY public.admin_acc DROP CONSTRAINT admin_acc_username_key;
       public            postgres    false    215            S           2606    16542 *   exercise_materials exercise_materials_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.exercise_materials
    ADD CONSTRAINT exercise_materials_pkey PRIMARY KEY (title, amount);
 T   ALTER TABLE ONLY public.exercise_materials DROP CONSTRAINT exercise_materials_pkey;
       public            postgres    false    225    225            Q           2606    16534 &   exercise_options exercise_options_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.exercise_options
    ADD CONSTRAINT exercise_options_pkey PRIMARY KEY (title, option);
 P   ALTER TABLE ONLY public.exercise_options DROP CONSTRAINT exercise_options_pkey;
       public            postgres    false    224    224            O           2606    16526 *   exercise_solutions exercise_solutions_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.exercise_solutions
    ADD CONSTRAINT exercise_solutions_pkey PRIMARY KEY (title);
 T   ALTER TABLE ONLY public.exercise_solutions DROP CONSTRAINT exercise_solutions_pkey;
       public            postgres    false    223            K           2606    16436 "   exercise_types exercise_types_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.exercise_types
    ADD CONSTRAINT exercise_types_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.exercise_types DROP CONSTRAINT exercise_types_pkey;
       public            postgres    false    221            M           2606    16487    exercises exercises_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (title);
 B   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
       public            postgres    false    222            C           2606    16424    students_acc students_acc_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.students_acc
    ADD CONSTRAINT students_acc_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.students_acc DROP CONSTRAINT students_acc_pkey;
       public            postgres    false    217            E           2606    16426 &   students_acc students_acc_username_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.students_acc
    ADD CONSTRAINT students_acc_username_key UNIQUE (username);
 P   ALTER TABLE ONLY public.students_acc DROP CONSTRAINT students_acc_username_key;
       public            postgres    false    217            G           2606    16428    teachers_acc teachers_acc_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.teachers_acc
    ADD CONSTRAINT teachers_acc_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.teachers_acc DROP CONSTRAINT teachers_acc_pkey;
       public            postgres    false    219            I           2606    16430 &   teachers_acc teachers_acc_username_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.teachers_acc
    ADD CONSTRAINT teachers_acc_username_key UNIQUE (username);
 P   ALTER TABLE ONLY public.teachers_acc DROP CONSTRAINT teachers_acc_username_key;
       public            postgres    false    219            T           2606    16481    exercises exercises_type_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_type_fkey FOREIGN KEY (type) REFERENCES public.exercise_types(id);
 G   ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_type_fkey;
       public          postgres    false    222    221    4683            �      x�3�LL��̃�\1z\\\ 8Z      �   c   x�m�A
� еF���i�8�H*_����)�3FBgW�&�TI)�ve!R�|y���d.�-r���ƟS�҃�V���ə�}�|��A�j�*8�';�E	      �   �   x�e�1�0k���5ih|�],���!^�(t��Y� n�)��ђ��*u���#�&��Wk��E�F���a,:�N��?��V k\m������=�
��bB��Lg�����p3�x��_��E"      �   A   x�OM*�,I�4�L�
K-�NM-*NR0�4�LB�q��ss&r��fg����@X\1z\\\ !�@      �   `   x�e�K
�0��)r��m�HZh�ڴx}Q�.3�Z��.zB�����x���zP��H$ƽ�f'��}s��'|󮺯Fc��lƘ$�|��ɧ N �::      �     x��R���0<+_�-C)��J{X(t/���9z�eYR��|�����K:��!��Ћ��y��ͼa'ދ�z0��s")ݬ�E�.�>���2QˉN1{�����O�=���_;_�&�:�:��ηO����?m�[�y4\�#>���2����AI�̾������cL�)�e���l�L�������y*fGwOE�BK*܊�Ј��aR����ca�����P
��q�9�������,}
����3�-�ё]Cpq��\?#����T�z�=��-->�N�Xq�M5�Ȭ��X,�Յt��ݎ��&����I�T�H��$ynĽ�͒�� }aE��cd����1��o�'�c"�q��:�"L�ٻ*`�\j�y����c� r��y��e[H��g�~G$^���\Io�mԉ�;Q��ܥ8��H��2�/�[V���׸vE���9���B@�k���=���t�����~�au�����"�n����j������[����N�"��F��f�g�x�      �      x�3�T1�T1����� 7�      �      x������ � �     