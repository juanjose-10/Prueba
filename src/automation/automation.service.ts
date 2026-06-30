import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class AutomationService {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  notifyAssignment(ticketTitle: string, assignedTo: string): void {
    this.emailService.sendAssignmentEmail(
      ticketTitle,
      assignedTo,
    );
  }
}