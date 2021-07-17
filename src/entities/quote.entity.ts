import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  quote: string;

  @Column()
  attributed: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  year?: number;

  @JoinTable()
  @ManyToMany((type) => Tag, (tag) => tag.quotes, {
    nullable: true,
    cascade: true,
  })
  tags?: Tag[];
}
