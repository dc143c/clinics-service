'use strict'

class Availability {
    readonly from: string;
    readonly to: string;

    constructor(from: string, to: string) {
        this.from = from;
        this.to = to;
    }

    getFrom(): string {
        return this.from;
    }

    getTo(): string {
        return this.to;
    }
}

export class Clinic {
    private readonly name: string;
    private stateName: string;
    private readonly availability: Availability;

    constructor(name: string, stateName: string, availability: Availability) {
        this.name = name;
        this.stateName = stateName;
        this.availability = new Availability(availability.from, availability.to);
    }

    getName(): string {
        return this.name;
    }

    getStateName(): string {
        return this.stateName;
    }

    setStateName(stateName: string): string {
        this.stateName = stateName;
        return this.stateName;
    }

    getAvailability(): Availability {
        return this.availability;
    }

    getAvailabilityFrom(): string {
        return this.availability.getFrom();
    }

    getAvailabilityTo(): string {
        return this.availability.getTo();
    }
}