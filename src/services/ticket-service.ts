import { Ticket, TicketData } from "../types";
import { StorageService } from "./storage-service";

// use ionic local storage or http client from API
export class TicketService {
  tickets: Ticket[] | null = null;
  readonly storageService: StorageService;

  constructor(tickets?: Ticket[]) {
    if (!tickets) {
      this.tickets = null;
    } else {
      this.tickets = tickets;
    }
    this.storageService = new StorageService();
  }

  async storeDataFromFile() {
    try {
      const response = await fetch("src/utils/data.json");
      const data = await response.json();

      this.tickets = data.tickets;
      this.storageService.setStorage("app_data", data);
    } catch (error) {
      console.error("Error fetching data from file and storing it ", error);
    }
  }

  async readProperty(key: string) {
    if (!this.tickets) {
      return false;
    }

    return this.tickets.flatMap(
      // @ts-ignore
      (ticket) => ticket.hasOwnProperty(key) && ticket[key]
    );
  }

  async getTickets(): Promise<any> {
    return await this.storageService.getStorage("app_data");
  }

  archiveTicket(ticketId: string): boolean {
    // find ticket by id and set archived to true

    if (!this.tickets) {
      return false;
    }

    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);

    if (ticket) {
      ticket.archived = true;
      return true;
    } else {
      console.error("Ticket not found");
    }
    return false;
  }

  syncTicket(newTicket: Ticket): void {
    // find ticket by id and update it
    if (!this.tickets) {
      return;
    }

    const ticketIndex = this.tickets.findIndex(
      (ticket) => ticket.id === newTicket.id
    );

    // ticket is found
    if (ticketIndex !== -1) {
      this.tickets[ticketIndex] = newTicket;
    } else {
      console.error("Ticket not found");
    }
  }
}

const ticketService = new TicketService();

export default ticketService;
