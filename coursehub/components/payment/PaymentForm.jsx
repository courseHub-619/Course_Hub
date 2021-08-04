import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "black" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [amountData, setAmount] = useState({
    amount: 0,
    email: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    e.preventDefault();

    setAmount({ ...amountData, [e.target.name]: e.target.value });
    console.log(amountData, amountData.amount * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        amountData.amount = Number(amountData.amount);

        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/api/payment`, {
          amount: amountData.amount * 100,
          id,
          email: amountData.email,
        });

        if (response.data.success) {
          console.log(`Successful payment`);
          setSuccess(true);
          axios
            .post(`${process.env.NEXT_PUBLIC_SERVER}/api/getOldBalence`, {
              email: amountData.email,
            })
            .then((response) => {
              let newWallet = response.data.wallet + amountData.amount;
              axios
                .post(`${process.env.NEXT_PUBLIC_SERVER}/api/setNewBalence`, {
                  id: response.data.student_id,
                  newWallet: newWallet,
                })
                .then((response) => {
                  console.log(response);
                  setTimeout(() => {
                    router.push(
                      `/privateStudentProfile/${response.data.student_id}`
                    );
                  }, 3000);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(`error from get unique user`, err);
            });
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit} className="p-8">
          <div className="max-w-2xl flex items-center h-auto  flex-wrap mx-auto my-32 lg:my-0">
            <div
              className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
              // style="max-width: 600px"
            >
              <div className="w-full pt-1 pb-5">
                {/* <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                  <i className="mdi mdi-credit-card-outline text-3xl"></i>
                </div> */}
              </div>
              <div className="mb-10">
                <h1 className="text-center font-bold text-xl uppercase">
                  Secure payment info
                </h1>
              </div>
              <div className="mb-3 flex -mx-2">
                <div className="px-2">
                  <label className="flex items-center cursor-pointer">
                    <Image
                      src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
                      className="h-8 ml-3"
                      height={100}
                      width={600}
                    />
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Email
                  <p>
                    (please use the same email address you created this account
                    with)
                  </p>
                </label>
                <div>
                  <input
                    onChange={handleChange}
                    name="email"
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="JohnSmith@gmail.com"
                    type="text"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Card infos
                </label>
                <div className="FormRow">
                  <CardElement
                    options={CARD_OPTIONS}
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Expiration date
                  </label>
                  <div>
                    <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <label className="font-bold text-sm mb-2 ml-1">ammount</label>
                <div>
                  <input
                    className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="000"
                    type="number"
                    name="amount"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                  <i className="mdi mdi-lock-outline mr-1"></i> Pay{" "}
                  {amountData.amount}$
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="max-w-2xl flex items-center h-auto  flex-wrap mx-auto my-36 lg:my-0 mt-96 p-40">
          <div
            className="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
            // style="max-width: 600px"
          >
            <div className="w-full pt-1 pb-5">
              {/* <div className="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
                <i className="mdi mdi-credit-card-outline text-3xl"></i>
              </div> */}
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold text-xl uppercase">
                payment is done
              </h1>
            </div>
            <h1 className="text-center text-purple-600 capitalize truncate">
              You just got {amountData.amount} points you can start spending{" "}
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
