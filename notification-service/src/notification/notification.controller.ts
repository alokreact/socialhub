import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(@Payload() data: { name: string; email: string }) {
    await this.notificationService.sendAdminEmail(data.name, data.email);
  }
}
