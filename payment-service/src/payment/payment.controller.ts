import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('payment_process')
  handlePayment(@Payload() data: { reservationId: number; userId: number; amount: number }) {
    return this.paymentService.process(data.reservationId, data.userId, data.amount);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
