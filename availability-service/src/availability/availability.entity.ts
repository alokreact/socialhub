import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resourceId: number;

  @Column({ default: 0 })
  bookedCapacity: number;

  @Column({ default: 100 })
  totalCapacity: number;
}
