'use client';
import GroupComponent from '@/components/GroupComponent';
import { useEffect, useState } from 'react';

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

  // useEffect(() => {
  //   if (groupOne) {
  //     console.log([groupOne, groupTwo, groupThree, groupFour]);
  //   }
  // }, [groupFour]);

  return (
    <div className="flex gap-4 p-6">
      <GroupComponent
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
  );
}
