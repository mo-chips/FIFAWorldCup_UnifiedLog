// App State & Data Definitions

const OPENFOOTBALL_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

// Official 48 Teams, Groups & Flags
const TEAMS_DATA = {
  'Mexico': { group: 'A', flag: '🇲🇽' },
  'South Africa': { group: 'A', flag: '🇿🇦' },
  'South Korea': { group: 'A', flag: '🇰🇷' },
  'Czechia': { group: 'A', flag: '🇨🇿' },
  
  'Canada': { group: 'B', flag: '🇨🇦' },
  'Bosnia and Herzegovina': { group: 'B', flag: '🇧🇦' },
  'Qatar': { group: 'B', flag: '🇶🇦' },
  'Switzerland': { group: 'B', flag: '🇨🇭' },
  
  'Brazil': { group: 'C', flag: '🇧🇷' },
  'Haiti': { group: 'C', flag: '🇭🇹' },
  'Morocco': { group: 'C', flag: '🇲🇦' },
  'Scotland': { group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  
  'United States': { group: 'D', flag: '🇺🇸' },
  'Paraguay': { group: 'D', flag: '🇵🇾' },
  'Australia': { group: 'D', flag: '🇦🇺' },
  'Türkiye': { group: 'D', flag: '🇹🇷' },
  
  'Germany': { group: 'E', flag: '🇩🇪' },
  'Curaçao': { group: 'E', flag: '🇨🇼' },
  "Côte d'Ivoire": { group: 'E', flag: '🇨🇮' },
  'Ecuador': { group: 'E', flag: '🇪🇨' },
  
  'Netherlands': { group: 'F', flag: '🇳🇱' },
  'Japan': { group: 'F', flag: '🇯🇵' },
  'Sweden': { group: 'F', flag: '🇸🇪' },
  'Tunisia': { group: 'F', flag: '🇹🇳' },
  
  'Belgium': { group: 'G', flag: '🇧🇪' },
  'Egypt': { group: 'G', flag: '🇪🇬' },
  'Iran': { group: 'G', flag: '🇮🇷' },
  'New Zealand': { group: 'G', flag: '🇳🇿' },
  
  'Spain': { group: 'H', flag: '🇪🇸' },
  'Cabo Verde': { group: 'H', flag: '🇨🇻' },
  'Saudi Arabia': { group: 'H', flag: '🇸🇦' },
  'Uruguay': { group: 'H', flag: '🇺🇾' },
  
  'France': { group: 'I', flag: '🇫🇷' },
  'Senegal': { group: 'I', flag: '🇸🇳' },
  'Iraq': { group: 'I', flag: '🇮🇶' },
  'Norway': { group: 'I', flag: '🇳🇴' },
  
  'Argentina': { group: 'J', flag: '🇦🇷' },
  'Algeria': { group: 'J', flag: '🇩🇿' },
  'Austria': { group: 'J', flag: '🇦🇹' },
  'Jordan': { group: 'J', flag: '🇯🇴' },
  
  'Portugal': { group: 'K', flag: '🇵🇹' },
  'DR Congo': { group: 'K', flag: '🇨🇩' },
  'Uzbekistan': { group: 'K', flag: '🇺🇿' },
  'Colombia': { group: 'K', flag: '🇨🇴' },
  
  'England': { group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'Croatia': { group: 'L', flag: '🇭🇷' },
  'Ghana': { group: 'L', flag: '🇬🇭' },
  'Panama': { group: 'L', flag: '🇵🇦' }
};

// Mappings for FlagCDN 2-letter ISO codes
const TEAM_FLAG_CODES = {
  'Mexico': 'mx',
  'South Africa': 'za',
  'South Korea': 'kr',
  'Czechia': 'cz',
  'Canada': 'ca',
  'Bosnia and Herzegovina': 'ba',
  'Qatar': 'qa',
  'Switzerland': 'ch',
  'Brazil': 'br',
  'Haiti': 'ht',
  'Morocco': 'ma',
  'Scotland': 'gb-sct',
  'United States': 'us',
  'Paraguay': 'py',
  'Australia': 'au',
  'Türkiye': 'tr',
  'Germany': 'de',
  'Curaçao': 'cw',
  "Côte d'Ivoire": 'ci',
  'Ecuador': 'ec',
  'Netherlands': 'nl',
  'Japan': 'jp',
  'Sweden': 'se',
  'Tunisia': 'tn',
  'Belgium': 'be',
  'Egypt': 'eg',
  'Iran': 'ir',
  'New Zealand': 'nz',
  'Spain': 'es',
  'Cabo Verde': 'cv',
  'Saudi Arabia': 'sa',
  'Uruguay': 'uy',
  'France': 'fr',
  'Senegal': 'sn',
  'Iraq': 'iq',
  'Norway': 'no',
  'Argentina': 'ar',
  'Algeria': 'dz',
  'Austria': 'at',
  'Jordan': 'jo',
  'Portugal': 'pt',
  'DR Congo': 'cd',
  'Uzbekistan': 'uz',
  'Colombia': 'co',
  'England': 'gb-eng',
  'Croatia': 'hr',
  'Ghana': 'gh',
  'Panama': 'pa'
};


// Global Arrays for Matches & Computed Standings
let matches = [];
let standings = [];
let sortMode = 'rank'; // 'rank' or 'pure'
let currentFilter = 'all'; // 'all', 'qualified', 'third-place', 'eliminated', or Group letter 'A'-'L'
let searchQuery = '';
let topGoalscorers = [];

// Normalizes name from APIs to match TEAMS_DATA keys
function normalizeTeamName(name) {
  if (!name) return '';
  const n = name.trim().toLowerCase();
  if (n === 'czech republic' || n === 'czechia') return 'Czechia';
  if (n.includes('congo dr') || n.includes('dr congo') || n.includes('democratic republic') || n.includes('congo') && n.includes('dem')) return 'DR Congo';
  if (n === 'ivory coast' || n.includes("côte d'ivoire") || n.includes("cote d'ivoire")) return "Côte d'Ivoire";
  if (n === 'usa' || n === 'united states' || n === 'united states of america') return 'United States';
  if (n === 'turkey' || n === 'türkiye') return 'Türkiye';
  if (n.includes('bosnia') && n.includes('herz')) return 'Bosnia and Herzegovina';
  if (n === 'cape verde' || n === 'cabo verde') return 'Cabo Verde';
  
  // Try exact key case-insensitive match
  for (let key in TEAMS_DATA) {
    if (key.toLowerCase() === n) return key;
  }
  
  // Format fallback: capitalize first letter of each word
  return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ----------------------------------------------------
// Data Fetching
// ----------------------------------------------------

async function fetchTournamentData() {
  const CACHE_KEY = 'fifa_2026_matches_data';
  const CACHE_TIME_KEY = 'fifa_2026_matches_cache_time';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in ms
  
  const now = Date.now();
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
  
  if (cachedData && cachedTime && (now - parseInt(cachedTime)) < CACHE_DURATION) {
    try {
      const data = JSON.parse(cachedData);
      updateApiStatus('success', 'Connected to Live Feed (Cached)');
      processOpenFootballData(data.matches);
      return;
    } catch (e) {
      console.warn('Error parsing cached data, fetching fresh data...', e);
    }
  }
  
  updateApiStatus('warning', 'Connecting to Live Feed...');
  
  try {
    const response = await fetch(OPENFOOTBALL_URL);
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const data = await response.json();
    
    // Save to cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, now.toString());
    
    updateApiStatus('success', 'Connected to Live Feed');
    processOpenFootballData(data.matches);
  } catch (err) {
    console.error('All data sources failed:', err);
    
    // Fallback to expired cache if offline
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        updateApiStatus('warning', 'Offline - Using Stale Cached Data');
        processOpenFootballData(data.matches);
        return;
      } catch (e) {}
    }
    
    updateApiStatus('error', 'Data Source Offline');
    showErrorState();
  }
}

function updateApiStatus(type, text) {
  const statusEl = document.getElementById('apiStatus');
  const dot = statusEl.querySelector('.status-dot');
  const label = statusEl.querySelector('.status-text');
  
  dot.className = `status-dot ${type}`;
  label.textContent = text;
}

// ----------------------------------------------------
// Data Processing: OpenFootball (Matches -> Standings computed)
// ----------------------------------------------------
function processOpenFootballData(openMatches) {
  matches = openMatches.map(m => {
    return {
      round: m.round,
      date: m.date,
      time: m.time,
      team1: normalizeTeamName(m.team1),
      team2: normalizeTeamName(m.team2),
      score: m.score && m.score.ft ? { ft: m.score.ft } : null,
      group: m.group,
      ground: m.ground
    };
  });
  
  calculateStandingsFromMatches();
}

function calculateStandingsFromMatches() {
  const teamStats = {};
  for (let team in TEAMS_DATA) {
    teamStats[team] = createEmptyStatObject(team);
  }
  
  const playerGoalsMap = {};
  
  // Accumulate standings based on match scores
  matches.forEach(match => {
    const t1 = match.team1;
    const t2 = match.team2;
    
    if (!teamStats[t1] || !teamStats[t2]) return; // Skip if unrecognized teams
    if (!match.score || !match.score.ft) return; // Skip unplayed matches
    
    const [score1, score2] = match.score.ft;
    
    teamStats[t1].mp += 1;
    teamStats[t2].mp += 1;
    teamStats[t1].gf += score1;
    teamStats[t2].gf += score2;
    teamStats[t1].ga += score2;
    teamStats[t2].ga += score1;
    
    if (score1 > score2) {
      teamStats[t1].w += 1;
      teamStats[t2].l += 1;
      teamStats[t1].pts += 3;
    } else if (score1 < score2) {
      teamStats[t2].w += 1;
      teamStats[t1].l += 1;
      teamStats[t2].pts += 3;
    } else {
      teamStats[t1].d += 1;
      teamStats[t2].d += 1;
      teamStats[t1].pts += 1;
      teamStats[t2].pts += 1;
    }
    
    teamStats[t1].gd = teamStats[t1].gf - teamStats[t1].ga;
    teamStats[t2].gd = teamStats[t2].gf - teamStats[t2].ga;
    
    // Accumulate player goals (real data from JSON goals list)
    if (match.goals1) {
      match.goals1.forEach(g => {
        if (g.owngoal) return; // Skip own goals for top scorers
        const scorerName = g.name;
        if (!playerGoalsMap[scorerName]) {
          playerGoalsMap[scorerName] = { name: scorerName, team: t1, goals: 0 };
        }
        playerGoalsMap[scorerName].goals += 1;
      });
    }
    if (match.goals2) {
      match.goals2.forEach(g => {
        if (g.owngoal) return; // Skip own goals for top scorers
        const scorerName = g.name;
        if (!playerGoalsMap[scorerName]) {
          playerGoalsMap[scorerName] = { name: scorerName, team: t2, goals: 0 };
        }
        playerGoalsMap[scorerName].goals += 1;
      });
    }
  });
  
  // Sort and assign to global topGoalscorers
  topGoalscorers = Object.values(playerGoalsMap).sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name));
  
  computeStandingsFromStats(teamStats);
  renderMatches();
  renderStats();
}

function createEmptyStatObject(name) {
  const flagUrl = TEAM_FLAG_CODES[name] ? `https://flagcdn.com/w40/${TEAM_FLAG_CODES[name]}.png` : 'https://flagcdn.com/w40/un.png';
  return {
    name: name,
    group: TEAMS_DATA[name].group,
    flag: flagUrl,
    mp: 0,
    w: 0,
    d: 0,
    l: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    pts: 0,
    groupPos: 0,
    status: 'in-progress' // 'qualified-direct', 'qualified-wildcard', 'eliminated', 'in-progress'
  };
}

// ----------------------------------------------------
// Standings Solver & Rule Engine
// ----------------------------------------------------
function computeStandingsFromStats(teamStats) {
  const allTeams = Object.values(teamStats);
  
  // 1. Group Standings Calculation
  const groups = {};
  allTeams.forEach(team => {
    if (!groups[team.group]) groups[team.group] = [];
    groups[team.group].push(team);
  });
  
  // Sort teams within each group (A-L)
  for (let grpLetter in groups) {
    groups[grpLetter].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.gd !== a.gd) return b.gd - a.gd;
      if (b.gf !== a.gf) return b.gf - a.gf;
      if (b.w !== a.w) return b.w - a.w;
      return a.name.localeCompare(b.name); // Alphabetic fallback
    });
    
    // Assign position 1st, 2nd, 3rd, 4th
    groups[grpLetter].forEach((team, idx) => {
      team.groupPos = idx + 1;
    });
  }
  
  // 2. Identify Direct Qualifiers and Candidates
  const firstPlaceTeams = [];
  const secondPlaceTeams = [];
  const thirdPlaceTeams = [];
  const fourthPlaceTeams = [];
  
  // Check if ALL groups in the tournament are completed
  const allGroupsFinished = allTeams.every(team => team.mp === 3);

  allTeams.forEach(team => {
    // Check if THIS team's group is finished (all 4 teams played 3 matches)
    const grpLetter = team.group;
    const groupFinished = groups[grpLetter].every(t => t.mp === 3);
    
    // Default status is in-progress
    team.status = 'in-progress';
    
    if (groupFinished) {
      if (team.groupPos === 1 || team.groupPos === 2) {
        team.status = 'qualified-direct';
      } else if (team.groupPos === 4) {
        team.status = 'eliminated';
      }
    }
    
    // Sort into lists for final ranking output
    if (team.groupPos === 1) firstPlaceTeams.push(team);
    else if (team.groupPos === 2) secondPlaceTeams.push(team);
    else if (team.groupPos === 3) thirdPlaceTeams.push(team);
    else if (team.groupPos === 4) fourthPlaceTeams.push(team);
  });
  
  // 3. Rank Third-Place Teams against each other
  thirdPlaceTeams.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    if (b.w !== a.w) return b.w - a.w;
    return a.group.localeCompare(b.group); // Group letter fallback
  });
  
  // Only allocate wildcard qualifiers if all groups have completed playing!
  thirdPlaceTeams.forEach((team, idx) => {
    const grpLetter = team.group;
    const groupFinished = groups[grpLetter].every(t => t.mp === 3);
    
    if (groupFinished) {
      if (allGroupsFinished) {
        if (idx < 8) {
          team.status = 'qualified-wildcard';
        } else {
          team.status = 'eliminated';
        }
      }
    }
  });
  
  // 4. Assemble Unified Standings array based on selected view
  // Sort First, Second, Third, and Fourth place groups internally to create the leaderboard
  firstPlaceTeams.sort(sortCompareGlobal);
  secondPlaceTeams.sort(sortCompareGlobal);
  thirdPlaceTeams.sort(sortCompareGlobal);
  fourthPlaceTeams.sort(sortCompareGlobal);
  
  standings = {
    // Tournament Rank displays structured tiers
    rank: [...firstPlaceTeams, ...secondPlaceTeams, ...thirdPlaceTeams, ...fourthPlaceTeams],
    // Pure Global displays strict points ranking
    pure: [...allTeams].sort(sortCompareGlobal)
  };
  
  renderStandings();
  renderNormalView();
  renderTournamentStats(thirdPlaceTeams, allTeams);
}

// Strict global sort helper
function sortCompareGlobal(a, b) {
  if (b.pts !== a.pts) return b.pts - a.pts;
  if (b.gd !== a.gd) return b.gd - a.gd;
  if (b.gf !== a.gf) return b.gf - a.gf;
  if (b.w !== a.w) return b.w - a.w;
  return a.name.localeCompare(b.name);
}

// ----------------------------------------------------
// UI Render Engine
// ----------------------------------------------------

function renderStandings() {
  const tbody = document.getElementById('standingsBody');
  tbody.innerHTML = '';
  
  const currentList = standings[sortMode] || [];
  
  // Apply Search Query & Filter badges
  const filteredList = currentList.filter(team => {
    // Check Search
    if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Check Filter Category
    if (currentFilter === 'all') return true;
    if (currentFilter === 'qualified') return team.status === 'qualified-direct' || team.status === 'qualified-wildcard';
    if (currentFilter === 'third-place') return team.groupPos === 3;
    if (currentFilter === 'eliminated') return team.status === 'eliminated';
    
    // Check Group letter A-L
    return team.group === currentFilter;
  });
  
  if (filteredList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="12" style="text-align: center; padding: 30px; color: var(--text-muted);">No teams match the search/filter criteria.</td></tr>`;
    return;
  }
  
  filteredList.forEach((team, idx) => {
    // Create class name for highlighting
    let rowClass = '';
    let statusText = 'In Progress';
    let statusBadgeClass = 'in-progress';
    
    if (team.status === 'qualified-direct') {
      rowClass = 'row-q-direct';
      statusText = 'Qualified (Top 2)';
      statusBadgeClass = 'q-direct';
    } else if (team.status === 'qualified-wildcard') {
      rowClass = 'row-q-wildcard';
      statusText = 'Qualified (WC)';
      statusBadgeClass = 'q-wildcard';
    } else if (team.status === 'eliminated') {
      rowClass = 'row-eliminated';
      statusText = 'Eliminated';
      statusBadgeClass = 'eliminated';
    } else {
      // Status is in-progress
      if (team.groupPos === 1) {
        statusText = '1st in Group';
      } else if (team.groupPos === 2) {
        statusText = '2nd in Group';
      } else if (team.groupPos === 3) {
        statusText = '3rd (Pending)';
        statusBadgeClass = 'pending-wc';
      } else {
        statusText = '4th in Group';
      }
    }
    
    // Resolve overall rank index in the displayed list
    const rankIndex = sortMode === 'pure' ? (standings.pure.indexOf(team) + 1) : (idx + 1);
    
    const tr = document.createElement('tr');
    tr.className = rowClass;
    tr.innerHTML = `
      <td class="col-rank">${rankIndex}</td>
      <td class="col-team">
        <div class="team-badge-cell">
          <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="24" height="16">
          <span class="team-name">${team.name}</span>
        </div>
      </td>
      <td class="col-group">${team.group}</td>
      <td class="col-num">${team.mp}</td>
      <td class="col-num">${team.w}</td>
      <td class="col-num">${team.d}</td>
      <td class="col-num">${team.l}</td>
      <td class="col-num">${team.gf}</td>
      <td class="col-num">${team.ga}</td>
      <td class="col-num">${team.gd > 0 ? '+' + team.gd : team.gd}</td>
      <td class="col-pts">${team.pts}</td>
      <td class="col-status"><span class="status-badge ${statusBadgeClass}">${statusText}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

function renderMatches() {
  const matchesList = document.getElementById('matchesList');
  const selectedMatchday = document.getElementById('selectMatchday').value;
  
  matchesList.innerHTML = '';
  
  // Filter matches based on selected matchday
  const filteredMatches = matches.filter(m => {
    if (selectedMatchday === 'all') return true;
    return m.round === selectedMatchday;
  });
  
  if (filteredMatches.length === 0) {
    matchesList.innerHTML = `<div class="matches-loading" style="color: var(--text-muted);">No matches scheduled or played for this selection.</div>`;
    return;
  }
  
  // Group matches by date/round for cleaner visual hierarchy
  let currentGroupHeader = '';
  
  filteredMatches.forEach(m => {
    const formattedDate = new Date(m.date + 'T00:00:00').toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const headerText = `${m.round} - ${formattedDate}`;
    
    if (headerText !== currentGroupHeader) {
      currentGroupHeader = headerText;
      const headerDiv = document.createElement('div');
      headerDiv.className = 'matchday-group-header';
      headerDiv.textContent = headerText;
      matchesList.appendChild(headerDiv);
    }
    
    const flag1Url = TEAM_FLAG_CODES[m.team1] ? `https://flagcdn.com/w40/${TEAM_FLAG_CODES[m.team1]}.png` : 'https://flagcdn.com/w40/un.png';
    const flag2Url = TEAM_FLAG_CODES[m.team2] ? `https://flagcdn.com/w40/${TEAM_FLAG_CODES[m.team2]}.png` : 'https://flagcdn.com/w40/un.png';
    
    const card = document.createElement('div');
    card.className = 'match-card';
    
    let scoreSection = `<span class="match-vs">vs</span>`;
    let winner1 = '';
    let winner2 = '';
    
    if (m.score && m.score.ft) {
      const [s1, s2] = m.score.ft;
      if (s1 > s2) winner1 = 'winner';
      if (s2 > s1) winner2 = 'winner';
      
      scoreSection = `
        <span class="match-score-num ${winner1}">${s1}</span>
        <span class="match-vs">-</span>
        <span class="match-score-num ${winner2}">${s2}</span>
      `;
    }
    
    card.innerHTML = `
      <div class="match-meta">
        <span class="match-group-tag">${m.group || 'Group Stage'}</span>
        <span class="match-time">${m.time || ''}</span>
      </div>
      <div class="match-score-row">
        <div class="match-team team-left">
          <span class="team-name">${m.team1}</span>
          <img class="team-flag match-team-flag" src="${flag1Url}" alt="${m.team1} flag" width="20" height="13">
        </div>
        <div class="match-score-area">
          ${scoreSection}
        </div>
        <div class="match-team team-right">
          <img class="team-flag match-team-flag" src="${flag2Url}" alt="${m.team2} flag" width="20" height="13">
          <span class="team-name">${m.team2}</span>
        </div>
      </div>
      <div class="match-venue">${m.ground || 'Host Venue'}</div>
    `;
    matchesList.appendChild(card);
  });
}

function renderStats() {
  let played = 0;
  let goals = 0;
  let qualifiedCount = 0;
  
  matches.forEach(m => {
    if (m.score && m.score.ft) {
      played++;
      goals += m.score.ft[0] + m.score.ft[1];
    }
  });
  
  if (standings.pure) {
    standings.pure.forEach(team => {
      if (team.status === 'qualified-direct' || team.status === 'qualified-wildcard') {
        qualifiedCount++;
      }
    });
  }
  
  document.getElementById('statMatches').textContent = played;
  document.getElementById('statGoals').textContent = goals;
  document.getElementById('statAvgGoals').textContent = played > 0 ? (goals / played).toFixed(2) : '0.00';
  document.getElementById('statQualified').textContent = `${qualifiedCount} / 32`;
}

function showErrorState() {
  const tbody = document.getElementById('standingsBody');
  tbody.innerHTML = `<tr><td colspan="12" class="table-loading" style="color: var(--eliminated);">Offline: Could not fetch standings. Please check connection.</td></tr>`;
  
  const matchesList = document.getElementById('matchesList');
  matchesList.innerHTML = `<div class="matches-loading" style="color: var(--eliminated);">Offline: Could not load fixtures.</div>`;
}

function renderNormalView() {
  const container = document.getElementById('groupsGridContainer');
  container.innerHTML = '';
  
  const groups = {};
  standings.rank.forEach(team => {
    if (!groups[team.group]) groups[team.group] = [];
    groups[team.group].push(team);
  });
  
  const alphabet = 'ABCDEFGHIJKL'.split('');
  alphabet.forEach(letter => {
    const groupTeams = groups[letter] || [];
    groupTeams.sort((a, b) => a.groupPos - b.groupPos);
    
    const card = document.createElement('div');
    card.className = 'group-card';
    
    let tableRows = '';
    groupTeams.forEach(team => {
      let rowClass = '';
      if (team.status === 'qualified-direct') rowClass = 'mini-q-direct';
      else if (team.status === 'qualified-wildcard') rowClass = 'mini-q-wildcard';
      else if (team.status === 'eliminated') rowClass = 'mini-eliminated';
      
      tableRows += `
        <tr class="${rowClass}">
          <td class="mini-col-rank">${team.groupPos}</td>
          <td class="mini-col-team">
            <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
            <span class="team-name">${team.name}</span>
          </td>
          <td class="mini-col-num">${team.mp}</td>
          <td class="mini-col-num">${team.gd > 0 ? '+' + team.gd : team.gd}</td>
          <td class="mini-col-pts">${team.pts}</td>
        </tr>
      `;
    });
    
    card.innerHTML = `
      <div class="group-card-header">Group ${letter}</div>
      <table class="mini-standings-table">
        <thead>
          <tr>
            <th class="mini-col-rank">#</th>
            <th class="mini-col-team">Team</th>
            <th class="mini-col-num">MP</th>
            <th class="mini-col-num">GD</th>
            <th class="mini-col-pts">PTS</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
    container.appendChild(card);
  });
}

function renderTournamentStats(thirdPlaceTeams, allTeams) {
  const sidebar = document.getElementById('tournamentStatsSidebar');
  if (!sidebar) return;
  
  // 1. Render Wildcard Tracker (3rd Place Standings)
  let wildcardRows = '';
  thirdPlaceTeams.forEach((team, idx) => {
    let rowClass = '';
    
    if (team.status === 'qualified-wildcard') {
      rowClass = 'row-q-wildcard';
    } else if (team.status === 'eliminated') {
      rowClass = 'row-eliminated';
    } else {
      if (idx < 8) {
        rowClass = 'row-q-wildcard';
      }
    }
    
    wildcardRows += `
      <tr class="${rowClass}">
        <td>${idx + 1}</td>
        <td>
          <div class="team-badge-cell">
            <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
            <span>${team.name}</span>
          </div>
        </td>
        <td style="text-align: center;">${team.group}</td>
        <td style="text-align: center;">${team.gd > 0 ? '+' + team.gd : team.gd}</td>
        <td style="text-align: center; font-weight: 700;">${team.pts}</td>
      </tr>
    `;
  });
  
  const wildcardSection = `
    <div class="stats-section-card">
      <div class="stats-section-title">Wildcard Tracker (3rd Place)</div>
      <table class="sidebar-table">
        <thead>
          <tr>
            <th style="width: 30px;">#</th>
            <th>Team</th>
            <th style="text-align: center; width: 40px;">Grp</th>
            <th style="text-align: center; width: 40px;">GD</th>
            <th style="text-align: center; width: 40px;">PTS</th>
          </tr>
        </thead>
        <tbody>
          ${wildcardRows}
        </tbody>
      </table>
    </div>
  `;
  
  // 2. Render Tournament Leaders (Top/Worst Attack and Top/Worst Defense)
  const topAttacks = [...allTeams]
    .sort((a, b) => b.gf - a.gf || a.name.localeCompare(b.name))
    .slice(0, 3);
    
  const worstAttacks = [...allTeams]
    .filter(t => t.mp > 0)
    .sort((a, b) => a.gf - b.gf || b.mp - a.mp || a.name.localeCompare(b.name))
    .slice(0, 3);
    
  const bestDefenses = [...allTeams]
    .filter(t => t.mp > 0)
    .sort((a, b) => a.ga - b.ga || b.mp - a.mp || a.name.localeCompare(b.name))
    .slice(0, 3);
    
  const worstDefenses = [...allTeams]
    .filter(t => t.mp > 0)
    .sort((a, b) => b.ga - a.ga || a.mp - b.mp || a.name.localeCompare(b.name))
    .slice(0, 3);
    
  let attackHTML = '';
  topAttacks.forEach((team, idx) => {
    const icon = idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉';
    attackHTML += `
      <div class="leader-team-item">
        <div class="leader-team-info">
          <span>${icon}</span>
          <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
          <span>${team.name}</span>
        </div>
        <span class="leader-value">${team.gf} GF</span>
      </div>
    `;
  });
  if (topAttacks.length === 0) {
    attackHTML = `<div style="font-size: 0.8rem; color: var(--text-muted);">No goals scored yet.</div>`;
  }
  
  let worstAttackHTML = '';
  worstAttacks.forEach((team, idx) => {
    const icon = idx === 0 ? '⚠️' : idx === 1 ? '🔸' : '🔹';
    worstAttackHTML += `
      <div class="leader-team-item">
        <div class="leader-team-info">
          <span>${icon}</span>
          <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
          <span>${team.name}</span>
        </div>
        <span class="leader-value" style="color: var(--eliminated);">${team.gf} GF (${team.mp} MP)</span>
      </div>
    `;
  });
  if (worstAttacks.length === 0) {
    worstAttackHTML = `<div style="font-size: 0.8rem; color: var(--text-muted);">No matches played yet.</div>`;
  }
  
  let defenseHTML = '';
  bestDefenses.forEach((team, idx) => {
    const icon = idx === 0 ? '🏆' : idx === 1 ? '🥈' : '🥉';
    defenseHTML += `
      <div class="leader-team-item">
        <div class="leader-team-info">
          <span>${icon}</span>
          <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
          <span>${team.name}</span>
        </div>
        <span class="leader-value">${team.ga} GA (${team.mp} MP)</span>
      </div>
    `;
  });
  if (bestDefenses.length === 0) {
    defenseHTML = `<div style="font-size: 0.8rem; color: var(--text-muted);">No matches played yet.</div>`;
  }
  
  let worstDefenseHTML = '';
  worstDefenses.forEach((team, idx) => {
    const icon = idx === 0 ? '⚠️' : idx === 1 ? '🔸' : '🔹';
    worstDefenseHTML += `
      <div class="leader-team-item">
        <div class="leader-team-info">
          <span>${icon}</span>
          <img class="team-flag" src="${team.flag}" alt="${team.name} flag" width="18" height="12">
          <span>${team.name}</span>
        </div>
        <span class="leader-value" style="color: var(--eliminated);">${team.ga} GA (${team.mp} MP)</span>
      </div>
    `;
  });
  if (worstDefenses.length === 0) {
    worstDefenseHTML = `<div style="font-size: 0.8rem; color: var(--text-muted);">No matches played yet.</div>`;
  }
  
  const leadersSection = `
    <div class="stats-section-card">
      <div class="stats-section-title">Tournament Leaders</div>
      <div class="leaders-container">
        <div class="leader-row">
          <span class="leader-label">🔥 Top Attacks (Goals For)</span>
          <div class="leader-teams">
            ${attackHTML}
          </div>
        </div>
        <div class="leader-row">
          <span class="leader-label">💨 Worst Attacks (Goals For)</span>
          <div class="leader-teams">
            ${worstAttackHTML}
          </div>
        </div>
        <div class="leader-row">
          <span class="leader-label">🛡️ Best Defenses (Goals Against)</span>
          <div class="leader-teams">
            ${defenseHTML}
          </div>
        </div>
        <div class="leader-row">
          <span class="leader-label">🚨 Worst Defenses (Goals Against)</span>
          <div class="leader-teams">
            ${worstDefenseHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // 3. Render Top Goalscorers
  let scorerRows = '';
  topGoalscorers.slice(0, 5).forEach((player, idx) => {
    const flagUrl = TEAM_FLAG_CODES[player.team] ? `https://flagcdn.com/w40/${TEAM_FLAG_CODES[player.team]}.png` : 'https://flagcdn.com/w40/un.png';
    scorerRows += `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <div style="font-weight: 600;">${player.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; margin-top: 2px;">
            <img class="team-flag" src="${flagUrl}" alt="${player.team} flag" width="14" height="9" style="border-radius: 1px;">
            <span>${player.team}</span>
          </div>
        </td>
        <td style="text-align: center; font-size: 1.05rem; font-weight: 700; color: var(--accent-gold);">${player.goals}</td>
      </tr>
    `;
  });
  
  if (topGoalscorers.length === 0) {
    scorerRows = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); padding: 12px;">No goals scored yet.</td></tr>`;
  }
  
  const goalscorersSection = `
    <div class="stats-section-card">
      <div class="stats-section-title">Top Goalscorers</div>
      <table class="sidebar-table">
        <thead>
          <tr>
            <th style="width: 30px;">#</th>
            <th>Player</th>
            <th style="text-align: center; width: 60px;">Goals</th>
          </tr>
        </thead>
        <tbody>
          ${scorerRows}
        </tbody>
      </table>
    </div>
  `;
  
  // 4. Render Highest Scoring Groups
  const groupStats = {};
  const alphabet = 'ABCDEFGHIJKL'.split('');
  alphabet.forEach(letter => {
    groupStats[letter] = { goals: 0, mp: 0 };
  });
  
  matches.forEach(m => {
    if (m.score && m.score.ft) {
      const teamData = TEAMS_DATA[m.team1];
      const letter = teamData ? teamData.group : null;
      if (letter && groupStats[letter]) {
        groupStats[letter].goals += m.score.ft[0] + m.score.ft[1];
        groupStats[letter].mp += 1;
      }
    }
  });
  
  const sortedGroups = alphabet.map(letter => ({
    group: letter,
    goals: groupStats[letter].goals,
    mp: groupStats[letter].mp,
    avg: groupStats[letter].mp > 0 ? (groupStats[letter].goals / groupStats[letter].mp).toFixed(2) : '0.00'
  })).sort((a, b) => b.goals - a.goals || b.avg - a.avg || a.group.localeCompare(b.group));
  
  let groupRows = '';
  sortedGroups.slice(0, 5).forEach((g, idx) => {
    groupRows += `
      <tr>
        <td>${idx + 1}</td>
        <td style="font-weight: 600;">Group ${g.group}</td>
        <td style="text-align: center;">${g.goals}</td>
        <td style="text-align: center; color: var(--text-secondary);">${g.avg}</td>
      </tr>
    `;
  });
  
  const groupsSection = `
    <div class="stats-section-card">
      <div class="stats-section-title">Highest Scoring Groups</div>
      <table class="sidebar-table">
        <thead>
          <tr>
            <th style="width: 30px;">#</th>
            <th>Group</th>
            <th style="text-align: center; width: 60px;">Goals</th>
            <th style="text-align: center; width: 80px;">Avg/Match</th>
          </tr>
        </thead>
        <tbody>
          ${groupRows}
        </tbody>
      </table>
    </div>
  `;
  
  sidebar.innerHTML = wildcardSection + leadersSection + goalscorersSection + groupsSection;
}

// ----------------------------------------------------
// UI Control Listeners
// ----------------------------------------------------

function setupUIEventListeners() {
  // Tab Switching
  const btnTabUnified = document.getElementById('btnTabUnified');
  const btnTabNormal = document.getElementById('btnTabNormal');
  const unifiedTableWrapper = document.getElementById('unifiedTableWrapper');
  const normalViewLayout = document.getElementById('normalViewLayout');
  const sortToggleContainer = document.getElementById('sortToggleContainer');
  const filtersBar = document.getElementById('filtersBar');
  
  btnTabUnified.addEventListener('click', () => {
    btnTabUnified.classList.add('active');
    btnTabNormal.classList.remove('active');
    
    unifiedTableWrapper.style.display = 'block';
    filtersBar.style.display = 'block';
    sortToggleContainer.style.display = 'flex';
    normalViewLayout.style.display = 'none';
  });
  
  btnTabNormal.addEventListener('click', () => {
    btnTabNormal.classList.add('active');
    btnTabUnified.classList.remove('active');
    
    unifiedTableWrapper.style.display = 'none';
    filtersBar.style.display = 'none';
    sortToggleContainer.style.display = 'none';
    normalViewLayout.style.display = 'flex';
  });

  // Sort view toggles
  const btnRank = document.getElementById('btnSortRank');
  const btnPure = document.getElementById('btnSortPure');
  
  btnRank.addEventListener('click', () => {
    sortMode = 'rank';
    btnRank.classList.add('active');
    btnPure.classList.remove('active');
    renderStandings();
  });
  
  btnPure.addEventListener('click', () => {
    sortMode = 'pure';
    btnPure.classList.add('active');
    btnRank.classList.remove('active');
    renderStandings();
  });
  
  // Search bar
  const searchInput = document.getElementById('teamSearch');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderStandings();
  });
  
  // Filter badges
  const filterBadges = document.querySelectorAll('.badge-filter');
  filterBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      filterBadges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
      currentFilter = badge.getAttribute('data-filter');
      renderStandings();
    });
  });
  
  // Populate group letters A to L filter
  const groupFilterContainer = document.getElementById('groupFilterContainer');
  const alphabet = 'ABCDEFGHIJKL'.split('');
  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'badge-filter';
    btn.textContent = letter;
    btn.setAttribute('data-filter', letter);
    btn.addEventListener('click', () => {
      // Deactivate all others
      document.querySelectorAll('.badge-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = letter;
      renderStandings();
    });
    groupFilterContainer.appendChild(btn);
  });
  
  // Matchday filter selector
  const selectMatchday = document.getElementById('selectMatchday');
  selectMatchday.addEventListener('change', () => {
    renderMatches();
  });
  
  // Cache Refresh Button listener
  const btnRefreshCache = document.getElementById('btnRefreshCache');
  if (btnRefreshCache) {
    btnRefreshCache.addEventListener('click', async () => {
      // Clear cache
      localStorage.removeItem('fifa_2026_matches_data');
      localStorage.removeItem('fifa_2026_matches_cache_time');
      
      // Animate rotation
      btnRefreshCache.style.transition = 'transform 0.5s ease-in-out';
      btnRefreshCache.style.transform = 'rotate(360deg)';
      
      // Fetch fresh data
      await fetchTournamentData();
      
      // Reset rotation style after animation
      setTimeout(() => {
        btnRefreshCache.style.transform = '';
        btnRefreshCache.style.transition = 'transform 0.2s ease-in-out';
      }, 500);
    });
  }
}

// ----------------------------------------------------
// Initialize
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupUIEventListeners();
  fetchTournamentData();
});
