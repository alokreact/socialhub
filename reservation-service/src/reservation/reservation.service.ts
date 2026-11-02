import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(userId: number, resourceId: number) {
    const reservation = this.reservationRepo.create({ userId, resourceId, status: 'confirmed' });
    await this.reservationRepo.save(reservation);
    return reservation;
  }

  findAll() {
    return this.reservationRepo.find();
  }
}
