import React from 'react';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "name": "Akirma Event Organizer",
    "alternateName": "አኪርማ የዝግጅት አዘጋጅ",
    "image": "https://akirma.com/logo.png",
    "@id": "https://akirma.com",
    "url": "https://akirma.com",
    "telephone": "+251910977371",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bole High Road, Near Edna Mall",
      "addressLocality": "Addis Ababa",
      "addressRegion": "Addis Ababa",
      "addressCountry": "ET"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 9.0065,
      "longitude": 38.7675
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/akirma",
      "https://www.instagram.com/akirma"
    ],
    "priceRange": "$$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
