'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type BuyFormParams = {
  cryptoName: string;
  cryptoPrice: number;
  balance: number;
};

export default function BuyForm(params: BuyFormParams) {
  const [usdToSpend, setusdToSpend] = useState(0);
  const [showConfirm, setshowConfirm] = useState(false);

  return (
    <div>
      {showConfirm ? (
        <div>test</div>
      ) : (
        <div>
          buy {params.cryptoName} for
          <input
            onChange={(e) => setusdToSpend(parseInt(e.target.value))}
            type="number"
            min="0"
            max={params.balance}
          />
          <button onClick={() => setshowConfirm(true)} className="btn">
            Buy
          </button>
        </div>
      )}
    </div>
  );
}
