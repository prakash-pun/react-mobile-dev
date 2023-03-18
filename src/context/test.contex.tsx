import React, { useMemo, useState } from "react";

interface ICreateTask {
  categoryId: string;
  name: string;
  point: number;
}

export const TaskContext: any = React.createContext({});

export const TaskProvider = ({ children }: any) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCreateTask = async (data: ICreateTask) => {
    // const response = await something(data);
    setLoading(true);

    console.log(data);
    setLoading(false);
    setToggle(true);
  };

  const value = useMemo(
    () => ({
      toggle,
      loading,
      onCreateTask
    }),
    []
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
