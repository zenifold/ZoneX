import armsProgram from './arms';
import absProgram from './abs';
import legsProgram from './legs';
import hiitProgram from './hiit';
import cardioBlastProgram from './cardioBlast';

const workoutPrograms = {
  arms: armsProgram,
  abs: absProgram,
  legs: legsProgram,
  hiit: hiitProgram,
  cardioBlast: cardioBlastProgram,
  // Additional programs will be imported and added here
};

export default workoutPrograms;
