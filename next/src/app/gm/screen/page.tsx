import * as React from 'react'
import { Header } from "@/components/header/header";
import { ChurnPool } from "./churn";
import { Title } from "@/components/ui/title"
import { env } from '@/lib/env.mjs'

export default function Page() {


  return (
    <>
      <Header />
      <div className="flex w-full justify-center">
        <Title type="h1">Game Master Screen</Title>
      </div>

      <div className="h-screen grid grid-cols-12 font-body">

        <div className="mx-2 mt-2 flex flex-col gap-2 col-span-2">
          <ChurnPool ablyKey={env.ABLY_API_KEY} />
          <Actions />
        </div>
        <div className="mx-2 mt-2 col-span-4">
          <Focuses />
        </div>
      </div>
    </>
  );
};

const Focuses = () => {
  const FocusList = [
    {
      ability: 'Accurary',
      focuses: ['Bows', 'Gunnery', 'Pistols', 'Rifles', 'Throwing'],
    },
    {
      ability: 'Communication',
      focuses: [
        'Bargaining',
        'Deception',
        'Disguise',
        'Etiquette',
        'Expression',
        'Gambling',
        'Investigation',
        'Leadership',
        'Preforming',
        'Persausion',
        'Seduction',
      ],
    },
    {
      ability: 'Constitution',
      focuses: ['Running', 'Stamina', 'Swimming', 'Tolerance'],
    },
    {
      ability: 'Dexterity',
      focuses: [
        'Acrobatics',
        'Crafting',
        'Driving',
        'Free-fall',
        'Initiative',
        'Piloting',
        'Slieght of Hand',
        'Stealth',
      ],
    },
    {
      ability: 'Fighting',
      focuses: ['Brawling', 'Grappling', 'Heavy Weapons', 'Light Weapons'],
    },
    {
      ability: 'Intelligence',
      focuses: [
        'Art',
        'Business',
        'Cryptography',
        'Current Affairs',
        'Demolitions',
        'Engineering',
        'Evaluation',
        'Hacking',
        'Law',
        'Medicene',
        'Navigation',
        'Research',
        'Science',
        'Security',
        'Tactics',
        'Technology',
      ],
    },
    {
      ability: 'Perception',
      focuses: [
        'Empathy',
        'Hearing',
        'Intuition',
        'Searching',
        'Seeing',
        'Smelling',
        'Survival',
        'Tasting',
        'Touching',
        'Tracking',
      ],
    },
    {
      ability: 'Strength',
      focuses: ['Climbing', 'Intimidation', 'Jumping', 'Might'],
    },
    {
      ability: 'Willpower',
      focuses: ['Courage', 'Faith', 'Self-Discipline'],
    },
  ];
  return (
    <div className="flex flex-col border-2 border-indigo-400 bg-white">
      <div className="bg-indigo-400 text-white">
        <h2 className="text-xl">Focuses </h2>
      </div>
      {FocusList.map((focus, index) => {
        return (
          <React.Fragment key={index}>
            <div className="bg-black text-white">
              {focus.ability}
            </div>
            <div className="grid grid-cols-3 text-black">
              {focus.focuses.map((focus, index) => {
                return <p key={index}>{focus}</p>;
              })}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Actions = () => {
  return (
    <div className="flex flex-col border-2 border-indigo-400 bg-white">
      <div className="bg-indigo-400 text-white">
        <h2 className="text-xl">Actions</h2>
      </div>
      <div className="bg-black text-white">Minor Actions</div>
      <div className="text-black">
        Activate, Aim, Guard Up, Move, Prepare, Press the Attack, Ready, Stand
        Firm
      </div>
      <div className="bg-black text-white">Major Actions</div>
      <div className="text-black">
        All Out Attack, Charge, Defend, Melee Attack, Ranged Attack, Run, Stunt
        Attack
      </div>
    </div>
  );
};


