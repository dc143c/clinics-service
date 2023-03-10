'use strict';

import { Availability } from '.';

export class Clinic {
  private readonly name: string;
  private stateName: string;
  private readonly availability: Availability;

  constructor(name: string, stateName: string, availability: Availability) {
    this.name = name;
    this.stateName = stateName;
    this.availability = new Availability(availability.from, availability.to);
  }

  public getName(): string {
    return this.name;
  }

  public getStateName(): string {
    return this.stateName;
  }

  public setStateName(stateName: string): string {
    this.stateName = stateName;
    return this.stateName;
  }

  public getAvailability(): Availability {
    return this.availability;
  }

  public getAvailabilityFrom(): string {
    return this.availability.getFrom();
  }

  public getAvailabilityTo(): string {
    return this.availability.getTo();
  }
}
