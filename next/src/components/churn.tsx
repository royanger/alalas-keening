'use client'

import * as React from 'react';
import { configureAbly, useChannel } from '@ably-labs/react-hooks';

configureAbly({
  key: '6r7AGg.pKzEdQ:sHOR1Au4kP5dgidUDNOn-sYAJS-qeRmMVFv3mvBmLLk',
});

export const ChurnDisplay = () => {
  const [churn, setChurn] = React.useState(0);
  const [channel] = useChannel('churn', (message) => {
    setChurn(message.data.value);
  });

  return (
    <div className="flex flex-row items-center justify-center font-body text-xl font-bold">
      <span className="rounded-l-lg bg-purple-900 px-4 py-2 text-white">
        The Churn:
      </span>
      <span className="rounded-r-lg bg-purple-700 px-4 py-2 text-white">
        {churn}
      </span>
    </div>
  );
}
