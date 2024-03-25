import React, { useState } from 'react';

const PromoCodeForm = () => {
  const [formData, setFormData] = useState({
    exp_date: '',
    perc_int: '',
    currency: 'USD', // Default currency
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create/promoCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle success
        console.log('Promo code created successfully');
      } else {
        // Handle error
        console.error('Failed to create promo code');
      }
    } catch (error) {
      console.error('Error creating promo code:', error);
    }
  };

  return (
    <div>
      <h2>Create Promo Code</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exp_date">Expiration Date:</label>
          <input
            type="date"
            id="exp_date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="perc_int">Percentage/Amount:</label>
          <input
            type="number"
            id="perc_int"
            name="perc_int"
            value={formData.perc_int}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
          >
            <option value="USD">USD</option>
            <option value="ARS">ARS</option>
            <option value="BOTH">BOTH</option>
          </select>
        </div>
        <button type="submit">Create Promo Code</button>
      </form>
    </div>
  );
};

export default PromoCodeForm;
