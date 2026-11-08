import React, { useState } from 'react';
import { supabase } from '../integrations/supabase/client';

export default function ReviewForm() {
  const [customer_name, setCustomerName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('reviews').insert([
      {
        customer_name,
        location: null,
        message,
        rating: Number(rating),
        is_active: false,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    } else {
      setSubmitted(true);
      setCustomerName('');
      setMessage('');
    }
  };

  if (submitted) {
    return (
      <section className="py-16 px-4 text-center pb-40">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you for your review!</h3>
          <p className="text-base text-gray-600 mb-4">Your feedback has been submitted.</p>
          <button 
            onClick={() => setSubmitted(false)} 
            className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg text-sm hover:bg-[#C49A45] transition"
          >
            Write Another Review
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 text-center pb-40">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Leave a Review</h2>
      <p className="text-lg text-gray-600 mb-8">Share your experience with Tiffany Sparkles with our community.</p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center relative">
        
        {/* Centered Star Rating Selector */}
        <div className="flex justify-center mb-6">
          <select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))} 
            className="text-[#D4AF37] font-bold text-xl bg-transparent border-b border-gray-200 pb-1 focus:outline-none cursor-pointer text-center"
          >
            <option value="5">★★★★★ (5 Stars)</option>
            <option value="4">★★★★☆ (4 Stars)</option>
            <option value="3">★★★☆☆ (3 Stars)</option>
            <option value="2">★★☆☆☆ (2 Stars)</option>
            <option value="1">★☆☆☆☆ (1 Star)</option>
          </select>
        </div>

        {/* Centered Message Input */}
        <div className="mb-6">
          <textarea 
            required 
            rows={3}
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder='"Type your review message here..."' 
            className="w-full text-gray-700 italic text-center text-lg bg-gray-50 p-4 rounded-lg border border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition resize-none"
          ></textarea>
        </div>

        {/* Centered Name Input */}
        <div className="mb-6 max-w-xs mx-auto">
          <input 
            type="text" 
            required 
            value={customer_name} 
            onChange={(e) => setCustomerName(e.target.value)} 
            placeholder="Your Name" 
            className="w-full text-sm font-semibold text-gray-900 bg-gray-50 px-4 py-3 rounded-lg border border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition text-center"
          />
        </div>

        {/* Centered Submit Button */}
        <div className="max-w-xs mx-auto">
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#C49A45] text-white font-semibold rounded-lg shadow transition duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>

      </form>
    </section>
  );
}
