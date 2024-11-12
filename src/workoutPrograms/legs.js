const legsProgram = {
  id: 'legs',
  name: 'Lower Body Power',
  type: 'strength',
  location: 'gym',
  targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
  duration: '60-75 min',
  difficulty: 'Advanced',
  calories: '400-500',
  description: 'Comprehensive lower body workout targeting major leg muscle groups',
  exercises: [
    {
      name: 'Barbell Back Squat',
      defaultSets: 4,
      defaultReps: '8',
      defaultWeight: 185,
      notes: [
        'Maintain proper bar position on upper back',
        'Keep chest up and core tight',
        'Descend to parallel or below',
        'Drive through heels on ascent'
      ],
      muscles: ['quadriceps', 'glutes', 'hamstrings']
    },
    {
      name: 'Romanian Deadlift',
      defaultSets: 4,
      defaultReps: '10',
      defaultWeight: 135,
      notes: [
        'Keep back straight',
        'Hinge at hips',
        'Minimal knee bend',
        'Feel stretch in hamstrings'
      ],
      muscles: ['hamstrings', 'glutes', 'lower back']
    },
    {
      name: 'Leg Press',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 270,
      notes: [
        'Full range of motion',
        'Keep lower back pressed against pad',
        'Control descent',
        'Push through entire foot'
      ],
      muscles: ['quadriceps', 'glutes', 'hamstrings']
    },
    {
      name: 'Walking Lunges with Dumbbells',
      defaultSets: 3,
      defaultReps: '20 steps',
      defaultWeight: 40,
      notes: [
        'Maintain upright torso',
        'Long strides',
        'Keep front knee over ankle',
        'Alternate legs continuously'
      ],
      muscles: ['quadriceps', 'glutes', 'calves']
    },
    {
      name: 'Leg Extensions',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 100,
      notes: [
        'Slow, controlled movement',
        'Full extension at top',
        'Squeeze quadriceps',
        'Avoid swinging or momentum'
      ],
      muscles: ['quadriceps']
    },
    {
      name: 'Lying Leg Curls',
      defaultSets: 3,
      defaultReps: '12',
      defaultWeight: 90,
      notes: [
        'Keep hips pressed down',
        'Slow eccentric movement',
        'Full contraction at top',
        'Maintain consistent tempo'
      ],
      muscles: ['hamstrings']
    },
    {
      name: 'Bulgarian Split Squat',
      defaultSets: 3,
      defaultReps: '10 per leg',
      defaultWeight: 35,
      notes: [
        'Rear foot elevated',
        'Front foot forward',
        'Maintain balance',
        'Deep range of motion'
      ],
      muscles: ['quadriceps', 'glutes', 'balance muscles']
    },
    {
      name: 'Standing Calf Raises',
      defaultSets: 4,
      defaultReps: '15',
      defaultWeight: 180,
      notes: [
        'Full range of motion',
        'Pause at top of movement',
        'Use smith machine or calf raise machine',
        'Slow, controlled descent'
      ],
      muscles: ['calves']
    },
    {
      name: 'Hack Squat',
      defaultSets: 3,
      defaultReps: '12',
      defaultWeight: 200,
      notes: [
        'Maintain machine position',
        'Deep knee bend',
        'Push through heels',
        'Keep chest up'
      ],
      muscles: ['quadriceps', 'glutes']
    },
    {
      name: 'Glute Bridge',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 95,
      notes: [
        'Squeeze glutes at top',
        'Full hip extension',
        'Can use barbell or resistance band',
        'Slow, controlled movement'
      ],
      muscles: ['glutes', 'hamstrings', 'lower back']
    }
  ]
};

export default legsProgram;
