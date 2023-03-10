import { Availability } from '@/shared/entities/Availability';
import { Clinic } from '@/shared/entities/Clinic';

describe('Entity testing', () => {
  it('Availability should be defined', () => {
    const availabilityMock = new Availability('10:00', '23:00');
    expect(availabilityMock).toBeDefined();
    expect(availabilityMock.getFrom()).toBe('10:00');
    expect(availabilityMock.getTo()).toBe('23:00');
  });

  it('Clinic should be defined', () => {
    const availabilityMock = new Availability('10:00', '23:00');
    const clinicMock = new Clinic('Pet', 'California', availabilityMock);
    expect(clinicMock).toBeDefined();
    expect(clinicMock.getName()).toBe('Pet');
    expect(clinicMock.getStateName()).toBe('California');
    expect(JSON.stringify(clinicMock.getAvailability())).toBe(
      JSON.stringify(availabilityMock),
    );
  });
});
