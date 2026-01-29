import React from 'react';

export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does an event organizer cost in Ethiopia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Event organizer pricing in Ethiopia depends on the event type, size, and level of service. Premium planning for weddings typically starts from 50,000 ETB, while corporate events are scaled to requirements. Contact Akirma for a custom budget estimate."
        }
      },
      {
        "@type": "Question",
        "name": "Do you organize traditional Ethiopian (Habesha) weddings?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we specialize in traditional Ethiopian (Habesha) weddings. We manage everything from Mels and Kelebet ceremonies to modern reception styling, ensuring cultural authenticity and premium execution."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best event venues in Addis Ababa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Addis Ababa offers excellent venues including the Skylight Hotel, Hilton Addis, and Sheraton Addis for luxury events, as well as various specialized event halls in Bole and Kazanchis."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
