# FIFA World Cup 2026 - Unified Standings Log & Live Monitor

🏆 A premium, interactive dashboard designed to monitor the standings of the 2026 FIFA World Cup in a single, unified leaderboard.

## Why this was created
This project was born out of frustration: **I couldn't find a single, unified log or super-leaderboard online that compared all 48 teams across all 12 groups in one place.** During the World Cup group stage, tracking who qualifies (especially the race for the 8 best third-place wildcards) requires looking at multiple separate group tables and trying to calculate comparisons manually. 

This app solves that by compiling all group standings into a single, sortable, and filterable log that automatically resolves FIFA's tiebreaker and wildcard rules in real-time.

---

## 🤖 Built with Antigravity
This project was built entirely with **Antigravity**, a powerful agentic AI coding assistant designed by the **Google DeepMind** team working on Advanced Agentic Coding.

---

## 🌟 Key Features

* **Unified Leaderboard (Single Log)**: Ranks all 48 teams in one table.
  * *Tournament Rank (Official)*: Groups teams by their group position (all 1st-place teams 1-12, all 2nd-place teams 13-24, all 3rd-place teams 25-36, all 4th-place teams 37-48) sorted globally.
  * *Pure Global Sort*: A pure points leaderboard sorting all 48 teams globally from 1 to 48.
* **Dynamic Qualification Solver**:
  * Automatically calculates group ranks based on PTS $\rightarrow$ Goal Difference $\rightarrow$ Goals For $\rightarrow$ Wins.
  * Automatically highlights direct qualifiers (Top 2) and resolves the 8 best third-place wildcard spots.
  * Stands scale dynamically: positions display as "Live" until the group matches finish (every team plays 3 games), preventing premature qualification statistics.
* **Resilient Data Layer**:
  * **Primary**: Fetches from API-Football for live results.
  * **Fallback**: If the API key is restricted to previous seasons (e.g. on Free plans), it automatically switches to fetch live-updated JSON feeds from the OpenFootball community dataset, ensuring the app works out of the box.
* **Windows Flag Rendering Fix**: Employs real PNG flag images via FlagCDN instead of unicode emojis (which often render as simple two-letter text codes on Windows browsers).
* **Premium Theme**: Dark glassmorphic panels with gold/emerald glowing indicators.

---

## 🛠️ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mo-chips/FIFAWorldCup_UnifiedLog.git
   cd FIFAWorldCup_UnifiedLog
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000/`.

---

## 🇨🇦 🇲🇽 🇺🇸 Host Cities
Matches are hosted across 16 cities in North America:
* **Canada**: Toronto, Vancouver
* **Mexico**: Guadalajara, Mexico City, Monterrey
* **United States**: Atlanta, Boston, Dallas, Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphia, San Francisco, Seattle
