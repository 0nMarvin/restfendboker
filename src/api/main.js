const BookingAPI = require('./bookingAPI.js'); // Usando require para importar BookingAPI

const testarBookingAPI = async () => {
  try {
    // Cria a instância da classe BookingAPI
    const bookingAPI = new BookingAPI();
    
    // Cria o token de autenticação
    await bookingAPI.createAuthToken();
    
    // Testa o método de obter reservas
    console.log('Obtendo reservas...');
    const reservas = await bookingAPI.getBookings();
    console.log('Reservas obtidas:', reservas);
    
  } catch (error) {
    console.error('Erro durante o teste:', error);
  }
};

// Executa o teste
testarBookingAPI();
