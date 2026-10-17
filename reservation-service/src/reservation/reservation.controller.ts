import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() body: { userId: number; resourceId: number }) {
    return this.reservationService.create(body.userId, body.resourceId);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }
}
