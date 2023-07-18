'use client'

import * as React from 'react'
import { configureAbly, useChannel } from '@ably-labs/react-hooks';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChurnPool = ({ ablyKey }: { ablyKey: string }) => {

  configureAbly({
    key: ablyKey
  });

  const [churn, setChurn] = React.useState(0);
  const [channel, ably] = useChannel('churn', (message) => {
    setChurn(message.data.value);
  });

  // push Churn updates to all clients -- particulary OBS source
  const handleUpdateChurn = (type: string) => {
    switch (type) {
      case 'add':
        channel.publish('churn', { value: churn + 1 });
        break;
      case 'sub':
        channel.publish('churn', { value: churn - 1 });
        break;
      case 'reset':
        channel.publish('churn', { value: 0 });

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col border-2 border-indigo-400 bg-white">
      <div className="bg-indigo-400 text-white">
        <h2 className="text-xl">Churn Pool: </h2>
      </div>
      <div className="bg-black text-white">Current Churn: {churn}</div>
      <div className="grid grid-cols-2">
        <ChrunCounter churn={churn} startingIndex={1} />
        <div className="bg-green-400">
          <p className="text-xl">Minor</p>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <ChrunCounter churn={churn} startingIndex={11} />
        <div className="bg-yellow-400">
          <p className="text-xl">Major</p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <ChrunCounter churn={churn} startingIndex={21} />
        <div className="bg-red-400">
          <p className="text-xl">Epic</p>
        </div>
      </div>
      <div className="flex flex-row justify-center bg-black p-2 text-white">
        <button
          className="mx-1 border border-white/50 px-2 py-1"
          onClick={() => handleUpdateChurn('add')}
        >
          Add
        </button>
        <button
          className="mx-1 border border-white/50 px-2 py-1"
          onClick={() => handleUpdateChurn('sub')}
        >
          Subtract
        </button>
        <button
          className="mx-1 border border-white/50 px-2 py-1"
          onClick={() => handleUpdateChurn('reset')}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

type ChurnCounterTypes = {
  churn: number;
  startingIndex: number;
};

const ChrunCounter = ({ churn, startingIndex }: ChurnCounterTypes) => {
  return (
    <div className="grid grid-cols-5">
      {Array(10)
        .fill('x')
        .map((_, index) => {
          return (
            <div className="flex items-center justify-center" key={index}>
              {churn >= index + startingIndex ? (
                <FontAwesomeIcon icon={faCircleDot} className="h-3 w-auto text-black" />
              ) : (
                <FontAwesomeIcon icon={faCircle} className="h-3 w-auto text-black" />
              )}
            </div>
          );
        })}
    </div>
  );
};

