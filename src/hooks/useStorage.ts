import { useCallback, useEffect, useMemo, useState } from "react";
import { Message, Ticket } from "../types";
import { Storage, Drivers } from "@ionic/storage";
import { ticket } from "ionicons/icons";

// Custom hook to manage storage and ticket data
export default function useStorage() {
  const [store, setStore] = useState<Storage>();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // init storage on render
    const initStorage = async () => {
      try {
        const newStore = new Storage({
          name: "ownersdb",
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        });
        const store = await newStore.create();
        setStore(store);

        let value = await store.get("tickets");

        if (!value) {
          const response = await fetch("/src/utils/data.json");
          const data = await response.json();

          await store.set("tickets", data.tickets);
          value = data.tickets;
        }

        setTickets(value);
      } catch (error) {
        console.error("Error initializing storage: ", error);
      }
    };
    initStorage();
  }, []);

  const createTicket = async (ticket: Ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);

    await store?.set("tickets", [...tickets, ticket]);
  };

  const addMessage = async (ticketId: string, message: Message) => {
    const ticket = tickets.find((t) => t.id === ticketId);

    if (ticket) {
      let newTicket: Ticket = {
        ...ticket,
        conversation: [...ticket.conversation, message], // append message to conv array
      };

      let newTickets = tickets.map((t) => (t.id === ticketId ? newTicket : t));

      setTickets(newTickets);

      await store?.set("tickets", newTickets);
    } else {
      throw new Error("No ticket found !");
    }
  };

  // read data from state and store in the storage
  const syncTickets = async () => {
    try {
      const savedTickets = await store?.get("tickets");
      setTickets(savedTickets);
    } catch (error) {
      console.error("Error syncing tickets: ", error);
    }
  };

  const updateTicket = async (ticketId: string, ticket: Partial<Ticket>) => {
    const { archived, status, conversation, description, id } = ticket;

    const updatedTickets = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          archived: archived || t.archived,
          // update status if provided
          status: status || t.status,
          // append new conversation to existing conversation
          conversation: [...t.conversation, ...(conversation || [])],
          // update description if provided
          description: description || t.description,
        };
      }
      return t;
    });

    // update state and storage
    setTickets(updatedTickets);
    store?.set("tickets", updatedTickets);
  };

  const archiveTicket = async (ticketId: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId && !ticket.archived) {
        return { ...ticket, archived: true };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    store?.set("tickets", updatedTickets);
  };

  const removeTicket = async (ticketId: string) => {
    const newTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(newTickets);
    await store?.set("tickets", newTickets);
  };

  const emptyTickets = async () => {
    setTickets([]);
    await store?.clear();
  };

  const getTicket = async (id: string) => {
    const savedTickets = await store?.get("tickets");
    return savedTickets?.find((ticket: Ticket) => ticket.id === id);
  };

  const getTickets = () => {
    return tickets;
  };

  return {
    tickets,
    getTickets,
    getTicket,
    createTicket,
    removeTicket,
    archiveTicket,
    updateTicket,
    emptyTickets,
    addMessage,
    syncTickets,
  };
}
