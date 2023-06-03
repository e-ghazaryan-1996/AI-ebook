import React from "react";

interface IFeedProps {
 readonly name : string,
 readonly keygen : number ; 
}


const Feed:React.FC<IFeedProps> = ({name,keygen}) => {

  return <div>Feed</div>;
};

export default Feed;
