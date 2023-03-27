const mapDeveloperIds = (developers) => {
  const developerIdMapper = {};
  let index = 0;
  developers.forEach((developer) => {
    developerIdMapper[developer.id] = index;
    index += 1;
  });
  return developerIdMapper;
};

const mapStoryIds = (stories) => {
  const storyIdMapper = {};
  let index = 0;
  stories.forEach((story) => {
    storyIdMapper[story.id] = index;
    index += 1;
  });
  return storyIdMapper;
};

const updateDevelopers = (developers) => {
  const developerIdMapper = mapDeveloperIds(developers);
  const updatedDevelopers = [];
  developers.forEach((developer) => {
    updatedDevelopers.push({
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
      id: storyIdMapper[story.id],
      title: story.stories,
      description: 'Description',
      dependencies: newDependencies,
      storyPoints: story.storyPoints,
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
