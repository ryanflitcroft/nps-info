import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockData } from '../src/fixtures/mockData';

global.fetch = (...args) =>
  import('cross-fetch').then(({ default: fetch }) => fetch(...args));

const server = setupServer(
  rest.get('https://developer.nps.gov/api/v1/parks', (req, res, ctx) =>
    res(ctx.json(mockData))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close());
