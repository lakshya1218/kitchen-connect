import React, { useState } from 'react';

function Comingsoon() {
  // Create a state variable to track whether the user has subscribed
  const [subscribed, setSubscribed] = useState(false);
  // Create a state variable to store the email input
  const [email, setEmail] = useState('');

  // Function to handle the subscribe button click
  const handleSubscribe = () => {
    // Send the email to the backend for storage (you can add this part)
    // ...

    // Update the state to show the "Thanks for subscribing" message
    setSubscribed(true);
  };

  return (
    <div className='soon'>
      <div className='soon-content'>
        <h1>Something's cooking</h1>
        <p>Welcome to Kitchen Connect. Tune in, we’re coming soon. Get notified when the site goes live.</p>

        {subscribed ? (
          <div>
            <p>Thanks for subscribing!</p>
          </div>
        ) : (
          <div className="form-control">
            <input
              type="email"
              className="input"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn" type="submit" onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comingsoon;


