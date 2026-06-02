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
    if (page === 'politics') return politicsPage();
    if (page === 'sports') return sportsPage();
    if (page === 'entertainment') return entertainmentPage();
    if (page === 'economy') return economyPage();
    if (page === 'weather') return weatherPage();
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
                <h1 class="text-6xl font-bold leading-none">The future isn’t guessed.<br>It’s <span class="text-blue-400">forecasted</span>.</h1>
                <div class="absolute bottom-10 right-10 bg-black/70 glass p-6 rounded-3xl max-w-xs">
                    <div class="text-emerald-400 text-6xl font-mono">74%</div>
                    <p class="text-xl">Naira below ₦2,000/$ before Dec 2026</p>
                </div>
            </div>
        </div>

        <h2 class="text-3xl font-bold mb-6 flex items-center gap-3"><span class="text-orange-400">🔥</span> Trending in Nigeria</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${createForecastCard("Will Peter Obi run in 2027?", "Politics", "61%", "purple", "2.1k")}
            ${createForecastCard("Burna Boy x Wizkid collab before 2027?", "Entertainment", "82%", "pink", "3.4k")}
            ${createForecastCard("Egg crate below ₦4,500 by July?", "Economy", "55%", "emerald", "1.8k")}
        </div>
    </div>`;
}

// OTHER PAGES
function politicsPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8">🇳🇬 Politics Markets</h1>
        <div class="grid grid-cols-2 gap-6">
            ${createForecastCard("Tinubu re-election 2027", "Presidential", "48%", "blue", "12k")}
            ${createForecastCard("Will APC retain Rivers State?", "Gubernatorial", "67%", "amber", "4.9k")}
            <div class="bg-zinc-900 p-6 rounded-3xl">House of Reps seat changes • Quick edit enabled</div>
        </div>
    </div>`;
}

function sportsPage() {
    return `<div class="p-8"><h1 class="text-4xl font-bold mb-8">⚽ Sports</h1><p class="text-xl">EPL, NPFL, UCL, World Cup qualifiers — live markets coming soon.</p></div>`;
}

function entertainmentPage() {
    return `<div class="p-8"><h1 class="text-4xl font-bold mb-8">🎤 Entertainment</h1><p>Album drops, collabs, first-day views predictions.</p></div>`;
}

function economyPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8">🛒 Daily Prices</h1>
        <div class="grid grid-cols-3 gap-6">
            <div class="glass p-6 rounded-3xl">Egg Crate: <span class="text-emerald-400 font-mono">₦4,200</span></div>
            <div class="glass p-6 rounded-3xl">Gas (12.5kg): <span class="text-red-400 font-mono">₦15,200</span></div>
            <div class="glass p-6 rounded-3xl">iPhone 16 Pro: <span class="text-emerald-400 font-mono">₦1.92M</span></div>
        </div>
    </div>`;
}

function weatherPage() {
    return `
    <div class="p-8">
        <h1 class="text-4xl font-bold mb-8 flex items-center gap-3">☀️ Port Harcourt Weather Forecast</h1>
        <div class="glass rounded-3xl p-8">
            <div class="flex justify-between items-center">
                <div>
                    <div class="text-7xl">🌧️</div>
                    <div class="text-5xl font-light">28°C</div>
                    <div class="text-xl">Thunderstorms likely</div>
                </div>
                <div class="text-right">
                    <div>Humidity: 88%</div>
                    <div>Chance of Rain: 70%</div>
                    <div class="text-emerald-400">Updated from Weather Underground</div>
                </div>
            </div>
            <div class="mt-10 grid grid-cols-5 gap-4 text-center">
                <div>Today<br><span class="text-2xl">29°</span></div>
                <div>Tomorrow<br><span class="text-2xl">31°</span></div>
                <div>Sat<br><span class="text-2xl">30°</span></div>
                <div>Sun<br><span class="text-2xl">28°</span></div>
                <div>Mon<br><span class="text-2xl">27°</span></div>
            </div>
        </div>
    </div>`;
}

function createForecastCard(title, category, percent, color, forecasts) {
    return `
    <div onclick="alert('Opening market: ${title}')" class="bg-zinc-900 rounded-3xl p-6 cursor-pointer card-hover border border-zinc-800">
        <div class="flex justify-between mb-4">
            <span class="px-4 py-1 bg-zinc-800 text-xs rounded-full">${category}</span>
            <span class="text-zinc-400 text-xs">${forecasts} forecasts</span>
        </div>
        <p class="font-semibold text-lg leading-tight mb-8">${title}</p>
        <div class="flex items-end gap-4">
            <span class="text-6xl font-bold text-${color}-400">${percent}</span>
            <span class="text-sm text-zinc-400">YES</span>
        </div>
    </div>`;
}

// Initialize
document.getElementById('mainContent').innerHTML = homePage();
mountHeroParallax();
