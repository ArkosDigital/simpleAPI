/*
Script for create auth database's extension
Auth v1 - Last update 30/01/2020
*/

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE EXTENSION
-- IF NOT EXISTS pgcrypto;
-- CREATE SEQUENCE epoch_seq INCREMENT BY 1 MAXVALUE 9 CYCLE;
-- CREATE OR REPLACE FUNCTION generate_object_id
-- () RETURNS varchar AS $$
-- DECLARE
--         time_component bigint;
--         epoch_seq int;
--         machine_id text := encode
-- (gen_random_bytes
-- (3), 'hex');
--         process_id bigint;
--         seq_id text := encode
-- (gen_random_bytes
-- (3), 'hex');
--         result
-- varchar:
-- = '';
-- BEGIN
--   SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()))
--   INTO time_component;
--   SELECT nextval('epoch_seq')
--   INTO epoch_seq;
--   SELECT pg_backend_pid()
--   INTO process_id;

--   result := result || lpad
--   (to_hex
--   (time_component), 8, '0');
-- result := result || machine_id;
--         result := result || lpad
-- (to_hex
-- (process_id), 4, '0');
--         result := result || seq_id;
--         result := result || epoch_seq;
-- RETURN result;
-- END;
-- $$ LANGUAGE PLPGSQL;