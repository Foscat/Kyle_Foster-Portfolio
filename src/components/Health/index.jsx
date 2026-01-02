import React from "react";
import { Panel } from "rsuite";

const Health = () => {
  return (
    <Panel
      bordered
      header="System Health"
    >
      <ul>
        <li>React: 18.2.0</li>
        <li>Environment: {import.meta.env.MODE}</li>
        <li>Build Tool: Vite</li>
        <li>RSuite: Loaded</li>
      </ul>
    </Panel>
  );
};

export default Health;
