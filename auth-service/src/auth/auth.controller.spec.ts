import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('POST /auth/register', () => {
    const dto = { name: 'John', email: 'john@example.com', password: 'secret' };

    it('should return registered user without password', () => {
      const result = controller.register(dto);
      expect(result).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
      expect(result).not.toHaveProperty('password');
    });

    it('should delegate to AuthService.register', () => {
      const spy = jest.spyOn(service, 'register');
      controller.register(dto);
      expect(spy).toHaveBeenCalledWith(dto);
    });

    it('should propagate ConflictException from service', () => {
      controller.register(dto);
      expect(() => controller.register(dto)).toThrow(ConflictException);
    });
  });
});
