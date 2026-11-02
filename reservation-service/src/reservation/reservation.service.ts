import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentClient: ClientProxy,
  ) {}

  async create(userId: number, resourceId: number) {
    const reservation = this.reservationRepo.create({ userId, resourceId, status: 'confirmed' });
    await this.reservationRepo.save(reservation);

    const payment = await firstValueFrom(
      this.paymentClient.send('payment_process', { reservationId: reservation.id, userId, amount: 100 }),
    );

    return { ...reservation, payment };
  }

  findAll() {
    return this.reservationRepo.find();
  }
}
