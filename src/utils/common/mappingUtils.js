const storiesData = [
  {
    id: 1,
    stories: 'Authentication',
    dependencies: [],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 2,
    stories: 'Frontend',
    dependencies: [1],
    developer: [],
    storyPoints: 4,
  },
  {
    id: 5,
    stories: 'BackEnd',
    dependencies: [],
    developer: [6],
    storyPoints: 4,
  },
  {
    id: 7,
    stories: 'Database',
    dependencies: [2, 5],
    developer: [],
    storyPoints: 4,
  },
];
const developersData = [
  { id: 1, developer: 'Harbir', sprintCapacity: 8, capacity: 14 },
  { id: 6, developer: 'Smita', sprintCapacity: 8, capacity: 42 },
  { id: 8, developer: 'Mukul', sprintCapacity: 8, capacity: 34 },
  { id: 10, developer: 'Kamleshan', sprintCapacity: 8, capacity: 54 },
];

const mapDeveloperIds = (developers) => {
  const developerIdMapper = {};
  let index = 0;
  developers.forEach((developer) => {
    // developerIdMapper[index] = developer.id;
    developerIdMapper[developer.id] = index;
    index += 1;
  });
  return developerIdMapper;
};

const mapStoryIds = (stories) => {
  const storyIdMapper = {};
  let index = 0;
  stories.forEach((story) => {
    // storyIdMapper[index] = story.id;
    storyIdMapper[story.id] = index;
    index += 1;
  });
  return storyIdMapper;
};

// const developerIdMapper = mapDeveloperIds(developersData);
// const storyIdMapper = mapStoryIds(storiesData);

const updateDevelopers = (developers) => {
  const developerIdMapper = mapDeveloperIds(developers);
  const updatedDevelopers = [];
  developers.forEach((developer) => {
    updatedDevelopers.push({
      // ...developer,
      id: developerIdMapper[developer.id],
      name: developer.developer,
      capacity: developer.capacity,
    });
  });
  return updatedDevelopers;
};

const updateStories = (stories, developers) => {
  const storyIdMapper = mapStoryIds(stories);
  const developerIdMapper = mapDeveloperIds(developers);
  const updatedStories = [];
  stories.forEach((story) => {
    const newDependencies = story.dependencies.map(
      (dependency) => storyIdMapper[dependency],
    );
    const newDevelopers = story.developer.map(
      (developer) => developerIdMapper[developer],
    );
    const newStory = {
      // ...story,
      id: storyIdMapper[story.id],
      title: story.stories,
      description: 'Description',
      dependencies: newDependencies,
      storyPoints: story.storyPoints,
      // preAssignedDeveloperId: newDevelopers[0],
      // developer: newDevelopers,
    };
    if (newDevelopers.length > 0) {
      newStory.preAssignedDeveloperId = newDevelopers[0];
    }
    updatedStories.push(newStory);
  });
  return updatedStories;
};

const getStories = (stories) => {
  const newStories = [];
  stories.map((story) => {
    newStories.push({
      id: story.id,
      stories: story.title,
      dependencies: story.dependencies,
      developer: [story.preAssignedDeveloperId],
      storyPoints: story.storyPoints,
    });
  });
  return newStories;
};

const getDevelopers = (developers, sprintCapacity) => {
  const newDevelopers = [];
  if (developers) {
    developers.map((developer) => {
      newDevelopers.push({
        id: developer.id,
        developer: developer.name,
        capacity: developer.capacity,
        sprintCapacity: sprintCapacity,
      });
    });
  }
  return newDevelopers;
};

export { updateDevelopers, updateStories, getStories, getDevelopers };

// console.log(updateDevelopers(developersData));
// console.log(updateStories(storiesData, developersData));
