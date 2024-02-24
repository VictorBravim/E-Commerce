import { useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  quantity: number;
}

interface ProductDetailsPageProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
  handleAddToFavorites?: (product: Product) => void;
  favoriteStatus?: { [key: number]: boolean };
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({ products, handleAddToCart, handleAddToFavorites, favoriteStatus }) => {
  const { productId } = useParams<{ productId?: string }>();
  const parsedProductId = productId ? parseInt(productId) : -1;

  const product = products.find(p => p.id === parsedProductId);

  if (!product) {
    return <div>Produto não encontrado!</div>;
  }

  const handleClickAddToCart = () => {
    handleAddToCart(product);
  };

  const handleClickAddToFavorites = () => {
    if (handleAddToFavorites && favoriteStatus) {
      handleAddToFavorites(product);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <img src="/img/Frame 1.png" alt="Imagem de fundo" className="absolute inset-0 object-cover" style={{ borderRadius: '80px', width: '30%', height: '70%', marginTop: '10%', marginLeft: '20%' }} />
      <div className="absolute flex justify-center items-center" style={{ backgroundColor: '#fff', marginTop: '6%', width: '50%', height: '50%', borderRadius: '80px', opacity: '1' }}>
        <div className="flex justify-center items-center w-1/3">
          <div className="w-50 h-50 overflow-hidden" style={{ background: '#' }}>
            <img src={product.image} alt={product.name} className="object-cover" />
          </div>
        </div>
        <div className="container w-1/3 text-center text-black">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          <p className="text-lg mb-4">Preço: R$ {product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4" onClick={handleClickAddToCart}>Comprar</button>
          {handleAddToFavorites && favoriteStatus && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4" onClick={handleClickAddToFavorites}>
              {favoriteStatus[product.id] ? <FaHeart /> : <FaRegHeart />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
