import { useState } from "react";
import Animate from "./Animate/ui/Animate";
   

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  return (
    <>
      {showIntro && (
        <Animate
          revealSite={() => setSiteVisible(true)}
          hideIntro={() => setShowIntro(false)}
        />
      )}

    
      <div className={`App ${siteVisible ? "site-visible" : "site-hidden"}`}>
        <header className="App-header">Header</header>
        <main>Main content</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}

export default App;
