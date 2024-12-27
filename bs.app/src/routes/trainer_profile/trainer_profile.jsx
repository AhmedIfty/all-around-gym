import React from 'react';
import './trainer_profile.scss';

const TrainerProfile = () => {
  return (
    <div className="profilePage1">
      <div className="details1">
        <div className="wrapper1">
          <div className="title1">
            <h1>User Information</h1>
          </div>
          <div className="info1">
            {/* Bio Section */}
            <div className="bio1">
              <h1>Hi I'm Lemon</h1>
              <div>
                <h2>About Me</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ipsum! Nam, delectus porro neque mollitia aliquid nisi itaque nemo quaerat? Sequi exercitationem maxime esse labore distinctio aliquid, minus doloribus excepturi.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veritatis illum iure. Cum neque impedit repellat provident dolorum. Atque dolorem sequi eligendi nesciunt dolor ipsum placeat eveniet eum saepe dolores.
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti beatae ipsum totam, tempora veniam unde ad. Perspiciatis accusantium explicabo repudiandae harum nobis iste et recusandae aliquid. Vel alias tempore obcaecati!
                </p>
              </div>
              <span>
                <h2>Email: </h2> <h3>Lemon@gmail.com</h3>
                <h2>Mobile: </h2> <h3>+8801539884569 </h3>
                <h2>Gym Name: </h2> <h3>Zeus Gym </h3>
              </span>
            </div>

            <div className="avatar1">
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="User Avatar"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Specialization Section */}
      <h1 className="specialization-title1">Exercises I Specialize In</h1>
      <div className="specialization1">
        <div className="card1">
          <div className="icon1">🏋️</div>
          <h3>Weightlifting</h3>
          <p>Specializes in strength and power training.</p>
        </div>
        <div className="card1">
          <div className="icon1">🧘</div>
          <h3>Yoga</h3>
          <p>Expert in flexibility and mindfulness techniques.</p>
        </div>
        <div className="card1">
          <div className="icon1">🏃</div>
          <h3>Cardio</h3>
          <p>Focused on endurance and heart health exercises.</p>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
