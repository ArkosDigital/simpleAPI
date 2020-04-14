import { Mixin, settings } from 'ts-mixer';
settings.initFunction = 'init';

const assignObject = (type, object) => {
  return Object.assign(new type(), object);
};

abstract class ClassA {
  public name;

  constructor() {
    this.name = this.constructor.name;
  }
  init() {
    this.name = this.constructor.name;
  }
}

class ClassB extends ClassA {
  public name1;
  init() {
    super.init();
    this.name1 = this.name + 1;
  }
}

class ClassC extends ClassA {
  public name2;
  init() {
    super.init();
    this.name2 = this.name + 2;
  }
}

class ClassD extends ClassA {
  public name3;
  init() {
    super.init();
    this.name3 = this.name + 3;
  }
}

class ClassE extends Mixin(ClassB, ClassC) {}

class ClassF extends Mixin(ClassE, ClassD) {}

test('test Mixin', async (done) => {
  const b = new ClassB();
  const c = new ClassC();
  const d = new ClassD();
  const e = new ClassE();
  const f = new ClassF();

  expect(b).toStrictEqual(assignObject(ClassB, { name: 'ClassB' }));
  expect(c).toStrictEqual(assignObject(ClassC, { name: 'ClassC' }));
  expect(d).toStrictEqual(assignObject(ClassD, { name: 'ClassD' }));
  expect(e).toStrictEqual(
    assignObject(ClassE, {
      name: 'ClassE',
      name1: 'ClassE1',
      name2: 'ClassE2',
    })
  );
  expect(f).toStrictEqual(
    assignObject(ClassF, {
      name: 'ClassF',
      name1: 'ClassF1', // RECEIVING name1: 'ClassE1'
      name2: 'ClassF2',
      name3: 'ClassF3',
    })
  );

  done();
});
