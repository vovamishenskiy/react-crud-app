import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";

const Dashboard: React.FC = (): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  const css = `
    .dash-welcome {
      display: flex;
      justify-content: center;
    }
  `

  React.useEffect(() => {
    document.title = "Панель управления";
  }, []);

  return (
    <>
      <style>{css}</style>
      <h2 className="dash-welcome">Добро пожаловать, {user?.user?.username ?? ""}</h2>
    </>
  );
};

export default Dashboard;
