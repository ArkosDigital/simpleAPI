import { Mixin, settings } from 'ts-mixer';
settings.initFunction = 'init';

abstract class ClassA {
  public name;
  public test;

  constructor(test: string) {
    this.name = this.constructor.name;
    this.test = test;
  }
  init(): void {
    this.name = this.constructor.name;
  }
}

class ClassB extends ClassA {
  public name1;
  init(): void {
    super.init();
    this.name1 = this.name + 1;
  }
}

class ClassC extends ClassA {
  public name2;
  init(): void {
    super.init();
    this.name2 = this.name + 2;
  }
}

class ClassD extends ClassA {
  public name3;
  init(): void {
    super.init();
    this.name3 = this.name + 3;
  }

  printName() {
    console.log(this.name3);
    return this.name3;
  }

  printTest() {
    console.log(this.test);
    return this.test;
  }
}

class ClassE extends Mixin(ClassB, ClassC) {}

class ClassF extends Mixin(ClassE, ClassD) {}

const assignObject = (
  type,
  object: Record<string, unknown>
): Record<string, unknown> => {
  return Object.assign(new type(), object);
};

test('test Mixin', async (done) => {
  const b = new ClassB('BB');
  const c = new ClassC('CC');
  const d = new ClassD('DD');
  const e = new ClassE('EE');
  const f = new ClassF('FF');

  expect(b).toStrictEqual(assignObject(ClassB, { name: 'ClassB', test: 'BB' }));
  expect(c).toStrictEqual(assignObject(ClassC, { name: 'ClassC', test: 'CC' }));
  expect(d).toStrictEqual(assignObject(ClassD, { name: 'ClassD', test: 'DD' }));
  expect(e).toStrictEqual(
    assignObject(ClassE, {
      name: 'ClassE',
      name1: 'ClassE1',
      name2: 'ClassE2',
      test: 'EE',
    })
  );
  expect(f).toStrictEqual(
    assignObject(ClassF, {
      name: 'ClassF',
      name1: 'ClassF1', // RECEIVING name1: 'ClassE1'
      name2: 'ClassF2',
      name3: 'ClassF3',
      test: 'FF',
    })
  );

  f.printName();
  f.printTest();

  done();
});
