import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';


import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { AssignTicketDto } from './dto/assign-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
findAll(@Query('status') status?: string) {
  return this.ticketsService.findAll(status);
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
  @Patch(':id/status')
updateStatus(
  @Param('id') id: string,
  @Body() updateTicketStatusDto: UpdateTicketStatusDto,
) {
  return this.ticketsService.updateStatus(
    id,
    updateTicketStatusDto.status,
  );
}
@Patch(':id/assign')
assignTicket(
  @Param('id') id: string,
  @Body() assignTicketDto: AssignTicketDto,
) {
  return this.ticketsService.assignTicket(
    id,
    assignTicketDto.assignedTo,
  );
}
}