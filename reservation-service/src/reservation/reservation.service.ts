import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @Inject('AVAILABILITY_SERVICE')
    private readonly client: ClientProxy,
  ) {
    this.client.connect().catch(() => {});
  }

  async create(userId: number, resourceId: number) {
    const reservation = this.reservationRepo.create({ userId, resourceId, status: 'confirmed' });
    await this.reservationRepo.save(reservation);

    this.client.emit('reservation_created', { resourceId });

    return reservation;
  }

  findAll() {
    return this.reservationRepo.find();
  }
}
