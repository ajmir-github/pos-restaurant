export default function OpenTable({ openTable }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const customerName = form.get("customerName");
    const customers = Number(form.get("customers"));
    openTable({
      customerName,
      customers,
    });
  };
  return (
    <form
      className="flex grow flex-col gap-2 items-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full max-w-sm">
        <div className="opacity-60">Customer's Name</div>
        <div className="flex join">
          <input
            type="text"
            className="join-item input input-bordered w-full"
            name="customerName"
          />
        </div>
      </div>
      <div className="w-full max-w-sm">
        <div className="opacity-60">Number of customers</div>
        <div className="flex join">
          <input
            type="number"
            className="join-item input input-bordered w-full"
            name="customers"
            required
          />
        </div>
      </div>

      <button
        className="btn w-full max-w-sm rounded-none btn-primary"
        type="submit"
      >
        Open
      </button>
    </form>
  );
}
