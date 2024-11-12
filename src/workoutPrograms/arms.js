const armsProgram = {
  id: 'arms',
  name: 'Arms & Upper Body',
  type: 'strength',
  location: 'gym',
  targetMuscles: ['biceps', 'triceps', 'shoulders', 'chest', 'back'],
  duration: '45-60 min',
  difficulty: 'Intermediate',
  calories: '300-400',
  description: 'Complete upper body workout focusing on arms and auxiliary muscle groups',
  exercises: [
    {
      name: 'Overhead Press',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 50,
      notes: [
        'Keep core tight',
        'Full range of motion',
        'Control the weight on the way down'
      ],
      muscles: ['shoulders', 'triceps']
    },
    {
      name: 'Arm Extension',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 40,
      notes: [
        'Focus on triceps contraction',
        'Keep elbows close to body',
        'Slow, controlled movement'
      ],
      muscles: ['triceps']
    },
    {
      name: 'Arm Curl',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 40,
      notes: [
        'No swinging',
        'Full range of motion',
        'Squeeze at the top'
      ],
      muscles: ['biceps']
    },
    {
      name: 'Chest Press (Large Machine)',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 60,
      notes: [
        'Keep back against pad',
        'Focus on chest contraction',
        'Control the negative'
      ],
      muscles: ['chest', 'triceps', 'shoulders']
    },
    {
      name: 'Rows',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 50,
      notes: [
        'Squeeze shoulder blades together',
        'Keep chest up',
        'Pull to lower chest'
      ],
      muscles: ['back', 'biceps']
    },
    {
      name: 'Pulldown',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 50,
      notes: [
        'Wide grip',
        'Pull to upper chest',
        'Control the movement'
      ],
      muscles: ['back', 'biceps']
    },
    {
      name: 'Assisted Pullups',
      defaultSets: 4,
      defaultReps: '10',
      defaultWeight: -40,
      notes: [
        'Use appropriate assistance weight',
        'Full range of motion',
        'Focus on back engagement'
      ],
      muscles: ['back', 'biceps']
    },
    {
      name: 'Assisted Dips',
      defaultSets: 4,
      defaultReps: '10',
      defaultWeight: -40,
      notes: [
        'Use appropriate assistance weight',
        'Keep chest up',
        'Control the descent'
      ],
      muscles: ['chest', 'triceps', 'shoulders']
    },
    {
      name: 'Chest Press (Smaller Machine)',
      defaultSets: 4,
      defaultReps: '12',
      defaultWeight: 50,
      notes: [
        'Focus on form over weight',
        'Full range of motion',
        'Control the movement'
      ],
      muscles: ['chest', 'triceps', 'shoulders']
    },
    {
      name: 'Super Forearm',
      defaultSets: 3,
      defaultReps: '15',
      defaultWeight: 30,
      notes: [
        'Both wrist flexion and extension',
        'Controlled movement',
        'Don\'t use momentum'
      ],
      muscles: ['forearms']
    },
    {
      name: 'Four Way Neck',
      defaultSets: 3,
      defaultReps: '12',
      defaultWeight: 20,
      notes: [
        'Forward, backward, and side to side',
        'Controlled movement',
        'Start light and progress slowly'
      ],
      muscles: ['neck']
    }
  ]
};

export default armsProgram;
