import React from "react";
import StripeContainer from "../components/payment/StripeContainer";

export default function Payment() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1609429019995-8c40f49535a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBheW1lbnR8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <StripeContainer />
    </div>
  );
}
