// HelmetComponent.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const CustomHelmet = ({ pageTitle, pageUrl, pageLogo, pageDescription }) => (
  <Helmet>
    <script type="application/ld+json">{`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VedicXcel Innovations",
        "url": "${pageUrl}",
        "logo": "${pageLogo}",
        "description": "${pageDescription}",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 33 48006853",
            "contactType": "customer service"
          }
        ],
        "sameAs": [
          "URL_TO_YOUR_FACEBOOK_PAGE",
          "URL_TO_YOUR_TWITTER_PROFILE",
          "URL_TO_YOUR_LINKEDIN_PROFILE"
          // Add more social media URLs as needed
        ]
        // Add more properties as needed
      }
    `}</script>
  </Helmet>
);

export default CustomHelmet;