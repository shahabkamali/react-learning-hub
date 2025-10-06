import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import LifeCycleDemo from "./pages/LifeCycle.tsx";
import ListsDemo from "./pages/Lists.tsx";
import FragmentDemo from "./pages/Fragment.tsx";
import FormDemo from "./pages/Form.tsx";
import AdvancedSetStateDemo from "./pages/AdvancedSetState.tsx";
import RefsDemo from "./pages/Refs.tsx";
import PureComponentDemo from "./pages/PureComponent.tsx";
import ErrorHandlingDemo from "./pages/ErrorHandling.tsx";
import UnmountingDemo from "./pages/Unmounting.tsx";
import StatelessDemo from "./pages/Stateless.tsx";
import UseStateDemo from "./pages/UseState.tsx";
import UseEffectDemo from "./pages/UseEffect.tsx";
import HookRulesDemo from "./pages/HookRules.tsx";
import CustomHooksDemo from "./pages/CustomHooks.tsx";


function App() {
  return (
    <Router>
      <nav style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '15px 20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <Link 
            to="/" 
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            React Learning Hub
          </Link>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <Link 
              to="/" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/life-cycle" element={<LifeCycleDemo />} />
        <Route path="/lists" element={<ListsDemo />} />
        <Route path="/fragment" element={<FragmentDemo />} />
        <Route path="/form" element={<FormDemo />} />
        <Route path="/advanced-setstate" element={<AdvancedSetStateDemo />} />
        <Route path="/refs" element={<RefsDemo />} />
        <Route path="/purecomponent" element={<PureComponentDemo />} />
        <Route path="/error-handling" element={<ErrorHandlingDemo />} />
        <Route path="/unmounting" element={<UnmountingDemo />} />
        <Route path="/stateless" element={<StatelessDemo />} />
        <Route path="/usestate" element={<UseStateDemo />} />
        <Route path="/useeffect" element={<UseEffectDemo />} />
        <Route path="/hook-rules" element={<HookRulesDemo />} />
        <Route path="/custom-hooks" element={<CustomHooksDemo />} />
      </Routes>
    </Router>
  );
}

export default App;

