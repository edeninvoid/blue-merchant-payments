export default function MerchantListNoItem() {
  return (
    <section
      className="flex items-center rounded-lg bg-gray-100 p-4"
      role="status"
      aria-live="polite"
    >
      <p>No Merchants Found.</p>
    </section>
  );
}
