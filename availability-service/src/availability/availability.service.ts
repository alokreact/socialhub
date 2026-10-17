import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private readonly availabilityRepo: Repository<Availability>,
  ) {}

  async updateBookedCapacity(resourceId: number) {
    let availability = await this.availabilityRepo.findOne({ where: { resourceId } });

    if (!availability) {
      availability = this.availabilityRepo.create({ resourceId, bookedCapacity: 1 });
    } else {
      availability.bookedCapacity += 1;
    }

    await this.availabilityRepo.save(availability);
    console.log(`Updated bookedCapacity for resource ${resourceId}: ${availability.bookedCapacity}`);
  }

  findAll() {
    return this.availabilityRepo.find();
  }
}
