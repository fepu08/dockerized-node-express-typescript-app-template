export default class DummyError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, DummyError.prototype);
    this.name = 'Dummy Error';
  }
}
