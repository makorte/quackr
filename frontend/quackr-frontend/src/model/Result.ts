export abstract class Result<T> {
  public abstract isOk(): boolean;

  public abstract isErr(): boolean;

  public abstract get(): T;
}

export class OK<T> extends Result<T> {
  private value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  isOk(): boolean {
    return true;
  }

  get(): T {
    return this.value;
  }

  isErr(): boolean {
    return false;
  }

}

export class Err extends Result<ErrorCodes> {
  private code: ErrorCodes;

  constructor(code: ErrorCodes) {
    super();
    this.code = code;
  }

  isOk(): boolean {
    return false;
  }

  get(): ErrorCodes {
    return this.code;
  }

  isErr(): boolean {
    return false;
  }
}

export enum ErrorCodes {
  NOT_FOUND = 1
}

