export default function calculateScore(log: { page: string; choice: string }[]): string {
  let mScore = 0;
  let tScore = 0;
  let fScore = 0;
  let lastM = -1;
  let lastT = -1;
  let lastF = -1;

  console.log(log);
  
  let c = 0;
  log.forEach((item) => {
    const choice = item.choice.toUpperCase();
    if (choice != '') {
      if (choice === 'M') {
        mScore += 1;
        lastM = c;
      } else if (choice === 'T') {
        tScore += 1;
        lastT = c;
      } else if (choice === 'F') {
        fScore += 1;
        lastF = c;
      }
      c++;
    }
  });

  console.log(`mScore: ${mScore}, tScore: ${tScore}, fScore: ${fScore}`);
  console.log(`lastM: ${lastM}, lastT: ${lastT}, lastF: ${lastF}`);

  // Determine the maximum score
  const maxScore = Math.max(mScore, tScore, fScore);

  // Triple Tie Case
  if (mScore === maxScore && tScore === maxScore && fScore === maxScore) {
    if (lastM > lastT && lastM > lastF) {
      return 'M';
    }
    if (lastT > lastM && lastT > lastF) {
      return 'T';
    }
    return 'F';
  }

  // Double Tie Cases
  if (mScore === maxScore && tScore === maxScore) {
    if (lastM > lastT) {
      return 'M';
    }
    return 'T';
  }
  if (mScore === maxScore && fScore === maxScore) {
    if (lastM > lastF) {
      return 'M';
    }
    return 'F';
  }
  if (tScore === maxScore && fScore === maxScore) {
    if (lastT > lastF) {
      return 'T';
    }
    return 'F';
  }

  // Single Winner Cases
  if (mScore === maxScore) {
    return 'M';
  }
  if (tScore === maxScore) {
    return 'T';
  }
  if (fScore === maxScore) {
    return 'F';
  }
  return 'UNDEFINED'; // impossible
}
