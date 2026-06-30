import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  sendAssignmentEmail(ticketTitle: string, assignedTo: string): void {
    this.logger.log('==============================');
    this.logger.log('SIMULACIÓN DE ENVÍO DE CORREO');
    this.logger.log(`Para: ${assignedTo}`);
    this.logger.log(`Asunto: Ticket asignado`);
    this.logger.log(`Mensaje: Se te ha asignado el ticket "${ticketTitle}".`);
    this.logger.log('==============================');
  }
}