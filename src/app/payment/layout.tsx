import { Suspense } from "react";

const PaymentLayout = ({ children }: any) => {
  return (
    <div>
      <Suspense fallback={<div>...Loading</div>}>{children}</Suspense>
    </div>
  );
};

export default PaymentLayout;
