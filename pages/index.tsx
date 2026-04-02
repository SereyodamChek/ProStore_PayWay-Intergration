import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { products, Product } from '../lib/products';
import ProductCard from '../components/ProductCard';
import CheckoutModal from '../components/CheckoutModal';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Head>
        <title>ProStore — Premium Subscriptions</title>
        <meta name="description" content="Buy ChatGPT, Grok, Gemini, CapCut, Canva & YouTube Premium with ABA PayWay" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* ABA PayWay SDK */}
      <Script src="https://checkout.payway.com.kh/plugins/checkout2-0.js" strategy="beforeInteractive" />

      {/* Hidden ABA form target */}
      <div id="aba_main_modal" style={{ display: 'none' }}>
        <div className="aba-modal-content"></div>
      </div>
      <iframe name="aba_webservice" style={{ display: 'none' }} />

      <div className={styles.wrapper}>
        {/* Orbs */}
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <span className={styles.logoText}>ProStore</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.badge}>🇰🇭 ABA PayWay</span>
          </div>
        </header>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroTag}>Premium Digital Subscriptions</div>
          <h1 className={styles.heroTitle}>
            Your favorite AI tools,<br />
            <span className={styles.heroAccent}>one place to buy</span>
          </h1>
          <p className={styles.heroSubtitle}>
            ChatGPT, Grok, Gemini, CapCut, Canva & YouTube Premium — pay securely with ABA PayWay
          </p>
        </section>

        {/* Products grid */}
        <section className={styles.grid}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={() => setSelectedProduct(product)}
            />
          ))}
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2025 ProStore · Secured by <strong>ABA PayWay</strong> · All subscriptions are digital goods</p>
        </footer>
      </div>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
