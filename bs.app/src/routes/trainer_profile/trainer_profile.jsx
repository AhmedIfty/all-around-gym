import React, { useEffect, useState } from 'react';
import './trainer_profile.scss';

const TrainerProfile = () => {
    return (
        <div className="profilePage">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1>User Information</h1>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt=""
                  />
                </span>
                <span>
                  Username: <b>"Lemon"</b>
                </span>
                <span>
                  E-mail: <b>"Lemon@gmail.com"</b>
                </span>
                <span>
                  <b>About Me</b>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, ipsum! Nam, delectus porro neque mollitia aliquid nisi itaque nemo quaerat? Sequi exercitationem maxime esse labore distinctio aliquid, minus doloribus excepturi.</p>
                </span>
                <span>
                  <b>Gym Name:</b>
                  <p>Zeus Gym</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
};

export default TrainerProfile;
