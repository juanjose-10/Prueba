import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutomationService } from '../automation/automation.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly automationService: AutomationService,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findAll(status?: string): Promise<Ticket[]> {
  if (status) {
    return await this.ticketRepository.find({
      where: {
        status: status as any,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  return await this.ticketRepository.find({
    order: {
      createdAt: 'DESC',
    },
  });
}

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    Object.assign(ticket, updateTicketDto);

    return await this.ticketRepository.save(ticket);
  }

  async remove(id: string): Promise<void> {
    const ticket = await this.findOne(id);

    await this.ticketRepository.remove(ticket);
  }

  async updateStatus(id: string, status: string): Promise<Ticket> {
  const ticket = await this.findOne(id);

  ticket.status = status as any;

  return await this.ticketRepository.save(ticket);
}
async assignTicket(id: string, assignedTo: string): Promise<Ticket> {
  const ticket = await this.findOne(id);

  ticket.assignedTo = assignedTo;

  const updatedTicket = await this.ticketRepository.save(ticket);

  this.automationService.notifyAssignment(
    updatedTicket.title,
    updatedTicket.assignedTo,
  );

  return updatedTicket;
}
}