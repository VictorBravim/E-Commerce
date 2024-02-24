import React from 'react';

// Definição do tipo Product
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  // Obter os itens do carrinho da URL
  const urlParams = new URLSearchParams(window.location.search);
  const itemsString = urlParams.get('items');
  const items: Product[] = itemsString ? JSON.parse(decodeURIComponent(itemsString)) : [];

  // Função para processar o envio do formulário
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode adicionar lógica para processar o envio do formulário, como enviar os dados para o servidor, etc.
    // Por enquanto, apenas exibiremos um console.log() com os dados do formulário
    console.log('Formulário enviado!');
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Quantidade: {item.quantity} - Preço: R$ {item.price * item.quantity}
          </li>
        ))}
      </ul>
      {/* Formulário de checkout */}
      <form onSubmit={handleFormSubmit} className="mt-8">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input type="text" id="fullName" name="fullName" required className="mt-1 px-4 py-2 w-full border-gray-300 rounded-md" />
        </div>
        {/* Adicione aqui mais campos do formulário, como endereço de entrega, informações de pagamento, etc. */}
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Finalizar Compra</button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
