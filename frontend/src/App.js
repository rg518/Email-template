import "./App.css";
import Contact from "./components/Contact";
import Templates from "./components/Templates";

function App() {
  let templates = [
    {
      name: "firstMail",
      subject: "Good morning",
      maillist: "nvp@gmail.com",
      body: "how are you?",
    },
  ];
  templates = JSON.stringify(templates);
  // localStorage.setItem("templates", templates);
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Contact />
      {/* <Templates /> */}
      <Templates templates={templates} />
    </div>
  );
}

export default App;
