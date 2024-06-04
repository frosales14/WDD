const Utility = require("../utilities/");
const axios = require("axios");
const buildController = {};

buildController.HomePage = async function (req, res) {
  res.render("index", { title: "Extreme Fitness" });
};

buildController.NavListingPages = async function (req, res) {
  const axios = require("axios");
  let data;
  const group = req.query.group;

  if (group === "muscle") {
    data = {
      title: "Choose A Muscle Group",
      group: group,
      items: [
        { name: "Abdominals", image: "/images/site/abdominals.jpg" },
        { name: "Arms", image: "/images/site/arms.jpg" },
        { name: "Back", image: "/images/site/back.jpg" },
        { name: "Chest", image: "/images/site/chest.jpg" },
        { name: "Glutes", image: "/images/site/glutes.jpg" },
        { name: "Legs", image: "/images/site/legs.jpg" },
        { name: "Neck", image: "/images/site/neck.jpg" },
        { name: "Shoulders", image: "/images/site/shoulders.jpg" },
      ],
    };
  } else if (group === "force") {
    data = {
      title: "Choose By Force Type",
      group: group,
      items: [
        { name: "Push", image: "/images/site/push.jpg" },
        { name: "Pull", image: "/images/site/pull.jpg" },
        { name: "Static", image: "/images/site/static.jpg" },
      ],
    };
  } else if (group === "level") {
    data = {
      title: "Choose By Experience Level",
      group: group,
      items: [
        { name: "Beginner", image: "/images/site/beginner.jpg" },
        { name: "Intermediate", image: "/images/site/intermediate.jpg" },
        { name: "Expert", image: "/images/site/expert.jpg" },
      ],
    };
  } else if (group === "all") {
    try {
      const response = await axios.get(
        "https://extremefitness.onrender.com/exd"
      );
      const exercises = response.data;
      data = {
        title: "All Exercises",
        group: group,
        items: exercises.map((exercise) => ({
          name: exercise.name,
          image: `/images/exercises/${exercise.images[0]}`,
          id: exercise._id,
        })),
      };
      return res.render("./navpages/all", data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
      return res.redirect("/xr?status=500");
    }
  } else {
    return res.redirect("/xr?status=404");
  }

  res.render("./navpages/dynamicpage", data);
};

buildController.ErrorPage = async function (req, res, next, status) {
  try {
    const errorContent = await Utility.buildErrorPage(status);
    res.status(parseInt(status)).render("./error", {
      status,
      content: errorContent,
      title: status + " Error",
    });
  } catch (error) {
    next(error);
  }
};

buildController.GroupPages = async function (req, res) {
  const muscleGroups = {
    legs: ["calves", "quadriceps", "hamstrings", "adductors", "glutes"],
    arms: ["biceps", "forearms", "triceps"],
    back: ["middle back", "lats", "lower back", "traps"],
  };
  const muscle = req.query.bp.toLowerCase();
  let musclesToQuery = [muscle];
  if (muscleGroups[muscle]) {
    musclesToQuery = muscleGroups[muscle];
  }

  try {
    const workoutPromises = musclesToQuery.map((muscle) =>
      axios.get(`https://extremefitness.onrender.com/exd/muscle/${muscle}`)
    );
    const workoutResponses = await Promise.all(workoutPromises);
    const workouts = workoutResponses.flatMap((response) => response.data);
    const data = {
      title: `${muscle.charAt(0).toUpperCase() + muscle.slice(1)} Workouts`,
      items: workouts.map((workout) => ({
        name: workout.name,
        image: workout.images
          ? `/images/exercises/${workout.images[0]}`
          : "/images/site/default.jpg",
        id: workout._id,
      })),
    };
    res.render("./navpages/all", data);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.redirect("/xr?status=500");
  }
};

buildController.ForcePages = async function (req, res) {
  const forceTypes = ["push", "none", "pull", "static"];
  const force = req.query.ft.toLowerCase();

  if (!forceTypes.includes(force)) {
    return res.redirect("/xr?status=404");
  }

  try {
    const response = await axios.get(
      `https://extremefitness.onrender.com/exd/force/${force}`
    );
    const workouts = response.data;

    const data = {
      title: `${force.charAt(0).toUpperCase() + force.slice(1)} Workouts`,
      items: workouts.map((workout) => ({
        name: workout.name,
        image:
          workout.images && workout.images.length > 0
            ? `/images/exercises/${workout.images[0]}`
            : "/images/site/default.jpg",
        id: workout._id,
      })),
    };

    res.render("./navpages/all", data);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.redirect("/xr?status=500");
  }
};

buildController.LevelPages = async function (req, res) {
  const levels = ["intermediate", "expert", "beginner"];
  const level = req.query.lv.toLowerCase();

  if (!levels.includes(level)) {
    return res.redirect("/xr?status=404");
  }

  try {
    const response = await axios.get(
      `https://extremefitness.onrender.com/exd/level/${level}`
    );
    const workouts = response.data;
    const data = {
      title: `${level.charAt(0).toUpperCase() + level.slice(1)} Workouts`,
      items: workouts.map((workout) => ({
        name: workout.name,
        image:
          workout.images && workout.images.length > 0
            ? `/images/exercises/${workout.images[0]}`
            : "/images/site/default.jpg",
        id: workout._id,
      })),
    };
    res.render("./navpages/all", data);
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.redirect("/xr?status=500");
  }
};

buildController.ExercisePages = async function (req, res) {
  const exerciseId = req.query.exid;
  try {
    const response = await axios.get(
      `https://extremefitness.onrender.com/exd/${exerciseId}`
    );
    const exercise = response.data;
    if (!exercise) {
      console.error("Exercise data not found:", exerciseId);
      return res.redirect("/xr?status=404");
    }
    const data = {
      title: exercise.name,
      exercise: {
        name: exercise.name,
        force: exercise.force,
        level: exercise.level,
        mechanic: exercise.mechanic,
        equipment: exercise.equipment,
        primaryMuscles: exercise.primaryMuscles,
        instructions: exercise.instructions,
        category: exercise.category,
        images: exercise.images,
      },
    };
    res.render("./navpages/exercise", data);
  } catch (error) {
    console.error("Error fetching exercise details:", error);
    res.redirect("/xr?status=500");
  }
};

buildController.Search = async function (req, res) {
  const searchQuery = req.query.q.toLowerCase();
  const keywords = searchQuery.split(" ");
  const muscleGroups = {
    legs: ["calves", "quadriceps", "hamstrings", "adductors", "glutes"],
    arms: ["biceps", "forearms", "triceps"],
    back: ["middle back", "lats", "lower back", "traps"],
  };
  const muscles = [
    "abdominals",
    "arms",
    "back",
    "chest",
    "glutes",
    "legs",
    "neck",
    "houlders",
  ];
  const forceTypes = ["push", "none", "pull", "tatic"];
  const levels = ["beginner", "intermediate", "expert"];
  let apiUrl = "";
  let view = "";
  let data = {};
  const extractKeyword = () => {
    for (let keyword of keywords) {
      if (
        muscles.includes(keyword) ||
        Object.keys(muscleGroups).includes(keyword) ||
        forceTypes.includes(keyword) ||
        levels.includes(keyword)
      ) {
        return keyword;
      }
    }
    return searchQuery;
  };
  const keyword = extractKeyword();

  try {
    if (muscles.includes(keyword)) {
      apiUrl = `https://extremefitness.onrender.com/exd/muscle/${keyword}`;
      view = "./navpages/all";
      data.title = `${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      } Workouts`;
    } else if (Object.keys(muscleGroups).includes(keyword)) {
      let musclesToQuery = muscleGroups[keyword];
      const workoutPromises = musclesToQuery.map((muscle) =>
        axios.get(`https://extremefitness.onrender.com/exd/muscle/${muscle}`)
      );
      const workoutResponses = await Promise.all(workoutPromises);
      const workouts = workoutResponses.flatMap((response) => response.data);
      data.title = `${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      } Workouts`;
      data.items = workouts.map((workout) => ({
        name: workout.name,
        image: workout.images
          ? `/images/exercises/${workout.images[0]}`
          : "/images/site/default.jpg",
        id: workout._id,
      }));
      return res.render("./navpages/all", data);
    } else if (forceTypes.includes(keyword)) {
      apiUrl = `https://extremefitness.onrender.com/exd/force/${keyword}`;
      view = "./navpages/all";
      data.title = `${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      } Workouts`;
    } else if (levels.includes(keyword)) {
      apiUrl = `https://extremefitness.onrender.com/exd/level/${keyword}`;
      view = "./navpages/all";
      data.title = `${
        keyword.charAt(0).toUpperCase() + keyword.slice(1)
      } Workouts`;
    } else {
      apiUrl = `https://extremefitness.onrender.com/exd/${keyword}`;
      view = "./navpages/exercise";
    }

    const response = await axios.get(apiUrl);
    const resultData = response.data;

    if (view === "./navpages/exercise") {
      data.title = resultData.name;
      data.exercise = {
        name: resultData.name,
        force: resultData.force,
        level: resultData.level,
        mechanic: resultData.mechanic,
        equipment: resultData.equipment,
        primaryMuscles: resultData.primaryMuscles,
        instructions: resultData.instructions,
        category: resultData.category,
        images: resultData.images,
      };
    } else {
      data.items = resultData.map((item) => ({
        name: item.name,
        image:
          item.images && item.images.length > 0
            ? `/images/exercises/${item.images[0]}`
            : "/images/site/default.jpg",
        id: item._id,
      }));
    }
    if (data.items && data.items.length === 0) {
      data.message = "No data found";
      return res.render(view, data);
    }
    res.render(view, data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.redirect("/xr?status=500");
  }
};

module.exports = buildController;

