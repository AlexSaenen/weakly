import * as nativeDatabase from './native';

describe('connect and close a client connection to a database', () => {
  const { connectToDatabase, closeClient } = nativeDatabase;
  const database = 'template1';

  test('it fails to connect to unexisting database', () =>
    expect(connectToDatabase('unknown')).rejects.toThrow());

  test('it connects to a database', async () => {
    const client = await connectToDatabase(database);
    expect(client).toBeDefined();
    expect(client).not.toBeNull();

    if (client) {
      await client.end();
    }
  });

  test('it manages to close a client', async () => {
    const client = await connectToDatabase(database);
    let receivedEndEvent = false;

    client.on('end', () => {
      receivedEndEvent = true;
    });

    await closeClient(client);
    expect(receivedEndEvent).toBe(true);
  });
});

describe('connect to the test database', () => {
  const { start, closeClient } = nativeDatabase;
  let client;

  beforeEach(async () => {
    client = await start();
  });

  afterEach(() => closeClient(client));

  test('it connects successfully to current database (for test) with start', async () => {
    expect(client).toBeDefined();
    expect(client).not.toBeNull();
  });

  test('it manages to perform a simple query', async () => {
    const result = await client.query('SELECT NOW()');
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
  });
});
