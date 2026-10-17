import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @EventPattern('reservation_created')
  async handleReservationCreated(@Payload() data: { resourceId: number }) {
    await this.availabilityService.updateBookedCapacity(data.resourceId);
  }

  @Get()
  findAll() {
    return this.availabilityService.findAll();
  }
}
