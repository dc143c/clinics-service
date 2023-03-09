import { Clinic } from "@/shared/entities";
import { Module } from "@nestjs/common";
import axios from "axios";
import { PROVIDER_LIST } from './providers/index';
import { STATECODE_LIST } from "./constants";

@Module({})
export class ClinicRepository {
    private readonly repository: Clinic[] = [];

    constructor() {
        // Prepare the repository with the data from the providers
        PROVIDER_LIST.forEach((provider) => {
            axios({
            method: provider.PROVIDER_METHOD,
            url: provider.PROVIDER_URL,
            headers: provider.PROVIDER_API_KEY ? {
                "Authorization": "Bearer " + provider.PROVIDER_API_KEY,
            } : {},
            })
            .then((response) => {
                response.data.forEach((clinic: Clinic) => {
                    clinic = new Clinic(Object.values(clinic)[0], Object.values(clinic)[1], Object.values(clinic)[2]);

                    if(clinic.getStateName().length == 2) { 
                        clinic.setStateName(STATECODE_LIST[clinic.getStateName()]);
                    };

                    this.repository.push(clinic);
                });
            })
            .catch((error) => {
                console.error("\n ⚠ FAIL ON GATHERING INFORMATION FROM PROVIDER: " + provider.PROVIDER_NAME + ".\n", error.code + "\n", error.message + "\n ####################");
            });
        });
    }

    async findAll(): Promise<Clinic[]> {    
        return this.repository;
    }

    async findByName(name: string): Promise<Clinic[]> {
        return this.repository.filter((clinic: Clinic) => clinic.getName() === name);
    }

    async findByStateName(stateName: string): Promise<Clinic[]> {
        if(stateName.length == 2) stateName = STATECODE_LIST[stateName.toUpperCase()];
        return this.repository.filter((clinic: Clinic) => clinic.getStateName() === stateName);
    }

    async findByAvailabilityFrom(availabilityFrom: string): Promise<Clinic[]> {
        return this.repository.filter((clinic: Clinic) => clinic.getAvailabilityFrom() === availabilityFrom);
    }

    async findByAvailabilityTo(availabilityTo: string): Promise<Clinic[]> {
        return this.repository.filter((clinic: Clinic) => clinic.getAvailabilityTo() === availabilityTo);
    }
}