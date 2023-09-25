import { useContext } from 'react';

import ProductCard from '../../components/productCard/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';
import './shop.styles.scss';

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="products-container">
      {categoriesMap.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
