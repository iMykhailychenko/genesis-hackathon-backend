import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import authConfig from '../../../config/auth.config';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { FavoriteEntity } from '../../favorite/entities/favorite.entity';
import { PostEntity } from '../../posts/entities/posts.entity';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastActivity: Date;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @Column({ type: 'varchar', default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => PostEntity, posts => posts.user)
    posts: PostEntity[];

    @OneToMany(() => FavoriteEntity, favorite => favorite.user)
    favorite: FavoriteEntity[];

    @OneToMany(() => CommentsEntity, comment => comment.user)
    comments: CommentsEntity[];

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, authConfig.saltRounds);
    }
}
