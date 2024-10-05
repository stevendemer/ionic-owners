import { Ticket, TicketData } from "../types";

// use ionic local storage or http client from API
export class TicketService {
  tickets: Ticket[];

  constructor(tickets: Ticket[]) {
    this.tickets = tickets;
  }

  getTickets(): Ticket[] {
    return this.tickets;
  }

  archiveTicket(ticketId: string): void {
    // read from the storage
  }

  syncTicket(newTicket: Ticket): void {}
}
