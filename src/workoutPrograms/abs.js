const absProgram = {
  id: 'abs',
  name: 'Core & Abs',
  type: 'strength',
  location: 'gym',
  targetMuscles: ['abdominals', 'obliques', 'core', 'lower back'],
  duration: '45-60 min',
  difficulty: 'Intermediate',
  calories: '300-400',
  description: 'Comprehensive core workout targeting abs and stabilizer muscles',
  exercises: [
    {
      name: 'Weighted Plank',
      defaultSets: 4,
      defaultReps: '30 sec',
      defaultWeight: 10,
      notes: [
        'Keep body in a perfect straight line',
        'Engage entire core',
        'Maintain steady breathing',
        'Add weight plate on back for increased difficulty'
      ],
      muscles: ['abdominals', 'core', 'shoulders']
    },
    {
      name: 'Cable Crunch',
      defaultSets: 4,
      defaultReps: '15',
      defaultWeight: 50,
      notes: [
        'Kneel facing away from cable machine',
        'Pull cable down with controlled core contraction',
        'Focus on abs, not arms',
        'Maintain constant tension'
      ],
      muscles: ['abdominals', 'core']
    },
    {
      name: 'Decline Bench Leg Raises',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 10,
      notes: [
        'Use decline bench for increased difficulty',
        'Keep lower back pressed',
        'Slow, controlled movement',
        'Full range of motion'
      ],
      muscles: ['lower abs', 'hip flexors']
    },
    {
      name: 'Russian Twists with Dumbbell',
      defaultSets: 4,
      defaultReps: '15 per side',
      defaultWeight: 20,
      notes: [
        'Sit on floor, feet slightly elevated',
        'Rotate torso with weight',
        'Maintain balance',
        'Keep back straight'
      ],
      muscles: ['obliques', 'abdominals', 'core']
    },
    {
      name: 'Machine Torso Rotation',
      defaultSets: 4,
      defaultReps: '12 per side',
      defaultWeight: 50,
      notes: [
        'Use controlled, smooth motion',
        'Focus on oblique engagement',
        'Keep core tight',
        'Adjust weight for proper form'
      ],
      muscles: ['obliques', 'core stabilizers']
    },
    {
      name: 'Hanging Leg Raises',
      defaultSets: 4,
      defaultReps: '10',
      defaultWeight: 5,
      notes: [
        'Use pull-up bar',
        'Keep arms straight',
        'Raise legs with controlled motion',
        'Can use ankle weights for difficulty'
      ],
      muscles: ['lower abs', 'hip flexors']
    },
    {
      name: 'Ab Wheel Rollout',
      defaultSets: 3,
      defaultReps: '10',
      defaultWeight: 10,
      notes: [
        'Start on knees',
        'Maintain straight back',
        'Slow, controlled extension',
        'Progress to standing rollouts'
      ],
      muscles: ['entire core', 'abdominals']
    },
    {
      name: 'Side Plank with Rotation',
      defaultSets: 3,
      defaultReps: '12 per side',
      defaultWeight: 5,
      notes: [
        'Start in side plank position',
        'Rotate upper body',
        'Maintain core engagement',
        'Keep hips elevated'
      ],
      muscles: ['obliques', 'core stabilizers']
    },
    {
      name: 'Medicine Ball Slams',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 10,
      notes: [
        'Use medicine ball',
        'Full body explosive movement',
        'Engage core throughout',
        'Lift ball overhead, slam with force'
      ],
      muscles: ['abdominals', 'core', 'shoulders']
    },
    {
      name: 'Stability Ball Crunches',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 10,
      notes: [
        'Use stability ball',
        'Increase range of motion',
        'Control the movement',
        'Add weight for difficulty'
      ],
      muscles: ['abdominals', 'core stabilizers']
    }
  ]
};

export default absProgram;
