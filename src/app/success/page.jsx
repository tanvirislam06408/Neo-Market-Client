import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { stripe } from '../../lib/stripe'
import { getUserSession } from '@/lib/core/session'
import { serverFetch } from '@/lib/core/server'
import { createAOrder } from '@/lib/actions/supscription'
import OrderToast from '@/components/shared/OrderToast'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
  const user = await getUserSession()

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    payment_intent,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const transactionId = payment_intent.id;

    const { productId } = metadata
    const product = await serverFetch(`/api/product/${productId}`)
    const subInfo = {

      productId,
      "paymentStatus": "paid",
      "orderStatus": "processing",
      transactionId
      ,
      buyerInfo: {
        customerEmail,
        user: user?.id,
        userName: user?.name
      },
      sellerInfo: product.sellerInfo,
      productName: product.title,
      price: product.price

    }

    const res = await createAOrder(subInfo)
    console.log('order', res);

    return (
      <>
        <OrderToast insertedId={res.insertedId} />
        <section id="success" className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
          <div className="max-w-md space-y-6">
            <p className="text-lg text-muted-foreground">
              Thank you for your order! Your order will be delivered in 2 to 3 working days.
              If you have any queries, contact{' '}
              <a href="mailto:mstanvirislam05@gmail.com" className="text-[#3E5F47] underline underline-offset-2">
                mstanvirislam05@gmail.com
              </a>.
            </p>
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </div>
        </section>
      </>
    )
  }
}