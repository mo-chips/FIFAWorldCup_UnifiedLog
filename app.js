// App State & Data Definitions

const API_KEY = 'c7bec1aaf977d7760a81c0371309f6b8';
const APISPORTS_URL = 'https://v3.football.api-sports.io';
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
  updateApiStatus('warning', 'Connecting to API-Football...');
  
  try {
    // Attempt fetching standings directly from API-Football
    const response = await fetch(`${APISPORTS_URL}/standings?league=1&season=2026`, {
      method: 'GET',
      headers: {
        'x-apisports-key': API_KEY
      }
    });
    
    const data = await response.json();
    
    // Check if API-Football returned a plan restriction error
    if (data.errors && data.errors.plan) {
      console.warn('API-Football restriction:', data.errors.plan);
      throw new Error(`Plan restriction: ${data.errors.plan}`);
    }
    
    if (data.response && data.response.length > 0) {
      updateApiStatus('success', 'Connected to Live API-Football Feed');
      processApiFootballData(data.response[0].league.standings);
      return;
    }
    
    throw new Error('No standing response from API-Football');
  } catch (apiSportsErr) {
    console.log('API-Football failed or restricted. Falling back to OpenFootball JSON Database...', apiSportsErr);
    updateApiStatus('warning', 'API restricted. Connecting to OpenFootball Mirror...');
    
    try {
      const response = await fetch(OPENFOOTBALL_URL);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const data = await response.json();
      
      updateApiStatus('success', 'Connected to OpenFootball Data Feed');
      processOpenFootballData(data.matches);
    } catch (openFootballErr) {
      console.error('All data sources failed:', openFootballErr);
      updateApiStatus('error', 'All Data Sources Offline');
      showErrorState();
    }
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
// Data Processing: API-Football (Standings returned directly)
// ----------------------------------------------------
function processApiFootballData(apiGroups) {
  // Clear and rebuild teams stats map
  const teamStats = {};
  for (let team in TEAMS_DATA) {
    teamStats[team] = createEmptyStatObject(team);
  }
  
  // API Football returns group array of arrays
  apiGroups.forEach(groupList => {
    groupList.forEach(item => {
      const normalizedName = normalizeTeamName(item.team.name);
      if (teamStats[normalizedName]) {
        teamStats[normalizedName].mp = item.all.played || 0;
        teamStats[normalizedName].w = item.all.win || 0;
        teamStats[normalizedName].d = item.all.draw || 0;
        teamStats[normalizedName].l = item.all.lose || 0;
        teamStats[normalizedName].gf = item.all.goals.for || 0;
        teamStats[normalizedName].ga = item.all.goals.against || 0;
        teamStats[normalizedName].gd = item.goalsDiff !== undefined ? item.goalsDiff : (item.all.goals.for - item.all.goals.against);
        teamStats[normalizedName].pts = item.points || 0;
      }
    });
  });
  
  // Calculate standings from teams
  computeStandingsFromStats(teamStats);
  
  // Also try to fetch matches for schedule sidebar from API-Football
  fetchMatchesFromApiFootball();
}

async function fetchMatchesFromApiFootball() {
  try {
    const res = await fetch(`${APISPORTS_URL}/fixtures?league=1&season=2026`, {
      headers: { 'x-apisports-key': API_KEY }
    });
    const data = await res.json();
    if (data.response && data.response.length > 0) {
      matches = data.response.map(item => {
        return {
          round: item.league.round.replace('Group Stage - ', 'Matchday '),
          date: item.fixture.date.split('T')[0],
          time: new Date(item.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          team1: normalizeTeamName(item.teams.home.name),
          team2: normalizeTeamName(item.teams.away.name),
          score: item.goals.home !== null ? { ft: [item.goals.home, item.goals.away] } : null,
          group: TEAMS_DATA[normalizeTeamName(item.teams.home.name)]?.group ? `Group ${TEAMS_DATA[normalizeTeamName(item.teams.home.name)].group}` : '',
          ground: item.fixture.venue.city
        };
      });
      renderMatches();
      renderStats();
    }
  } catch (err) {
    console.warn('Could not fetch matches from API-Football:', err);
  }
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
  });
  
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

// ----------------------------------------------------
// UI Control Listeners
// ----------------------------------------------------

function setupUIEventListeners() {
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
}

// ----------------------------------------------------
// Initialize
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  setupUIEventListeners();
  fetchTournamentData();
});
