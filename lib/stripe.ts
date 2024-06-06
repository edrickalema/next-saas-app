import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
  typescript: true,
});

export const getSessions = async ({
  priceId,
  domainUrl,
  customerId,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_update: { name: "auto", address: "auto" },
    billing_address_collection: "auto",
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainUrl}/cancelled`,
  });
};
