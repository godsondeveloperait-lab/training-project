import { Test, TestingModule } from '@nestjs/testing';
import { CronService } from './cron.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

describe('CronService', () => {
  let service: CronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CronService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: MailService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CronService>(CronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
