
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51JHqqQD0NbChIDuqSlmqbz4WCppManXRIK5dVIBHRGFDTB2dxUD0zHo3EBzNHGYZnPGZbDGfwb4QtQBhY8n1ajN400CcxBczDj"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return ( 
	
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>  
  
 
	)
}