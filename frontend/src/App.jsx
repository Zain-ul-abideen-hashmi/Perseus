import { useState, useRef, useEffect, useCallback } from 'react';
import Background from './components/Background.jsx';
import Login from './screens/Login.jsx';
import Intake from './screens/Intake.jsx';
import Loading from './screens/Loading.jsx';
import AppShell from './screens/AppShell.jsx';
import { api } from './api.js';

export default function App() {

  const [stage, setStage] = useState('login');
  const [screen, setScreen] = useState('funnel');
  const [pct, setPct] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const runLoad = useCallback((payload) => {
    clearInterval(timer.current);
    setStage('loading');
    setPct(0);
    api.runSimulation(payload);
    timer.current = setInterval(() => {
      setPct((p) => {
        const next = p + 1.6;
        if (next >= 100) {
          clearInterval(timer.current);
          setStage('app');
          return 100;
        }
        return next;
      });
    }, 62);
  }, []);

  const skipLoad = useCallback(() => {
    clearInterval(timer.current);
    setStage('app');
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100dvh' }}>
      <Background />
      {stage === 'login' && <Login onContinue={() => setStage('intake')} />}
      {stage === 'intake' && (
        <Intake onRun={runLoad} onBack={() => setStage('login')} />
      )}
      {stage === 'loading' && <Loading pct={pct} onSkip={skipLoad} />}
      {stage === 'app' && <AppShell screen={screen} setScreen={setScreen} />}
    </div>
  );
}
