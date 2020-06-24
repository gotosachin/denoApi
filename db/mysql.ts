import { Client } from 'https://deno.land/x/mysql/mod.ts';

const client = await new Client().connect({
  hostname: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  db: 'test_db',
});

export default client;