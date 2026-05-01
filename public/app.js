let currentLang = 'en';
let audioEnabled = false;
let mapsKey = '';
let mapInstance = null;
let directionsService = null;
let directionsRenderer = null;

// DOM Elements
const langToggleBtn = document.getElementById('lang-toggle');
const audioToggleBtn = document.getElementById('audio-toggle');

const chatWidget = document.getElementById('chat-widget');
const chatHeaderBtn = document.getElementById('chat-header-btn');
const closeChatBtn = document.querySelector('.close-chat-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const qrBtns = document.querySelectorAll('.qr-btn');
const readAloudBtns = document.querySelectorAll('.read-aloud-btn');

const locateMeBtn = document.getElementById('locate-me-btn');
const locationStatus = document.getElementById('location-status');
const crowdBanner = document.getElementById('crowd-banner');
const crowdText = document.getElementById('crowd-text');
const mapContainer = document.getElementById('map-container');
const weatherBanner = document.getElementById('weather-banner');
const weatherText = document.getElementById('weather-text');

const generateTimelineBtn = document.getElementById('generate-timeline-btn');
const timelineStatus = document.getElementById('timeline-status');
const dynamicTimelineContainer = document.getElementById('dynamic-timeline-container');

// Initialize
async function init() {
    applyTranslations(currentLang);
    setupEventListeners();
    
    // Fetch configuration from backend securely
    try {
        const res = await fetch('/api/maps-key');
        const data = await res.json();
        mapsKey = data.mapsKey;
        if (mapsKey) loadGoogleMapsScript();
    } catch (e) {
        console.error("Failed to load Maps API key from backend");
    }
}

// Translations
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    document.documentElement.lang = currentLang; // Accessibility: update lang attribute
    applyTranslations(currentLang);
}

function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key]) el.placeholder = t[key];
    });
    langToggleBtn.textContent = lang === 'en' ? translations.en.langToggle : translations.hi.langToggle;
    updateAudioBtnText();
}

// Audio
function toggleAudio() {
    audioEnabled = !audioEnabled;
    document.body.classList.toggle('audio-enabled', audioEnabled);
    audioToggleBtn.classList.toggle('active', audioEnabled);
    if (!audioEnabled) window.speechSynthesis.cancel();
    updateAudioBtnText();
}

function updateAudioBtnText() {
    const t = translations[currentLang];
    audioToggleBtn.textContent = audioEnabled ? t.audioOffBtn : t.audioOnBtn;
}

function speakText(text) {
    if (!audioEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'en' ? 'en-IN' : 'hi-IN';
    window.speechSynthesis.speak(utterance);
}

// Map & Location
function loadGoogleMapsScript() {
    if (window.google && window.google.maps) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsKey}&loading=async&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = function() {
        console.log("Google Maps API loaded.");
    };
    document.head.appendChild(script);
}

function handleLocationRouting() {
    if (!mapsKey) {
        locationStatus.textContent = "Google Maps is not configured on the backend.";
        return;
    }
    if (!navigator.geolocation) {
        locationStatus.textContent = "Geolocation is not supported by your browser.";
        return;
    }

    locationStatus.textContent = "Locating you...";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            locationStatus.textContent = "Location found. Checking weather, crowd levels, and routing...";
            
            checkWeather(userLat, userLng);
            simulateCrowdLevel();
            drawRoute(userLat, userLng);
        },
        (error) => {
            locationStatus.textContent = `Unable to retrieve location: ${error.message}`;
        }
    );
}

function drawRoute(lat, lng) {
    if (!window.google) return;
    
    mapContainer.classList.remove('hidden');
    
    const userLocation = new google.maps.LatLng(lat, lng);
    // Simulate a booth ~2km away
    const boothLocation = new google.maps.LatLng(lat + 0.015, lng + 0.015);

    if (!mapInstance) {
        mapInstance = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 14,
            styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            ]
        });
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: mapInstance
        });
    }

    const request = {
        origin: userLocation,
        destination: boothLocation,
        travelMode: 'WALKING'
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            locationStatus.textContent = "Route drawn to nearest simulated booth!";
        } else {
            locationStatus.textContent = "Directions request failed due to " + status;
        }
    });
}

// Weather API
async function checkWeather(lat, lng) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
        const data = await response.json();
        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;
        
        weatherBanner.classList.remove('hidden');
        
        if (code >= 61 || code === 95 || code === 97 || code === 99) {
            weatherBanner.className = 'weather-banner';
            weatherText.textContent = `⚠️ Bad Weather Alert: Rain/Storm expected (Temp: ${temp}°C). Please carry an umbrella to the polling booth.`;
        } else if (temp > 38) {
            weatherBanner.className = 'weather-banner';
            weatherText.textContent = `⚠️ Heat Wave Alert: Extreme heat (${temp}°C). Stay hydrated and vote early!`;
        } else {
            weatherBanner.className = 'weather-banner good';
            weatherText.textContent = `✅ Weather is clear for voting! Current Temp: ${temp}°C.`;
        }
    } catch (err) {
        console.error("Weather fetch failed", err);
    }
}

// Simulate Booth Crowd
function simulateCrowdLevel() {
    crowdBanner.classList.remove('hidden');
    
    // Generate a random crowd status
    const crowdStatuses = [
        { level: 'low', text: '🟢 Low Traffic. Estimated wait time: ~10 minutes. Good time to go!', colorClass: 'good' },
        { level: 'moderate', text: '🟡 Moderate Crowd. Estimated wait time: ~25 minutes.', colorClass: 'warning' },
        { level: 'high', text: '🔴 High Traffic! Estimated wait time: >45 minutes. Consider waiting a bit.', colorClass: '' }
    ];
    
    // Pick a random status
    const status = crowdStatuses[Math.floor(Math.random() * crowdStatuses.length)];
    
    if (status.colorClass === 'good') {
        crowdBanner.className = 'weather-banner good';
    } else if (status.colorClass === 'warning') {
        crowdBanner.className = 'weather-banner';
        crowdBanner.style.borderColor = '#eab308'; // Yellow
        crowdBanner.style.backgroundColor = 'rgba(234, 179, 8, 0.2)';
        crowdBanner.style.color = '#fde047';
    } else {
        crowdBanner.className = 'weather-banner'; // Default is red/danger style
        crowdBanner.style.borderColor = '';
        crowdBanner.style.backgroundColor = '';
        crowdBanner.style.color = '';
    }
    
    crowdText.textContent = status.text;
}

// Live Timeline via Backend
async function fetchLiveTimeline() {
    timelineStatus.textContent = "Fetching latest election timelines securely...";
    dynamicTimelineContainer.classList.remove('hidden');
    dynamicTimelineContainer.innerHTML = '<div class="text-center" style="padding: 2rem;">Loading data from Server...</div>';

    try {
        const res = await fetch('/api/timeline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lang: currentLang })
        });

        if (!res.ok) throw new Error("Backend request failed.");
        const timelineData = await res.json();
        
        if (timelineData.error) throw new Error(timelineData.error);
        
        dynamicTimelineContainer.innerHTML = '';
        timelineData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <button class="read-aloud-btn" aria-label="Read aloud">🔊</button>
                </div>
            `;
            dynamicTimelineContainer.appendChild(div);
        });

        dynamicTimelineContainer.querySelectorAll('.read-aloud-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.parentElement;
                speakText(`${container.querySelector('h3').textContent}. ${container.querySelector('p').textContent}`);
            });
        });
        
        timelineStatus.textContent = "Timeline updated successfully!";
    } catch (err) {
        timelineStatus.textContent = `Error fetching timeline: ${err.message}`;
        console.error(err);
    }
}

// Chat Assistant
function toggleChat(e) {
    if (e.target.classList.contains('close-chat-btn')) {
        chatWidget.classList.add('closed');
        return;
    }
    chatWidget.classList.toggle('closed');
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerText = text; 
    msgDiv.appendChild(contentDiv);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (sender === 'bot') {
        speakText(text);
        contentDiv.classList.add('speaking');
        setTimeout(() => contentDiv.classList.remove('speaking'), 2000);
    }
}

async function handleChatSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    
    addMessage("...", "bot"); 
    const loadingMsg = chatMessages.lastElementChild;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, lang: currentLang })
        });

        if (!res.ok) throw new Error("Backend request failed.");
        const data = await res.json();
        
        loadingMsg.remove();
        if (data.error) throw new Error(data.error);

        addMessage(data.reply, 'bot');
    } catch (err) {
        loadingMsg.remove();
        addMessage(`Sorry, I encountered an error connecting to the server: ${err.message}`, 'bot');
    }
}

function handleQuickReply(intent) {
    const t = translations[currentLang];
    let userMsg = intent === 'register' ? t.qrRegister : intent === 'docs' ? t.qrDocs : t.qrEVM;
    chatInput.value = userMsg;
    handleChatSend();
}

// Event Listeners
function setupEventListeners() {
    langToggleBtn.addEventListener('click', toggleLanguage);
    audioToggleBtn.addEventListener('click', toggleAudio);
    
    locateMeBtn.addEventListener('click', handleLocationRouting);
    generateTimelineBtn.addEventListener('click', fetchLiveTimeline);

    chatHeaderBtn.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatWidget.classList.add('closed');
    });

    chatSendBtn.addEventListener('click', handleChatSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChatSend();
    });

    qrBtns.forEach(btn => btn.addEventListener('click', (e) => handleQuickReply(e.target.getAttribute('data-intent'))));

    readAloudBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.parentElement;
            speakText(`${container.querySelector('h3').textContent}. ${container.querySelector('p').textContent}`);
        });
    });
}

window.addEventListener('DOMContentLoaded', init);
