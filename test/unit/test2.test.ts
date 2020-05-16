import { Mixin, settings } from 'ts-mixer';
import { Journaly } from 'journaly';
settings.initFunction = 'init';

abstract class ClassA {
  protected journaly: Journaly<unknown> = new Journaly();
  protected name;
  protected test;

  init(test: string, journaly?: Journaly<unknown>): void {
    this.name = this.constructor.name;
    this.test = test;
    this.journaly = journaly ? journaly : new Journaly();
  }

  getName(): string {
    return this.name;
  }

  getTest(): string {
    return this.name;
  }
}

class ClassB extends ClassA {
  protected name1;
  init(test: string, journaly?: Journaly<any>): void {
    super.init(test, journaly);
    this.name1 = this.name + 1;
  }

  getName1(): string {
    return this.name1;
  }
}

class ClassC extends ClassA {
  protected name2;
  init(test: string, journaly?: Journaly<unknown>): void {
    super.init(test, journaly);
    this.name2 = this.name + 1;
  }

  getName2(): string {
    return this.name2;
  }
}

class ClassD extends ClassA {
  protected test1 = '';
}

class ClassE extends Mixin(ClassB, ClassC) {
  init(test: string, journaly?: Journaly<unknown>): void {
    super.init(test, journaly);
    this.name2 = this.name + 1;
  }

  getName1And2(): string {
    return this.name + this.name2;
  }
}

class ClassF extends ClassE {
  getNames(): string {
    return this.getName() + this.getName1And2();
  }
}

abstract class ClassG extends Mixin(ClassF, ClassD) {
  getNames(): string {
    return this.getName() + this.getName1And2() + this.test1;
  }
}

class ClassH extends ClassG {
  getNames(): string {
    return super.getNames() + this.journaly;
  }
}

const assignObject = (
  type,
  object: Record<string, unknown>
): Record<string, unknown> => {
  return Object.assign(new type(), object);
};

test('test Mixin', async (done) => {
  //   const h = new ClassH('BB');

  //   expect(b).toStrictEqual(assignObject(ClassB, { name: 'ClassB', test: 'BB' }));
  //   expect(c).toStrictEqual(assignObject(ClassC, { name: 'ClassC', test: 'CC' }));
  //   expect(d).toStrictEqual(assignObject(ClassD, { name: 'ClassD', test: 'DD' }));
  //   expect(e).toStrictEqual(
  //     assignObject(ClassE, {
  //       name: 'ClassE',
  //       name1: 'ClassE1',
  //       name2: 'ClassE2',
  //       test: 'EE',
  //     })
  //   );
  //   expect(f).toStrictEqual(
  //     assignObject(ClassF, {
  //       name: 'ClassF',
  //       name1: 'ClassF1', // RECEIVING name1: 'ClassE1'
  //       name2: 'ClassF2',
  //       name3: 'ClassF3',
  //       test: 'FF',
  //     })
  //   );

  //   f.printName();
  //   f.printTest();

  done();
});
