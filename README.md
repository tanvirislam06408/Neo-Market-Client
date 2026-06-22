# Second-Hand Marketplace

A full-featured second-hand marketplace built with Next.js. Users can browse, buy, and sell pre-owned items with secure authentication, payment processing, and a real-time dashboard.

<img width="1536" height="1024" alt="ChatGPT Image Jun 22, 2026, 11_26_13 AM" src="https://github.com/user-attachments/assets/53cbfd4f-67f0-41c4-b10d-bf0996a7e7e4" />



---

## Features

- User authentication (sign up, sign in, session management)
- Product browsing with category filtering and pagination
- Product search
- Wishlist management
- Shopping cart and checkout with Stripe payment integration
- User dashboard with order history and profile management
- Admin dashboard with analytics, user management, product management, and order management
- Responsive design with dark/light theme support

---

## Tech Stack

| Package | Purpose |
|---|---|
| [Next.js](https://nextjs.org/) | React framework with App Router |
| [React](https://react.dev/) | UI library |
| [Better Auth](https://better-auth.com/) | Authentication (email/password) |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Mongoose / Mongo Adapter](https://github.com/better-auth/better-auth) | MongoDB adapter for Better Auth |
| [Stripe](https://stripe.com/) | Payment processing |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lottie React](https://github.com/Gamote/lottie-react) | Lottie animation playback |
| [Lucide React](https://lucide.dev/) | Icons |
| [Recharts](https://recharts.org/) | Charts and analytics |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |
| [Shadcn](https://ui.shadcn.com/) | Component library |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Next Themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [Class Variance Authority](https://cva-docs.vercel.app/) | Component variant management |
| [Tailwind Merge](https://github.com/dcastil/tailwind-merge) | Tailwind class merging |

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)
- Stripe account (for payment features)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## Project Structure

```
src/
  app/            # Next.js App Router pages and layouts
  components/     # Reusable UI components
  lib/            # Utilities, API clients, server actions
  hooks/          # Custom React hooks
public/
  lottie/         # Lottie animation JSON files
```

---

## License

This project is private and for educational purposes.
