import { Module } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  providers: [AutomationService],
  exports: [AutomationService],
})
export class AutomationModule {}