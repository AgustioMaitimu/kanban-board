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
      const [groupOneRes, groupTwoRes, groupThreeRes, groupFourRes] =
        await Promise.all([
          fetch('/api/reqs?group_id=1243'),
          fetch('/api/reqs?group_id=1244'),
          fetch('/api/reqs?group_id=1245'),
          fetch('/api/reqs?group_id=1246'),
        ]);

      const [groupOneData, groupTwoData, groupThreeData, groupFourData] =
        await Promise.all([
          groupOneRes.json(),
          groupTwoRes.json(),
          groupThreeRes.json(),
          groupFourRes.json(),
        ]);

      setGroupOne(groupOneData);
      setGroupTwo(groupTwoData);
      setGroupThree(groupThreeData);
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
          groupID={1243}
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
          groupID={1244}
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
          groupID={1245}
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
          groupID={1246}
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
