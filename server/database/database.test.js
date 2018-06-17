import * as database from './index';

describe('connect to the test database', () => {
  const {
    createDatabaseClient,
    initializeModels,
    closeClient,
    connectClient,
  } = database;
  let client;

  beforeEach(() => {
    client = createDatabaseClient();
  });

  afterEach(async () => {
    if (client) {
      await client.close();
    }
  });

  test('it connects successfully to current database (for test)', () =>
    expect(connectClient(client)).resolves.toBe());

  test('it closes the client without error', () =>
    expect(closeClient(client)).resolves.toBeDefined());

  test('closing a client prevents further connections', async () => {
    await closeClient(client);
    await expect(connectClient(client)).rejects.toThrow();
  });

  /* deactivate this test if somehow the current state of this project
    has no models available to load whatsoever */
  test('it loads and initializes some models', () => {
    const models = initializeModels(client);
    const amountOfModels = Object.keys(models).length;
    expect(amountOfModels).toBeGreaterThan(0);
  });
});
