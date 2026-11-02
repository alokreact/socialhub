import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async process(reservationId: number, userId: number, amount: number) {
    const payment = this.paymentRepo.create({ reservationId, userId, amount, status: 'paid' });
    await this.paymentRepo.save(payment);
    return { paymentId: payment.id, status: payment.status };
  }

  findAll() {
    return this.paymentRepo.find();
  }
}
