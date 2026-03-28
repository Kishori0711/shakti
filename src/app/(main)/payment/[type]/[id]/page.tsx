import PaymentPageClient from "./PaymentPageClient";

type Props = {
  params: Promise<{
    type: string;
    id: string;
  }>;
};

export default async function PaymentPage({ params }: Props) {
  const { type, id } = await params;

  const allowedTypes = ["events", "courses", "classes"];

  if (!allowedTypes.includes(type)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Invalid payment type</p>
      </div>
    );
  }

  return <PaymentPageClient type={type} id={id} />;
}