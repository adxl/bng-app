import React from "react";

import { useAuth } from "@hooks/auth";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <React.Fragment>
      <h1>HOME</h1>
      <small>
        {user.firstName} {user.lastName}
      </small>
    </React.Fragment>
  );
};

export default Home;
