/* eslint-disable */
'use client';

import { useState } from 'react';

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      
      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border p-4 rounded-lg">
              {/* Review content would go here */}
            </div>
          ))
        )}
      </div>
    </main>
  );
}