import React, { useEffect, useState } from "react";
import Template from "./Template";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("templates")) {
      let localtemplates = localStorage.getItem("templates");
      localtemplates = JSON.parse(localtemplates);
      setTemplates(localtemplates);
      console.log(localtemplates, "hi");
    }
  }, []);

  return (
    <div style={{ width: "50vh", display: "flex", flexDirection: "column" }}>
      {/* {templates.length} */}
      {templates.map(
        (template, id) => (
          <Template key={id} id={id} template={template} />
        )
        // template.name
      )}
    </div>
  );
};

export default Templates;
