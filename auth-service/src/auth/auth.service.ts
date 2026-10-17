import { Injectable, ConflictException, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private users: { id: number; name: string; email: string; password: string }[] = [];
  private nextId = 1;

  constructor(@Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy) {
    this.client.connect().catch(() => {});
  }

  register(dto: RegisterDto) {
    const exists = this.users.find((u) => u.email === dto.email);
    if (exists) throw new ConflictException('Email already registered');

    const user = { id: this.nextId++, ...dto };
    this.users.push(user);

    const { password, ...result } = user;

    this.client.emit('user_registered', { name: result.name, email: result.email });

    return result;
  }

  login(dto: LoginDto) {
    const user = this.users.find(
      (u) => u.email === dto.email && u.password === dto.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { password, ...result } = user;
    return {
      message: 'Login successful', user: result,
    };
  }
}
