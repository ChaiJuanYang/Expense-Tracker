import { Injectable } from '@angular/core';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket : Socket;
  constructor() { 
    this.socket = io("http://localhost:8081");
  }

   // Method to listen for events
   onEvent(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  // Method to emit events
  emitEvent(event: string, data: any) {
    this.socket.emit(event, data);
  }

  // Method to disconnect the socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}