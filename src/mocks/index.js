export const sprints = [
  [
    {
      id: 0,
      title: 'story 1',
      storyPoints: 5,
      depencencies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedDeveloperId: 0,
      startDay: 0,
      endDay: 2,
      remainingDays: 0,
      developers: [
        {
          id: 0,
          name: 'developer 1',
          sprintCapacity: 8,
          capaciry: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
    {
      id: 1,
      title: 'story 2',
      storyPoints: 5,
      depencencies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedDeveloperId: 1,
      startDay: 0,
      endDay: 2,
      remainingDays: 0,
      developers: [
        {
          id: 1,
          name: 'developer 2',
          sprintCapacity: 8,
          capaciry: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ],
];

export const apiResponse = {
  message: 'success',
  data: {
    id: '123',
    title: 'Project 1',
    duration: 23,
    sprintDuration: 2,
    sprintCapacity: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    stories: [
      {
        id: 0,
        title: 'story 1',
        storyPoints: 5,
        depencencies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        preAssignedDeveloperId: 0,
      },
      {
        id: 1,
        title: 'story 2',
        storyPoints: 5,
        depencencies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    developers: [
      {
        id: 0,
        name: 'developer 1',
        sprintCapacity: 8,
        capaciry: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        name: 'developer 2',
        sprintCapacity: 8,
        capaciry: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    sprints: sprints,
  },
};
