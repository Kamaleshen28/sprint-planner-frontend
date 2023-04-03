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
  console.log('new stories', newStories);
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

/* 
imported csv string will be in the following format:

Project Metadata
id,projectTitle,sprintDuration,totalDuration,sprintCapacity
0,Sample from csv,2,6,10

Developers
serialNumber,name,capacity
1,John,100
2,Jack,90
3,Joe,120

Stories
serialNumber,storyName,dependencies,preAssignedDeveloper,storyPoints
1,Registration,,1,3
2,Login,1,,3
3,Logout,1 2,,2
4,Search,2,3,5
5,Add to cart,2,,3
6,Checkout,5,,6
7,Payment,6,,2
8,Order confirmation,6,,4
9,Order history,6,,3
10,Animation,,,8
*/

// type casting left
const parseImportedCSV = (csvString) => {
  const csvArray = csvString.split('\n');
  const projectMetaData = {};
  const developers = [];
  const stories = [];
  let lineNumber = 0;
  while (lineNumber < csvArray.length) {
    console.log(lineNumber);
    let currLine = csvArray[lineNumber].split(',');
    if (currLine[0] === 'Project Metadata') {
      ++lineNumber;
      currLine = csvArray[lineNumber].split(',');
      let projectMetaDataKeys = currLine;
      ++lineNumber;
      currLine = csvArray[lineNumber].split(',');
      let projectMetaDataValues = currLine;
      projectMetaDataKeys.forEach((key, index) => {
        projectMetaData[key] = projectMetaDataValues[index];
      });
      projectMetaData.duration = Number(projectMetaData.totalDuration);
      projectMetaData.givenTotalDuration = Number(
        projectMetaData.totalDuration,
      );
      projectMetaData.sprintCapacity = Number(projectMetaData.sprintCapacity);
      projectMetaData.sprintDuration = Number(projectMetaData.sprintDuration);
      delete projectMetaData.totalDuration;
      ++lineNumber;
    } else if (currLine[0] === 'Developers') {
      ++lineNumber;
      currLine = csvArray[lineNumber].split(',');
      let developerKeys = currLine;
      ++lineNumber;
      while (lineNumber < csvArray.length) {
        currLine = csvArray[lineNumber].split(',');
        if (currLine[0] === '') break;
        let developerValues = currLine;
        const developer = {};
        developerKeys.forEach((key, index) => {
          developer[key] = developerValues[index];
        });
        developer.id = Number(developer.id);
        developer.capacity = Number(developer.capacity);

        developers.push(developer);
        ++lineNumber;
      }
    } else if (currLine[0] === 'Stories') {
      ++lineNumber;
      currLine = csvArray[lineNumber].split(',');
      let storyKeys = currLine;
      ++lineNumber;
      while (lineNumber < csvArray.length) {
        console.log(csvArray[lineNumber]);
        currLine = csvArray[lineNumber].split(',');
        if (currLine[0] === '') break;
        let storyValues = currLine;
        const story = {};
        storyKeys.forEach((key, index) => {
          story[key] = storyValues[index];
        });
        // console.log('before typecasting dependencies:', story.dependencies);
        story.dependencies = story.dependencies.length
          ? story.dependencies.split('-').map((d) => Number(d))
          : [];
        // console.log('after typecasting dependencies:', story.dependencies);
        // console.log(
        // `${story.title}: before typecasting developer:${story.preAssignedDeveloperId}`,
        // );
        story.preAssignedDeveloperId = story.preAssignedDeveloperId.length
          ? Number(story.preAssignedDeveloperId)
          : null;
        // console.log(
        //   `${story.title}: after typecasting developerId:`,
        //   story.preAssignedDeveloperId,
        //   'q',
        // );
        story.id = Number(story.id);
        story.storyPoints = Number(story.storyPoints);

        stories.push(story);
        ++lineNumber;
      }
    } else {
      ++lineNumber;
    }
  }
  return {
    projectMetaData,
    developers,
    stories,
  };
};

export {
  updateDevelopers,
  updateStories,
  getStories,
  getDevelopers,
  parseImportedCSV,
};
