export class Availability {
  readonly from: string;
  readonly to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public getFrom(): string {
    return this.from;
  }

  public getTo(): string {
    return this.to;
  }
}
