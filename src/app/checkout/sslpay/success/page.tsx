"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessPayPageById = ({}) => {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");

  console.log(oid);

  return (
    <div>
      <div className="text-center my-24 space-y-8">
        <div>
          Your payment is successful for the , order id:{" "}
          <span className="font-bold">{oid}</span>
        </div>
        <div>
          Go to the &#39;Confirmation&#39; page to print the Invoice{" "}
          <Link className="btn bg-warning" href={"../confirmation"}>Confirmation</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayPageById;
