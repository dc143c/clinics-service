import { Availability, Clinic } from '@/shared/entities';
import { compareTwoArrays } from '@/shared/helpers';

describe('Helper testing', () => {
  it('Array comparison should avoid duplicates', () => {
    const array1 = [
      new Clinic(
        'Good Health Home',
        'Florida',
        new Availability('15:00', '20:00'),
      ),
      new Clinic(
        'National Veterinary Clinic',
        'California',
        new Availability('15:00', '22:30'),
      ),
      new Clinic(
        'German Pets Clinics',
        'Kansas',
        new Availability('08:00', '20:00'),
      ),
    ];
    expect(JSON.stringify(compareTwoArrays(array1, array1))).toBe(
      JSON.stringify(array1),
    );
  });

  it('Array comparison should input the filtered array', () => {
    const array1 = [];
    const array2 = [
      new Clinic(
        'Good Health Home',
        'Florida',
        new Availability('15:00', '20:00'),
      ),
      new Clinic(
        'National Veterinary Clinic',
        'California',
        new Availability('15:00', '22:30'),
      ),
      new Clinic(
        'German Pets Clinics',
        'Kansas',
        new Availability('08:00', '20:00'),
      ),
    ];
    expect(JSON.stringify(compareTwoArrays(array2, array1))).toBe(
      JSON.stringify(array2),
    );
  });

  it('Array comparison should return an empty array', () => {
    const array1 = [
      new Clinic(
        'Good Health Home',
        'Florida',
        new Availability('15:00', '20:00'),
      ),
      new Clinic(
        'National Veterinary Clinic',
        'California',
        new Availability('15:00', '22:30'),
      ),
      new Clinic(
        'German Pets Clinics',
        'Kansas',
        new Availability('08:00', '20:00'),
      ),
    ];
    const array2 = [
      new Clinic(
        'National Veterinary Clinic',
        'California',
        new Availability('15:00', '22:30'),
      ),
      new Clinic(
        'German Pets Clinics',
        'Kansas',
        new Availability('08:00', '20:00'),
      ),
    ];
    expect(JSON.stringify(compareTwoArrays(array1, array2))).toBe(
      JSON.stringify([]),
    );
  });
});
