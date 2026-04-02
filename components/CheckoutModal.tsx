import { useState } from 'react';
import { Product } from '../lib/products';
import styles from '../styles/Checkout.module.css';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: product.price.toFixed(2),
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          returnParams: `product=${product.id}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Build and submit the ABA PayWay form
      const formEl = document.createElement('form');
      formEl.method = 'POST';
      formEl.action = data.apiUrl;
      formEl.target = 'aba_webservice';

      const fields: Record<string, string> = {
        hash: data.hash,
        tran_id: data.transactionId,
        amount: data.amount,
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        email: data.email,
        return_params: data.returnParams,
        merchant_id: data.merchantId,
        req_time: data.reqTime,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formEl.appendChild(input);
      });

      document.body.appendChild(formEl);

      // Open ABA PayWay popup
      const popup = window.open('', 'aba_webservice', 'width=500,height=600,scrollbars=yes');
      if (popup) {
        formEl.submit();
      } else {
        // fallback: submit in same tab
        formEl.target = '_blank';
        formEl.submit();
      }

      document.body.removeChild(formEl);
      // Also trigger AbaPayway if SDK loaded
      if (typeof (window as any).AbaPayway !== 'undefined') {
        (window as any).AbaPayway.checkout();
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✕</button>

        <div className={`${styles.productHeader} bg-gradient-to-r ${product.gradient}`}>
          <span className={styles.productIcon}>{product.icon}</span>
          <div>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productPrice}>${product.price.toFixed(2)}{product.period}</p>
          </div>
        </div>

        <div className={styles.form}>
          <h3>Your Details</h3>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>First Name</label>
              <input name="firstName" placeholder="Makara" value={form.firstName} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input name="lastName" placeholder="Prom" value={form.lastName} onChange={handleChange} />
            </div>
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input name="phone" type="tel" placeholder="093xxxxxxx" value={form.phone} onChange={handleChange} />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.summary}>
            <span>Total</span>
            <span className={styles.total}>${product.price.toFixed(2)}</span>
          </div>

          <button
            className={styles.payBtn}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay with ABA PayWay`}
          </button>

          <div className={styles.secured}>
            <span>🔒 Secured by ABA PayWay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
