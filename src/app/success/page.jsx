import Link from 'next/link'
import { redirect } from 'next/navigation'
import {
  CheckCircle2,
  ShoppingBag,
  ArrowLeft,
  Receipt,
  ListOrdered,
  Home,
} from 'lucide-react'

import { stripe } from '../../lib/stripe'
import { getUserSession } from '@/lib/core/session'
import { serverFetch } from '@/lib/core/server'
import { createAOrder } from '@/lib/actions/supscription'
import OrderToast from '@/components/shared/OrderToast'
import { FadeIn, FadeUp } from '@/components/shared/AnimatedDiv'

function SummaryRow({ label, value, mono, highlight }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-dashed border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span
        className={`text-sm text-right break-all ${
          mono ? 'font-mono' : 'font-medium'
        } ${highlight ? 'font-bold' : 'text-gray-800'}`}
        style={highlight ? { color: '#3E5F47' } : {}}
      >
        {value}
      </span>
    </div>
  )
}

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  const user = await getUserSession()

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    payment_intent,
    amount_total,
    currency,
    customer_details: { email: customerEmail },
    created,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const transactionId = payment_intent.id
    const { productId } = metadata

    const product = await serverFetch(`/api/product/${productId}`)

    const subInfo = {
      productId,
      paymentStatus: 'paid',
      orderStatus: 'processing',
      transactionId,
      buyerInfo: {
        customerEmail,
        user: user?.id,
        userName: user?.name,
      },
      sellerInfo: product.sellerInfo,
      productName: product.title,
      price: product.price,
    }

    const res = await createAOrder(subInfo)

    const paymentDate = new Date(created * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    const amountPaid = amount_total
      ? `৳${(amount_total / 100).toLocaleString()}`
      : `৳${product.price.toLocaleString()}`

    const orderId = res?.insertedId?.toString() ?? '—'

    return (
      <>
        <OrderToast insertedId={res.insertedId} />

        <section
          className="min-h-screen flex items-center justify-center px-4 py-16"
          style={{
            background:
              'linear-gradient(160deg, #f0f5f1 0%, #fafafa 50%, #eef4ef 100%)',
          }}
        >
          <FadeUp>
            <div
              className="w-full max-w-lg rounded-3xl overflow-hidden shadow-xl"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(62,95,71,0.12)',
              }}
            >
              <div
                className="relative px-6 pt-10 pb-8 text-center overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, #3E5F47 0%, #2c4534 100%)',
                }}
              >
                <div
                  className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
                  style={{ background: '#ffffff' }}
                />
                <div
                  className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
                  style={{ background: '#ffffff' }}
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="p-3 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.18)' }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={1.8} />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
                  <p className="text-white/70 text-sm max-w-xs">
                    Thank you for your purchase. Your order has been placed and is now being processed.
                  </p>
                </div>
              </div>

              <div className="px-6 pt-5 pb-2">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingBag className="w-4 h-4" style={{ color: '#3E5F47' }} />
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#3E5F47' }}>Order Summary</h2>
                </div>
                <div className="space-y-0">
                  <SummaryRow label="Product Name" value={product.title} />
                  <SummaryRow label="Unit Price" value={`৳${product.price.toLocaleString()}`} />
                  <SummaryRow label="Quantity" value="1" />
                  <SummaryRow label="Delivery Charge" value="Free" />
                  <SummaryRow label="Payment Amount" value={amountPaid} highlight />
                </div>
              </div>

              <div className="mx-6 my-2 border-t border-gray-100" />

              <div className="px-6 pb-4">
                <div className="flex items-center gap-2 mb-4">
                  <Receipt className="w-4 h-4" style={{ color: '#3E5F47' }} />
                  <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: '#3E5F47' }}>Payment Details</h2>
                </div>
                <div
                  className="rounded-2xl px-4 py-1"
                  style={{
                    background: 'rgba(62,95,71,0.05)',
                    border: '1px solid rgba(62,95,71,0.1)',
                  }}
                >
                  <SummaryRow label="Transaction ID" value={transactionId} mono />
                  <SummaryRow label="Payment Date" value={paymentDate} />
                  <SummaryRow label="Payment Method" value="Stripe" />
                  <SummaryRow label="Status" value="✅ Paid" />
                </div>
              </div>

              <div className="mx-6 mb-5 rounded-xl px-4 py-2.5 text-xs text-gray-500 text-center"
                style={{ background: '#f8faf8', border: '1px dashed rgba(62,95,71,0.2)' }}
              >
                🚚 Your order will be delivered in <span className="font-semibold text-gray-700">2–3 working days</span>.
                Confirmation sent to <span className="font-semibold text-gray-700">{customerEmail}</span>.
              </div>

              <div className="px-6 pb-8 grid grid-cols-1 gap-3">
                <Link
                  href="/dashboard/buyer/orders"
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold border transition-all duration-200 active:scale-95"
                  style={{
                    color: '#3E5F47',
                    borderColor: 'rgba(62,95,71,0.35)',
                    background: 'rgba(62,95,71,0.04)',
                  }}
                >
                  <ListOrdered className="w-4 h-4" />
                  Go to My Orders
                </Link>
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                >
                  <Home className="w-4 h-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </FadeUp>
        </section>
      </>
    )
  }
}
