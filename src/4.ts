export class Key {
  private readonly signature = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

export class Person {
  constructor(private readonly key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

export abstract class House {
  public door = false;
  public readonly tenants: Person[] = [];

  constructor(protected readonly key: Key) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

export class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);