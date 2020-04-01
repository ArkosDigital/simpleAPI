import IdentificationServiceSimpleModel from '../../src/models/identification/identificationServiceSimpleModel';
import IdentificationDAOSimpleModel from '../../src/models/identification/identificationDAOSimpleModel';
import PersonServiceSimpleModel from '../../src/models/person/personServiceSimpleModel';

const masterIdentification: IdentificationServiceSimpleModel = {
  identification: 'evoxgroup01@gmail.com',
  type: 'GOOGLE',
};

const master: PersonServiceSimpleModel = {
  name: 'admin',
  identifications: [masterIdentification],
  permissions: [
    {
      system: { name: 'Master', link: '' },
    },
  ],
};

const japa = {
  id: '985188e285404371ac3d10d3',
  name: 'Japa',
};

const makes = {
  id: '0af9ed38ff744ac2b838b7cb',
  name: 'Makes',
};

const froes = {
  id: '4dcca907bd4d4543abacc20f',
  name: 'Froes',
};
const china = {
  id: '918f3688feb14c89bc65cb43',
  name: 'China Maluco',
};

const lucas = {
  id: '8ce54fec39514a989e340153',
  name: 'Lucas Torres',
};

const i2 = {
  id: '871ed43ccc5943588c597dc7',
  name: 'i2',
};

const vale = {
  id: '75c162af44624fff9921a524',
  name: 'Vale',
};

const betDAO = {
  id: '75c162af44624fff9921a524',
  name: 'bet',
  link: 'bet.com',
};

const Bob: PersonServiceSimpleModel = {
  name: 'Bob',
  identifications: [
    {
      identification: '1bob1',
      type: 'LOCAL',
      password: 'pass',
    },
  ],
  permissions: [
    {
      system: { name: 'whale', link: 'whale.com' },
      permission: {
        service: 'CurrencyService',
        operations: ['read', 'create'],
      },
    },
  ],
  sponsor_id: '75c162af44624fff9921a524',
};

const Max: PersonServiceSimpleModel = {
  name: 'Max',
  identifications: [
    {
      identification: '123@gmail.com',
      type: 'GOOGLE',
    },
  ],
  permissions: [
    {
      system: { id: '75c162af44624fff9921a524' },
      permission: {
        service: 'CurrencyService',
        operations: ['GET', 'POST'],
      },
    },
  ],
};

const Xam: PersonServiceSimpleModel = {
  name: 'Xam',
  identifications: [
    {
      identification: '321@gmail.com',
      type: 'GOOGLE',
    },
  ],
  permissions: [
    {
      system: { id: '75c162af44624fff9921a524' },
      permission: {
        service: 'person',
        operations: ['GET', 'POST', 'PUT'],
      },
    },
  ],
};

const googleIdentification: IdentificationServiceSimpleModel = {
  identification: '123@gmail.com',
  type: 'GOOGLE',
};

const googleDAOIdentification: IdentificationDAOSimpleModel = {
  ...googleIdentification,
};

export {
  japa,
  makes,
  froes,
  china,
  lucas,
  i2,
  masterIdentification,
  master,
  Bob,
  Max,
  Xam,
  vale,
  betDAO,
  googleIdentification,
  googleDAOIdentification,
};
