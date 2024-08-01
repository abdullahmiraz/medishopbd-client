"use client";
import { useSearchParams } from "next/navigation";

const SuccessPayPageById = ({}) => {
  const searchParams = useSearchParams();
  const oid = searchParams.get("oid");

  console.log(oid);

  return <div>ddddddddddddddddddddd</div>;
};

export default SuccessPayPageById;
