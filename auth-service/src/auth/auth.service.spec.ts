import { ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  describe('register', () => {
    const dto = { name: 'John', email: 'john@example.com', password: 'secret' };

    it('should register a new user and return without password', () => {
      const result = service.register(dto);
      expect(result).toEqual({ id: 1, name: 'John', email: 'john@example.com' });
      expect(result).not.toHaveProperty('password');
    });

    it('should increment id for each new user', () => {
      service.register(dto);
      const result = service.register({ name: 'Jane', email: 'jane@example.com', password: '1234' });
      expect(result.id).toBe(2);
    });

    it('should throw ConflictException if email already exists', () => {
      service.register(dto);
      expect(() => service.register(dto)).toThrow(ConflictException);
    });

    it('should throw ConflictException with correct message', () => {
      service.register(dto);
      expect(() => service.register(dto)).toThrow('Email already registered');
    });
  });
});
