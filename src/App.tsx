import { useState } from 'react'
import './App.css'

function App() {
  // Játékosok
  const [players, setPlayers] = useState<string[]>(['', '', '']);

  // Fix classok
  const classes = [
    'Wylder',
    'Guardian',
    'Ironeye',
    'Duchess',
    'Raider',
    'Revenant',
    'Recluse',
    'Executor',
  ];
  // Fix world change-ek
  const worldChanges = [
    'None',
    'Crater',
    'Mountaintop',
    'Rotted Woods',
    'Noklateo',
  ];
  // Fix bossok
  const bosses = [
    'Tricephalos',
    'Gaping Jaw',
    'Sentient Pest',
    'Augur',
    'Equilibrious Beast',
    'Darkdrift Knight',
    'Fissure in the Fog',
    'Night Aspect',
    'Weekly Sovereign 1',
    'Weekly Sovereign 2',
  ];
  // Boss pipák
  const [bossChecked, setBossChecked] = useState<boolean[]>(Array(10).fill(false));

  // Randomizált eredmény state
  const [result, setResult] = useState<{
    leader?: string;
    assignments?: { player: string; className: string }[];
    worldChange?: string;
    boss?: string;
  } | null>(null);

  // Input kezelő
  const handlePlayerChange = (idx: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[idx] = value;
    setPlayers(newPlayers);
  };
  const handleBossCheck = (idx: number) => {
    const newChecked = [...bossChecked];
    newChecked[idx] = !newChecked[idx];
    setBossChecked(newChecked);
  };

  // Randomizáló logika
  const handleGenerate = () => {
    // Csak nem üres játékosokat veszünk figyelembe
    const activePlayers = players.filter(p => p.trim() !== '');
    if (activePlayers.length === 0) {
      setResult(null);
      return;
    }
    // Random leader
    const leader = activePlayers[Math.floor(Math.random() * activePlayers.length)];
    // Class assignment (minden játékoshoz függetlenül random class, ismétlődhet)
    const assignments = activePlayers.map((player) => ({
      player,
      className: classes[Math.floor(Math.random() * classes.length)],
    }));
    // World change
    const worldChange = worldChanges[Math.floor(Math.random() * worldChanges.length)];
    // Még nem kipipált bossok
    const availableBosses = bosses.filter((_, idx) => !bossChecked[idx]);
    const boss = availableBosses.length > 0
      ? availableBosses[Math.floor(Math.random() * availableBosses.length)]
      : undefined;
    setResult({ leader, assignments, worldChange, boss });
  };

  return (
    <main className="nr-main">
      <h1 className="nr-title">Elden Ring Nightreign Challenge Randomizer</h1>
      {/* Játékosok */}
      <section className="nr-section nr-players">
        <h2 className="nr-section-title">Játékosok (1-3)</h2>
        {players.map((player, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Játékos ${idx + 1} neve`}
            value={player}
            onChange={e => handlePlayerChange(idx, e.target.value)}
            className="nr-input"
          />
        ))}
      </section>
      {/* Classok */}
      <section className="nr-section nr-classes">
        <h2 className="nr-section-title">Classok</h2>
        <ul className="nr-list nr-class-list">
          {classes.map((cls, idx) => (
            <li key={idx} className="nr-list-item nr-class-item">{cls}</li>
          ))}
        </ul>
      </section>
      {/* World change-ek */}
      <section className="nr-section nr-worldchanges">
        <h2 className="nr-section-title">World Change-ek</h2>
        <ul className="nr-list nr-worldchange-list">
          {worldChanges.map((wc, idx) => (
            <li key={idx} className="nr-list-item nr-worldchange-item">{wc}</li>
          ))}
        </ul>
      </section>
      {/* Bossok */}
      <section className="nr-section nr-bosses">
        <h2 className="nr-section-title">Bossok</h2>
        {bosses.map((boss, idx) => (
          <div key={idx} className="nr-boss-row">
            <span className="nr-boss-name">{boss}</span>
            <label className="nr-boss-checkbox-label">
              <input
                type="checkbox"
                checked={bossChecked[idx]}
                onChange={() => handleBossCheck(idx)}
                className="nr-boss-checkbox"
              />
              Kész
            </label>
          </div>
        ))}
      </section>
      {/* Generálás gomb */}
      <section className="nr-section nr-generate-section">
        <button onClick={handleGenerate} className="nr-generate-btn">
          Generálás
        </button>
      </section>
      {/* Eredmény */}
      {result && (
        <section className="nr-section nr-result">
          <h2 className="nr-section-title">Eredmény</h2>
          <div className="nr-result-leader"><b>Kör irányítója:</b> {result.leader}</div>
          <div className="nr-result-classes">
            <b>Class kiosztás:</b>
            <ul className="nr-list nr-result-class-list">
              {result.assignments?.map((a, idx) => (
                <li key={idx} className="nr-list-item nr-result-class-item">{a.player}: {a.className}</li>
              ))}
            </ul>
          </div>
          <div className="nr-result-worldchange"><b>Shifting Earth:</b> {result.worldChange}</div>
          <div className="nr-result-boss"><b>Boss:</b> {result.boss ? result.boss : 'Nincs elérhető boss!'}</div>
        </section>
      )}
    </main>
  )
}

export default App
