import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { serverFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Get product id from frontend
    const formData = await req.formData();
    const productId = formData.get('productId')
    const product = await serverFetch(`/api/product/${productId}`)

    const user = await getUserSession();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency: "usd",

            // price in cents
            unit_amount: product.price * 100,

            product_data: {
              name: product.title,

              description: product.description,

              images: product.images.length
                ? [product.images[0]]
                : [],
            },
          },
        },
      ],
      customer_email: user?.email,
      metadata: { productId },

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/cancel`,

      metadata: {
        productId,
        // buyerId: "",
        // sellerId: "",
      },
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}