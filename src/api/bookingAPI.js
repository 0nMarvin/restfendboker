const APIConnection = require('./connection.js'); // Usando require para importar APIConnection

class BookingAPI extends APIConnection {

  // Métodos específicos de booking
  async getBookingsIds() {
    try {
      const response = await this.req('get', '/booking');
      return response;
    } catch (error) {
      console.error("Erro ao obter reservas:", error);
      throw error;
    }
  }

  async getBookings(bookID) {
    try {
      const response = await this.req('get', '/booking/' + bookID);
      return response;
    } catch (error) {
      console.error("Erro ao obter reserva:", error);
      throw error;
    }
  }

  async createBooking(bookingData) {
    try {
      const response = await this.req('post', '/booking', bookingData);
      return response;
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      throw error;
    }
  }

  async updateBooking(bookID, bookingData) {
    try {
      const response = await this.req('put', '/booking/' + bookID, bookingData);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar reserva:", error);
      throw error;
    }
  }

  async updateBookingParcial(bookID, bookingData) {
    try {
      const response = await this.req('patch', '/booking/' + bookID, bookingData);
      return response;
    } catch (error) {
      console.error("Erro ao atualizar reserva parcialmente:", error);
      throw error;
    }
  }

  async deleteBooking(bookID) {
    try {
      const response = await this.req('delete', '/booking/' + bookID);
      return response;
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      throw error;
    }
  }
}

// Usando module.exports para exportar a classe
module.exports = BookingAPI;
