import { Product } from '../lib/products';
import styles from '../styles/ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <div className={styles.card}>
      {product.badge && (
        <div className={styles.badge}>{product.badge}</div>
      )}
      <div className={`${styles.iconWrap} bg-gradient-to-br ${product.gradient}`}>
        <span className={styles.icon}>{product.icon}</span>
      </div>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.desc}>{product.description}</p>
      <ul className={styles.features}>
        {product.features.map((f, i) => (
          <li key={i}><span className={styles.check}>✓</span> {f}</li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.price}>
          <span className={styles.amount}>${product.price.toFixed(2)}</span>
          <span className={styles.period}>{product.period}</span>
        </div>
        <button className={styles.buyBtn} onClick={() => onBuy(product)}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
