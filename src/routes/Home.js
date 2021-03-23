import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

/* forEach를 이용해 기존 nweets를 가져 오는 방법
// snapshot에 비해 느리다
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nwitter").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      // setState를 함수로 아래처럼 사용하면, 이전 요소를 활용할 수 있음.
      setNweets((prev) => {
        return [nweetObject, ...prev];
      });
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

*/

const Home = ({ userObj }) => {
  // console.log(userObj.uid);
  const [nweets, setNweets] = useState([]);
  // Array를 만들고 setNweets 해주는 방법
  useEffect(() => {
    dbService.collection("nwitter").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  return (
    <div>
      <NweetFactory userObj={userObj} />
      {nweets.map((nweet) => {
        return (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorID === userObj.uid}
          />
        );
      })}
    </div>
  );
};
export default Home;
