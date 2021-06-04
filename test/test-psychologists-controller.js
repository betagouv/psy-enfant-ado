const { expect } = require('chai');
const rewire = require('rewire');
require('dotenv').config();

const pstCtrl = rewire('../controllers/psy-listing-controller');
describe('DB Psychologists', () => {

  it('countPsyByDepartments', () => {
    const result = pstCtrl.__get__('countPsyByDepartments')([
      { departement: '01 - Ain' },
      { departement: '02 - Aisne' },
      { departement: '02 - Aisne' }
    ]);

    expect(result.length).to.eql(101);
    expect(result[0]).to.eql({ count: 1, name: '01 - Ain' });
    expect(result[1]).to.eql({ count: 2, name: '02 - Aisne' });
    expect(result[2]).to.eql({ count: 0, name: '03 - Allier' });
  });
});
