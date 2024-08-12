'use client';
import GroupComponent from '@/components/GroupComponent';
import { useEffect, useState } from 'react';
import { Nunito_Sans } from 'next/font/google';

const nunito_sans = Nunito_Sans({ subsets: ['latin'] });

export default function Page() {
  const [groupOne, setGroupOne] = useState();
  const [groupTwo, setGroupTwo] = useState();
  const [groupThree, setGroupThree] = useState();
  const [groupFour, setGroupFour] = useState();

  useEffect(() => {
    async function fetchData() {
      const groupOneRes = await fetch('/api/reqs?group_id=1243');
      const groupOneData = await groupOneRes.json();
      setGroupOne(groupOneData);

      const groupTwoRes = await fetch('/api/reqs?group_id=1244');
      const groupTwoData = await groupTwoRes.json();
      setGroupTwo(groupTwoData);

      const groupThreeRes = await fetch('/api/reqs?group_id=1245');
      const groupThreeData = await groupThreeRes.json();
      setGroupThree(groupThreeData);

      const groupFourRes = await fetch('/api/reqs?group_id=1246');
      const groupFourData = await groupFourRes.json();
      setGroupFour(groupFourData);
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div
        className={`${nunito_sans.className} border-b border-[#E0E0E0] px-6 pb-[18px] pt-[17px]`}
      >
        <h1 className="text-lg font-bold">Product Roadmap</h1>
      </div>
      <div className="flex flex-1 gap-4 overflow-x-scroll p-6">
        <GroupComponent
          items={groupOne}
          description="January - March"
          number="1"
          colorCodes={{
            OutBorder: '#01959F',
            InBorder: '#4DB5BC',
            Text: '#01959F',
            BG: '#F7FEFF',
          }}
        />
        <GroupComponent
          items={groupTwo}
          description="April - June"
          number="2"
          colorCodes={{
            OutBorder: '#FEEABC',
            InBorder: '#FEEABC',
            Text: '#FA9810',
            BG: '#FFFCF5',
          }}
        />
        <GroupComponent
          items={groupThree}
          description="July - September"
          number="3"
          colorCodes={{
            OutBorder: '#F5B1B7',
            InBorder: '#F5B1B7',
            Text: '#E11428',
            BG: '#FFFAFA',
          }}
        />
        <GroupComponent
          items={groupFour}
          description="October - December"
          number="4"
          colorCodes={{
            OutBorder: '#B8DBCA',
            InBorder: '#B8DBCA',
            Text: '#43936C',
            BG: '#F8FBF9',
          }}
        />
      </div>
    </div>
  );
}
