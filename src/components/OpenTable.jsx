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
      className="flex grow flex-col items-center justify-center p-2"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full max-w-md gap-4 bg-gray-500 bg-opacity-10 p-4 rounded-box">
        <div className="w-full">
          <div className="opacity-60">Customer's Name</div>
          <div className="flex join">
            <input
              type="text"
              className="join-item input input-bordered w-full"
              name="customerName"
            />
          </div>
        </div>
        <div className="w-full">
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

        <button className="btn w-full   btn-primary" type="submit">
          Open
        </button>
      </div>
    </form>
  );
}
