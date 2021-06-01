const { assert } = require('chai');
require('dotenv').config();
const dbDsApiCursor = require('../db/ds-api-cursor');
const clean = require('./helper/clean');

describe('DB Ds Api Cursor', () => {
  beforeEach(async () => {
    await clean.cleanDataCursor();
  });

  describe('saveLatestCursor / getCursorFromDB', () => {
    it('should return undefined if there is no cursor saved', async () => {
      const output = await dbDsApiCursor.getCursorFromDB();

      assert.isUndefined(output);
    });

    it('should return the latest cursor saved', async () => {
      const myCursor = 'test';
      await dbDsApiCursor.saveLatestCursor(myCursor);

      const output = await dbDsApiCursor.getCursorFromDB();

      assert.strictEqual(output, myCursor);
    });

    it('should override the latest cursor saved', async () => {
      const myCursor = 'testNew';
      await dbDsApiCursor.saveLatestCursor(myCursor);

      const output = await dbDsApiCursor.getCursorFromDB();

      assert.strictEqual(output, myCursor);
    });
  });
});
