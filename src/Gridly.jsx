
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";

const Gridly = () => {
  const [widgets, setWidgets] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const addWidget = (type) => {
    const newWidget = {
      id: Date.now(),
      type,
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    };
    setWidgets([...widgets, newWidget]);
    setShowAddMenu(false);
  };

  return (
    <div className="min-h-screen bg-dot-grid-light dark:bg-dot-grid-dark transition-colors duration-300">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gridly</h1>
        <Button onClick={() => setShowAddMenu(!showAddMenu)}>
          + Add Widget
        </Button>
      </div>

      {showAddMenu && (
        <div className="p-4 flex gap-4">
          <Button onClick={() => addWidget("clock")}>Clock</Button>
          <Button onClick={() => addWidget("todo")}>To-Do</Button>
          <Button onClick={() => addWidget("notes")}>Notes</Button>
        </div>
      )}

      <div className="grid grid-cols-12 gap-2 p-4">
        {widgets.map((widget) => (
          <motion.div
            key={widget.id}
            className="col-span-3 row-span-2 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-md cursor-move"
            drag
            dragConstraints={{ left: 0, top: 0, right: 1000, bottom: 1000 }}
            whileDrag={{ scale: 1.05 }}
          >
            <Widget type={widget.type} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Widget = ({ type }) => {
  switch (type) {
    case "clock":
      return <div className="text-xl">🕒 Clock Widget</div>;
    case "todo":
      return <div className="text-xl">📋 To-Do List</div>;
    case "notes":
      return <div className="text-xl">📝 Notes</div>;
    default:
      return <div>Unknown Widget</div>;
  }
};

export default Gridly;
