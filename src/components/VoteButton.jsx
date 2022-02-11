import { useEffect, useState } from "react";

export default function VoteButton({ updateApiFunc, id, votes }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [currVotes, setCurrVotes] = useState(votes);

  useEffect(() => {
    setCurrVotes(votes);
  }, [votes]);

  function handleVote(e) {
    e.stopPropagation();
    const v = currVotes;
    if (!hasVoted) {
      setHasVoted(true);
      setCurrVotes(v + 1);
      updateApiFunc(id).catch((err) => {
        alert(err);
        setCurrVotes(v);
        setHasVoted(false);
      });
    }
  }

  return (
    <button
      className={`VoteButton${hasVoted ? " voted" : ""}`}
      onClick={handleVote}
    >
      {currVotes} 👍
    </button>
  );
}
