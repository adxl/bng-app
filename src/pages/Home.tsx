import React from "react";
import { Button } from "flowbite-react";

import { useAuth } from "@hooks/auth";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <React.Fragment>
      <h1>HOME</h1>
      <small>
        {user.firstName} {user.lastName}
      </small>

      <Button color="failure" onClick={logout}>
        Se déconnecter
      </Button>
    </React.Fragment>
  );
};

export default Home;
