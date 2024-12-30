import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import './DietPlans.scss';

const dietPlansData = {
  weight_loss: [
    { title: 'Weight Loss Plan 1', description: 'A calorie-deficit diet with balanced macronutrients focusing on lean proteins, complex carbs, and healthy fats. Includes meal timing to optimize fat loss while maintaining muscle mass.' },
    { title: 'Weight Loss Plan 2', description: 'Combines intermittent fasting with nutrient-dense meals. Focused on portion control, low-glycemic-index foods, and hydration for effective weight management.' },
  ],
  weight_gain: [
    { title: 'Weight Gain Plan 1', description: 'A high-calorie meal plan focusing on nutrient-rich foods like whole grains, lean proteins, and healthy fats. Includes frequent meals and snacks for sustained calorie surplus.' },
    { title: 'Weight Gain Plan 2', description: 'Tailored for hard-gainers, this plan incorporates calorie-dense shakes, complex carbs, and protein-rich foods to maximize muscle gain and recovery.' },
  ],
  strength_training: [
    { title: 'Strength Training Plan 1', description: 'Focused on building foundational strength, this plan emphasizes compound movements such as squats, deadlifts, and bench presses. Includes progressive overload techniques with a mix of high-intensity and low-repetition sets for muscle development.' },
    { title: 'Strength Training Plan 2', description: 'Designed for advanced lifters, this plan incorporates accessory work, supersets, and explosive training like power cleans. Ideal for breaking plateaus and enhancing overall athletic performance.' },
  ],
};

const recipesData = {
  weight_loss: [
    { title: 'Weight Loss Recipe 1', description: 'A refreshing mixed greens salad with grilled salmon, avocado, and a light vinaigrette dressing for a low-calorie yet filling meal.' },
    { title: 'Weight Loss Recipe 2', description: 'Zucchini noodles with turkey meatballs and marinara sauce, providing a delicious low-carb alternative to traditional pasta dishes.' },
  ],
  weight_gain: [
    { title: 'Weight Gain Recipe 1', description: 'Creamy peanut butter and banana smoothie made with whole milk, oats, and whey protein for a calorie-packed snack.' },
    { title: 'Weight Gain Recipe 2', description: 'A hearty steak and sweet potato meal with sautéed asparagus, perfect for post-workout recovery and muscle building.' },
  ],
  strength_training: [
    { title: 'Strength Training Recipe 1', description: 'Protein-packed oatmeal with almond butter, chia seeds, and fresh berries to kickstart your day with sustained energy for intense workouts.' },
    { title: 'Strength Training Recipe 2', description: 'A high-protein grilled chicken bowl with quinoa, roasted vegetables, and a lemon-garlic dressing to fuel muscle recovery and growth.' },
  ],
};

const workoutsData = {
  weight_loss: [
    { title: 'Weight Loss Workout 1', description: 'A mix of cardio and strength training exercises to burn calories and build lean muscle. Includes HIIT sessions, circuit training, and bodyweight exercises.' },
    { title: 'Weight Loss Workout 2', description: 'Focuses on steady-state cardio, resistance training, and flexibility exercises. Incorporates running, cycling, and yoga for a balanced approach to weight loss.' },
  ],
  weight_gain: [
    { title: 'Weight Gain Workout 1', description: 'Strength training program with a focus on hypertrophy. Includes compound lifts like bench press, squats, and deadlifts, along with isolation exercises.' },
    { title: 'Weight Gain Workout 2', description: 'Combines heavy lifting with moderate cardio. Emphasizes progressive overload and muscle recovery with exercises like pull-ups, rows, and leg presses.' },
  ],
  strength_training: [
    { title: 'Strength Training Workout 1', description: 'A comprehensive strength training routine with a focus on compound movements. Includes squats, deadlifts, bench presses, and overhead presses.' },
    { title: 'Strength Training Workout 2', description: 'Advanced strength training program with a mix of compound and isolation exercises. Incorporates powerlifting techniques and accessory work for overall strength development.' },
  ],
};

const DietPlans = () => {
  const [fitnessGoal, setFitnessGoal] = useState('weight_loss');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const goalFromParams = searchParams.get('goal');
    if (goalFromParams) {
      setFitnessGoal(goalFromParams);
    }
  }, [searchParams]);

  const handleGoalChange = (e) => {
    setFitnessGoal(e.target.value);
  };

  return (
    <div className="diet-plans-page">
      <h1>Diet Plans, Recipes, and Workouts</h1>
      {/* <div className="goal-selector">
        <label htmlFor="fitnessGoal">Select Fitness Goal:</label>
        <select id="fitnessGoal" value={fitnessGoal} onChange={handleGoalChange}>
          <option value="weight_loss">Weight Loss</option>
          <option value="weight_gain">Weight Gain</option>
          <option value="strength_training">Strength Training</option>
        </select>
      </div> */}
      <div className="diet-plans">
        <h2>Diet Plans</h2>
        {dietPlansData[fitnessGoal].map((plan, index) => (
          <div key={index} className="diet-plan">
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
          </div>
        ))}
      </div>
      <div className="recipes">
        <h2>Recipes</h2>
        {recipesData[fitnessGoal].map((recipe, index) => (
          <div key={index} className="recipe">
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
      <div className="workouts">
        <h2>Workouts</h2>
        {workoutsData[fitnessGoal].map((workout, index) => (
          <div key={index} className="workout">
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlans;