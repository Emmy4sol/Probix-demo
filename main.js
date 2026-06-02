// Navigation
function navigateTo(page) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('nav-active'));
    const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(link => 
        link.getAttribute('onclick').includes(`'${page}'`));
    if (activeLink) activeLink.classList.add('nav-active');

    const main = document.getElementById('mainContent');
    main.innerHTML = getPageContent(page);
    if (page === 'home') {
        mountHeroParallax();
    }
}

function getPageContent(page) {
    if (page === 'home') return homePage();
    if (page === 'explore') return explorePage();
    if (page === 'forecasts') return forecastsPage();
    if (page === 'markets') return marketsPage();
    if (page === 'leaderboard') return leaderboardPage();
    if (page === 'watchlist') return watchlistPage();
    if (page === 'insights') return insightsPage();
    return homePage();
}

function mountHeroParallax() {
    if (window.renderHeroParallax) {
        window.renderHeroParallax();
    }
}

// HOME PAGE
function homePage() {
    return `
    <div class="p-8">
        <div class="map-bg rounded-3xl h-96 p-10 relative mb-10 overflow-hidden" style="background: linear-gradient(135deg, #1e3a8a, #0f172a);">
            <div id="hero-root" class="absolute inset-0 pointer-events-none"></div>
            <div class="relative z-10">
                <h1 class="text-6xl font-bold leading-none">The future isn't guessed.<br>It's <span class="text-blue-400">forecasted</span>.</h1>
                <p class="text-lg text-zinc-300 mt-4">Join 42,831 Africans forecasting what matters most.</p>
                <div class="flex gap-4 mt-6">
                    <button class="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl font-semibold transition">Explore Trending</button>
                    <button class="border border-zinc-600 hover:border-zinc-400 px-6 py-3 rounded-2xl font-semibold transition">How Probix works</button>
                </div>
                <div class="absolute bottom-10 right-10 bg-black/70 glass p-6 rounded-3xl max-w-xs">
                    <div class="text-emerald-400 text-6xl font-mono">72%</div>
                    <p class="text-xl">Naira below ₦2,000/$ before Dec 2026</p>
                </div>
            </div>
        </div>

        <div class="mb-10">
            <h2 class="text-3xl font-bold mb-6 flex items-center justify-between">
                <div class="flex items-center gap-3"><span class="text-orange-400">🔥</span> Trending Now</div>
                <a href="#" onclick="navigateTo('forecasts')" class="text-blue-400 text-sm hover:text-blue-300">View all</a>
            </h2>
            <div class="flex gap-3 mb-6 overflow-x-auto pb-2">
                <button class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">All</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Politics</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Economy</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Sports</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Tech</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Entertainment</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Crypto</button>
                <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm font-semibold transition">Energy</button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                ${createForecastCard("Will the Naira trade below ₦2,000/$?", "Economy", "72%", "emerald", "3.1k", true)}
                ${createForecastCard("Will Peter Obi run in the 2027 presidential election?", "Politics", "61%", "purple", "1.9k", true)}
                ${createForecastCard("Will Nigeria qualify for the 2026 FIFA World Cup?", "Sports", "78%", "orange", "4.7k", true)}
                ${createForecastCard("Will Flutterwave hit $5B valuation before mid-2026?", "Tech", "55%", "blue", "1.1k", true)}
            </div>
        </div>

        <div class="mb-10">
            <h2 class="text-3xl font-bold mb-6 flex items-center justify-between">
                Biggest Movers <a href="#" class="text-blue-400 text-sm hover:text-blue-300">View all</a>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${createMoverCard("₦ Macro Says: BTC to 6x in 2 years", "📈 84%", "+12.4%", "green")}
                ${createMoverCard("USD will rise above ₦1,800 this month", "📉 23%", "-8.3%", "red")}
                ${createMoverCard("Blackouts reduce by 50% in Q1 2026", "🟢 65%", "+6.1%", "green")}
                ${createMoverCard("Bitcoin above $120k before end of 2025", "⚫ 47%", "+5.3%", "green")}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h2 class="text-2xl font-bold mb-6">Top Analysts</h2>
                <div class="space-y-4">
                    ${createAnalystCard("Probix Research", "Team", "91%", "1.6k")}
                    ${createAnalystCard("Amaka Eze", "Analyst", "88%", "1.2k")}
                    ${createAnalystCard("Tunde Yomi", "Analyst", "85%", "891")}
                </div>
            </div>
            <div>
                <h2 class="text-2xl font-bold mb-6">Probix Insights</h2>
                <div class="space-y-4">
                    <div class="glass p-4 rounded-2xl border border-zinc-700">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">📊</span>
                            <div>
                                <p class="font-semibold">72% of forecasters are Bullish</p>
                                <p class="text-sm text-zinc-400">Market confidence surge (up 8% week-on-week)</p>
                            </div>
                        </div>
                    </div>
                    <div class="glass p-4 rounded-2xl border border-zinc-700">
                        <div class="flex items-start gap-3">
                            <span class="text-2xl">📈</span>
                            <div>
                                <p class="font-semibold">Inflation report: FX policy impact</p>
                                <p class="text-sm text-zinc-400">AI Insight from 240+ analyst reports</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// EXPLORE PAGE
function explorePage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8">Explore</h1>
        <p class="text-zinc-400 mb-8">Discover markets across all major categories</p>
        
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            ${createCategoryCard("All Categories", "📊")}
            ${createCategoryCard("Trending", "🔥")}
            ${createCategoryCard("New", "✨")}
            ${createCategoryCard("Ending Soon", "⏰")}
            ${createCategoryCard("Hot & Contested", "🌡️")}
        </div>

        <h2 class="text-2xl font-bold mb-6">Popular Topics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${createForecastCard("Will Peter Obi run in the 2027 presidential election?", "Politics", "61%", "purple", "1.9k", true)}
            ${createForecastCard("Will Nigeria qualify for the 2026 FIFA World Cup?", "Sports", "78%", "orange", "4.7k", true)}
            ${createForecastCard("Will Flutterwave hit $5B valuation before mid-2026?", "Tech", "55%", "blue", "1.1k", true)}
            ${createForecastCard("Will the Naira trade below ₦2,000/$?", "Economy", "72%", "emerald", "3.1k", true)}
            ${createForecastCard("Bitcoin above $100k by end of 2025?", "Crypto", "85%", "orange", "5.2k", true)}
            ${createForecastCard("Solar energy adoption to exceed 30% by 2027?", "Energy", "68%", "yellow", "2.3k", true)}
        </div>
    </div>`;
}

// FORECASTS PAGE
function forecastsPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-2">Forecasts</h1>
        <p class="text-zinc-400 mb-8">Your personal forecast feed</p>

        <div class="flex gap-4 mb-8">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold">My Forecasts</button>
            <button class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full font-semibold transition">Following</button>
        </div>

        <div class="space-y-4">
            ${createForecastRow("Will Peter Obi run in 2027?", "Politics", "61%", "purple", true)}
            ${createForecastRow("Egg crate below ₦4,500 by July?", "Economy", "72%", "emerald", false)}
            ${createForecastRow("Nigeria qualify for 2026 World Cup?", "Sports", "78%", "orange", true)}
            ${createForecastRow("Flutterwave hit $5B valuation?", "Tech", "55%", "blue", false)}
            ${createForecastRow("Bitcoin above $100k by year-end?", "Crypto", "85%", "orange", true)}
        </div>
    </div>`;
}

// MARKETS PAGE
function marketsPage() {
    return `
    <div class="p-8">
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-4xl font-bold">Markets</h1>
                <p class="text-zinc-400">Real-time prediction markets</p>
            </div>
            <div class="flex gap-2">
                <select class="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white">
                    <option>Sort by Change</option>
                    <option>Sort by Volume</option>
                    <option>Sort by Closing Date</option>
                </select>
                <select class="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-white">
                    <option>All Markets</option>
                    <option>Politics</option>
                    <option>Economy</option>
                    <option>Sports</option>
                    <option>Tech</option>
                </select>
            </div>
        </div>

        <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            <table class="w-full text-sm">
                <thead class="border-b border-zinc-800">
                    <tr class="bg-zinc-800/50">
                        <th class="px-6 py-4 text-left font-semibold">Market</th>
                        <th class="px-6 py-4 text-center font-semibold">YES</th>
                        <th class="px-6 py-4 text-center font-semibold">Change</th>
                        <th class="px-6 py-4 text-center font-semibold">Volume</th>
                        <th class="px-6 py-4 text-right font-semibold">Closes</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                    ${createMarketRow("Will Peter Obi run in 2027?", "Politics", "61%", "+2.1%", "1.6k", "Jan 1, 2027")}
                    ${createMarketRow("Naira below ₦2,000/$ by Dec?", "Economy", "72%", "+4.3%", "3.2k", "Dec 31, 2026")}
                    ${createMarketRow("Nigeria qualify for World Cup?", "Sports", "78%", "-1.2%", "4.7k", "Nov 16, 2026")}
                    ${createMarketRow("Flutterwave hit $5B valuation?", "Tech", "55%", "+6.6%", "1.1k", "Jun 30, 2026")}
                    ${createMarketRow("Bitcoin above $100k by year-end?", "Crypto", "85%", "+5.3%", "5.2k", "Dec 31, 2025")}
                </tbody>
            </table>
        </div>
    </div>`;
}

// LEADERBOARD PAGE
function leaderboardPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-2">Leaderboard</h1>
        <p class="text-zinc-400 mb-8">Top forecasters in Nigeria</p>

        <div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            <table class="w-full text-sm">
                <thead class="border-b border-zinc-800 bg-zinc-800/50">
                    <tr>
                        <th class="px-6 py-4 text-left font-semibold">Rank</th>
                        <th class="px-6 py-4 text-left font-semibold">Forecaster</th>
                        <th class="px-6 py-4 text-center font-semibold">Accuracy</th>
                        <th class="px-6 py-4 text-center font-semibold">XP</th>
                        <th class="px-6 py-4 text-center font-semibold">Followers</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                    ${createLeaderboardRow("1", "🥇 Probix Research", "91%", "247", "89")}
                    ${createLeaderboardRow("2", "👤 Amaka Eze", "88%", "198", "56")}
                    ${createLeaderboardRow("3", "👤 Tunde Yomi", "85%", "156", "42")}
                    ${createLeaderboardRow("4", "👤 Chisom Fox", "82%", "142", "38")}
                    ${createLeaderboardRow("5", "👤 Lexi Shaffer", "78%", "120", "31")}
                </tbody>
            </table>
        </div>
    </div>`;
}

// WATCHLIST PAGE
function watchlistPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8">Watchlist</h1>
        <p class="text-zinc-400 mb-8">Markets you're following</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            ${createForecastCard("Will Peter Obi run in 2027?", "Politics", "61%", "purple", "1.9k", true)}
            ${createForecastCard("Naira below ₦2,000/$ by Dec?", "Economy", "72%", "emerald", "3.2k", true)}
            ${createForecastCard("Nigeria qualify for World Cup?", "Sports", "78%", "orange", "4.7k", true)}
            ${createForecastCard("Flutterwave hit $5B valuation?", "Tech", "55%", "blue", "1.1k", true)}
        </div>
    </div>`;
}

// INSIGHTS PAGE
function insightsPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8">Insights</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div class="glass p-6 rounded-2xl border border-zinc-700">
                <p class="text-sm text-zinc-400 mb-2">Market Insights</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-emerald-400">72%</span>
                    <span class="text-xs">Bullish</span>
                </div>
                <p class="text-xs text-zinc-400 mt-2">+8% week-on-week</p>
            </div>
            <div class="glass p-6 rounded-2xl border border-zinc-700">
                <p class="text-sm text-zinc-400 mb-2">Market Confidence</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-orange-400">68%</span>
                    <span class="text-xs">Average</span>
                </div>
                <p class="text-xs text-zinc-400 mt-2">+2.4% today</p>
            </div>
            <div class="glass p-6 rounded-2xl border border-zinc-700">
                <p class="text-sm text-zinc-400 mb-2">Active Traders</p>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold">12.4k</span>
                    <span class="text-xs">forecasting</span>
                </div>
                <p class="text-xs text-zinc-400 mt-2">+4.2k this week</p>
            </div>
        </div>

        <h2 class="text-2xl font-bold mb-6">Featured Insights</h2>
        <div class="space-y-6">
            <div class="glass p-6 rounded-2xl border border-zinc-700">
                <div class="flex items-start gap-4 mb-4">
                    <span class="text-3xl">📊</span>
                    <div class="flex-1">
                        <h3 class="font-bold mb-2">2025 Election Analysis</h3>
                        <p class="text-sm text-zinc-400 mb-4">Analysis from 420+ analyst forecasts and 8.2M data points</p>
                        <p class="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Read full report →</p>
                    </div>
                </div>
            </div>
            <div class="glass p-6 rounded-2xl border border-zinc-700">
                <div class="flex items-start gap-4 mb-4">
                    <span class="text-3xl">📈</span>
                    <div class="flex-1">
                        <h3 class="font-bold mb-2">Inflation report: FX policy impact</h3>
                        <p class="text-sm text-zinc-400 mb-4">How policy changes affect market predictions</p>
                        <p class="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Read full report →</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

// HELPER FUNCTIONS
function createForecastCard(title, category, percent, color, forecasts, withChart = false) {
    return `
    <div onclick="alert('Opening market: ${title}')" class="bg-zinc-900 rounded-3xl p-6 cursor-pointer card-hover border border-zinc-800 hover:border-zinc-700 transition">
        <div class="flex justify-between mb-4">
            <span class="px-4 py-1 bg-zinc-800 text-xs rounded-full">${category}</span>
            <span class="text-zinc-400 text-xs">${forecasts} forecasts</span>
        </div>
        <p class="font-semibold text-lg leading-tight mb-8">${title}</p>
        <div class="flex items-end justify-between">
            <div class="flex items-end gap-2">
                <span class="text-5xl font-bold text-${color}-400">${percent}</span>
                <span class="text-sm text-zinc-400 mb-1">YES</span>
            </div>
            ${withChart ? '<div class="text-2xl">📈</div>' : ''}
        </div>
    </div>`;
}

function createCategoryCard(name, icon) {
    return `
    <div class="glass p-6 rounded-2xl border border-zinc-700 hover:border-zinc-600 cursor-pointer transition text-center">
        <div class="text-3xl mb-2">${icon}</div>
        <p class="font-semibold">${name}</p>
    </div>`;
}

function createMoverCard(title, percent, change, direction) {
    const changeColor = direction === 'green' ? 'text-emerald-400' : 'text-red-400';
    const changeSymbol = direction === 'green' ? '📈' : '📉';
    return `
    <div class="glass p-6 rounded-2xl border border-zinc-700">
        <div class="flex justify-between items-start mb-4">
            <p class="font-semibold leading-tight flex-1">${title}</p>
            <span class="text-2xl ml-2">${changeSymbol}</span>
        </div>
        <div class="flex justify-between items-end">
            <span class="text-2xl font-bold">${percent}</span>
            <span class="${changeColor} font-semibold">${change}</span>
        </div>
    </div>`;
}

function createAnalystCard(name, role, accuracy, followers) {
    return `
    <div class="glass p-4 rounded-2xl border border-zinc-700 hover:border-zinc-600 cursor-pointer transition">
        <div class="flex items-start justify-between mb-3">
            <div>
                <p class="font-semibold">${name}</p>
                <p class="text-xs text-zinc-400">${role}</p>
            </div>
            <span class="text-sm font-bold text-emerald-400">${accuracy}</span>
        </div>
        <p class="text-xs text-zinc-400">${followers} followers</p>
    </div>`;
}

function createForecastRow(title, category, percent, color, trending) {
    const trendIcon = trending ? '📈' : '📉';
    return `
    <div class="glass p-6 rounded-2xl border border-zinc-700 hover:border-zinc-600 cursor-pointer transition flex justify-between items-center">
        <div class="flex-1">
            <p class="font-semibold mb-2">${title}</p>
            <span class="text-xs bg-zinc-800 px-3 py-1 rounded-full">${category}</span>
        </div>
        <div class="flex items-center gap-6">
            <span class="text-2xl">${trendIcon}</span>
            <span class="text-3xl font-bold text-${color}-400">${percent}</span>
        </div>
    </div>`;
}

function createMarketRow(title, category, percent, change, volume, closes) {
    const changeColor = change.startsWith("+") ? "text-emerald-400" : "text-red-400";
    return `
    <tr class="hover:bg-zinc-800 transition cursor-pointer">
        <td class="px-6 py-4">
            <div class="font-semibold">${title}</div>
            <div class="text-xs text-zinc-400">${category}</div>
        </td>
        <td class="px-6 py-4 text-center">
            <span class="text-2xl font-bold text-emerald-400">${percent}</span>
        </td>
        <td class="px-6 py-4 text-center">
            <span class="${changeColor} font-semibold">${change}</span>
        </td>
        <td class="px-6 py-4 text-center text-zinc-400">${volume}</td>
        <td class="px-6 py-4 text-right text-zinc-400 text-sm">${closes}</td>
    </tr>`;
}

function createLeaderboardRow(rank, name, accuracy, xp, followers) {
    const medal = rank === "1" ? "🥇" : rank === "2" ? "🥈" : "🥉";
    return `
    <tr class="hover:bg-zinc-800 transition cursor-pointer">
        <td class="px-6 py-4 font-bold">${medal}</td>
        <td class="px-6 py-4 font-semibold">${name}</td>
        <td class="px-6 py-4 text-center text-emerald-400 font-bold">${accuracy}</td>
        <td class="px-6 py-4 text-center">${xp}</td>
        <td class="px-6 py-4 text-center">${followers}</td>
    </tr>`;
}

// Initialize
document.getElementById('mainContent').innerHTML = homePage();
mountHeroParallax();
