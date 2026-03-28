// app/payments-billing/page.tsx
import React from "react";

type PaymentMethod = {
  id: string;
  brand: "mastercard" | "visa";
  label: string;
  expiry: string;
  isDefault?: boolean;
};

type BillingRow = {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "pm_1",
    brand: "mastercard",
    label: "Mastercard ending 5867",
    expiry: "Expiry 07/2030",
    isDefault: true,
  },
  {
    id: "pm_2",
    brand: "visa",
    label: "Visa ending 8521",
    expiry: "Expiry 03/2028",
  },
];

const billingHistory: BillingRow[] = [
  {
    id: "inv_1",
    description: "Starting Your Business Journey - Course",
    amount: "₹1,399",
    date: "12 Feb 2026",
    status: "Paid",
  },
  {
    id: "inv_2",
    description: "Mentor Session - Ananya Kapoor",
    amount: "₹799",
    date: "05 Feb 2026",
    status: "Paid",
  },
  {
    id: "inv_3",
    description: "Career Growth Workshop - Live Event",
    amount: "₹499",
    date: "28 Jan 2026",
    status: "Paid",
  },
  {
    id: "inv_4",
    description: "Course Upgrade - Advanced Module",
    amount: "₹999",
    date: "15 Jan 2026",
    status: "Paid",
  },
  {
    id: "inv_5",
    description: "Mentor Session - Resume Review",
    amount: "₹599",
    date: "03 Jan 2026",
    status: "Paid",
  },
];

function MastercardIcon() {
  return (
    <div className="relative h-10 w-12 rounded-lg bg-slate-50 ring-1 ring-slate-200">
      <span className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#EB001B]" />
      <span className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#F79E1B] opacity-90" />
    </div>
  );
}

function VisaIcon() {
  return (
    <div className="grid h-10 w-12 place-items-center rounded-lg bg-slate-50 ring-1 ring-slate-200">
      <span className="text-sm font-extrabold tracking-widest text-[#1A4FDB]">
        VISA
      </span>
    </div>
  );
}

function EllipsisIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v10" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 11l4 4 4-4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 21h16"
      />
    </svg>
  );
}

function StatusPill({ status }: { status: BillingRow["status"] }) {
  const styles =
    status === "Paid"
      ? "bg-emerald-100 text-emerald-700"
      : status === "Pending"
        ? "bg-amber-100 text-amber-700"
        : "bg-rose-100 text-rose-700";

  return (
    <span
      className={[
        "inline-flex min-w-20 justify-center rounded-md px-3 py-1 text-sm font-medium",
        styles,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export default function PaymentsBillingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-full ">
        <h1 className="text-2xl font-semibold text-slate-900">
          Payments &amp; Billing
        </h1>

        {/* Saved Payment Methods */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Saved Payment Methods
          </h2>

          <div className="mt-4 space-y-4">
            {paymentMethods.map((pm) => {
              const isDefault = !!pm.isDefault;

              return (
                <div
                  key={pm.id}
                  className={[
                    "flex items-center justify-between rounded-xl border bg-white p-4",
                    isDefault
                      ? "border-orange-500 ring-1 ring-orange-200"
                      : "border-slate-200",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-4">
                    {pm.brand === "mastercard" ? (
                      <MastercardIcon />
                    ) : (
                      <VisaIcon />
                    )}

                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-base font-medium text-slate-900">
                          {pm.label}
                        </p>

                        {isDefault && (
                          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600 ring-1 ring-orange-200">
                            Default
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-slate-500">{pm.expiry}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="More options"
                  >
                    <EllipsisIcon />
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 py-4 text-sm font-semibold text-orange-600 ring-1 ring-orange-100 hover:bg-orange-100"
            >
              <PlusIcon />
              Add New Payment Method
            </button>
          </div>
        </section>

        {/* Billing History */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Billing History
            </h2>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <DownloadIcon />
              Download All
            </button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-205 border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="w-12 border-b border-slate-200 pb-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                      aria-label="Select all"
                    />
                  </th>
                  <th className="border-b border-slate-200 pb-3">
                    Description
                  </th>
                  <th className="w-32 border-b border-slate-200 pb-3">
                    Amount
                  </th>
                  <th className="w-36 border-b border-slate-200 pb-3">Date</th>
                  <th className="w-36 border-b border-slate-200 pb-3">
                    Status
                  </th>
                  <th className="w-24 border-b border-slate-200 pb-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {billingHistory.map((row) => (
                  <tr key={row.id} className="text-sm text-slate-700">
                    <td className="py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                        aria-label={`Select ${row.description}`}
                      />
                    </td>

                    <td className="py-4">
                      <span className="font-medium text-slate-900">
                        {row.description}
                      </span>
                    </td>

                    <td className="py-4">{row.amount}</td>

                    <td className="py-4 text-slate-600">{row.date}</td>

                    <td className="py-4">
                      <StatusPill status={row.status} />
                    </td>

                    <td className="py-4 text-center">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                        aria-label={`Download ${row.description}`}
                      >
                        <DownloadIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}