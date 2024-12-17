// JavaScript for basic interactivity

// Smooth scroll for navigation links
document.querySelectorAll('header .nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const message = this.message.value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for your message!');
        this.reset();
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Handle Pothole Detection Page
document.addEventListener('DOMContentLoaded', function () {
    const potholeBtn = document.querySelector('.pothole-btn');

    if (potholeBtn) {
        potholeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear existing content
            document.body.innerHTML = '';

            // Add Pothole Detection Content
            const potholeSection = `
                <h1 class="text-3xl font-bold">Pothole Detection: Safer Roads, Smarter Vehicles</h1>
                <section>
                    <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
                    <p>
                        Our pothole detection system uses accelerometer, gyroscope, and GPS data to identify and log potholes.
                        When a pothole is detected, its location is geo-tagged and added to our database.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold mb-4">Geo-Tagged Pothole Map</h2>
                    <div id="map" style="height: 400px; width: 100%;"></div>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold mb-4">Benefits</h2>
                    <ul class="list-disc list-inside">
                        <li>Real-time awareness for drivers to avoid potholes</li>
                        <li>Improved road condition data for urban planners and municipalities</li>
                        <li>Reduced vehicle damage and increased safety</li>
                        <li>Crowdsourced data collection for more comprehensive coverage</li>
                    </ul>
                </section>
            `;
            document.body.innerHTML = potholeSection;

            // Initialize the map
            const map = L.map('map').setView([40.7128, -74.0060], 13); // New York center

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const simulatedPotholes = [
                { id: 1, lat: 40.7128, lng: -74.0060, severity: 'minor' },
                { id: 2, lat: 40.7148, lng: -74.0068, severity: 'major' },
                { id: 3, lat: 40.7138, lng: -74.0050, severity: 'minor' },
            ];

            simulatedPotholes.forEach(pothole => {
                const marker = L.marker([pothole.lat, pothole.lng]).addTo(map);
                marker.bindPopup(`
                    <b>Pothole ID:</b> ${pothole.id}<br>
                    <b>Severity:</b> ${pothole.severity}<br>
                    <b>Coordinates:</b> ${pothole.lat}, ${pothole.lng}
                `);
            });
        });
    }

    // Proximity Management Section
    const proximityBtn = document.querySelector('.proximity-btn');

    if (proximityBtn) {
        proximityBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear existing content
            document.body.innerHTML = '';

            // Add Proximity Management Content
            const proximitySection = `
                <h1 class="text-3xl font-bold">Proximity Management: Stay Safe on the Road</h1>
                <section>
                    <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
                    <p>
                        Our proximity management system uses ultrasonic or LiDAR sensors to detect obstacles around the car.
                        The system provides real-time alerts based on the distance to nearby objects, helping drivers avoid collisions.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold mb-4">Threshold System</h2>
                    <ul class="list-disc list-inside">
                        <li><b>Critical (&lt;30 cm):</b> <span style="color: red;">Red alert</span></li>
                        <li><b>Warning (30–100 cm):</b> <span style="color: orange;">Yellow alert</span></li>
                        <li><b>Safe (&gt;100 cm):</b> <span style="color: green;">Green (no alert)</span></li>
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold mb-4">Live Simulation</h2>
                    <div id="simulation" style="position: relative; width: 200px; height: 200px; margin: auto; border: 2px solid #ccc;">
                        <div id="front" style="position: absolute; background: green; width: 50px; height: 10px; top: 0; left: 75px;"></div>
                        <div id="back" style="position: absolute; background: green; width: 50px; height: 10px; bottom: 0; left: 75px;"></div>
                        <div id="left" style="position: absolute; background: green; width: 10px; height: 50px; top: 75px; left: 0;"></div>
                        <div id="right" style="position: absolute; background: green; width: 10px; height: 50px; top: 75px; right: 0;"></div>
                        <!-- Blue Car -->
                        <div id="car" style="position: absolute; background: blue; width: 60px; height: 100px; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 5px;"></div>
                    </div>
                </section>
            `;
            document.body.innerHTML = proximitySection;

            // Start Proximity Simulation
            simulateProximity();
        });
    }

    // Speed Monitoring Section Logic (added)
    const speedMonitoringBtn = document.querySelector('.speed-monitoring-btn');

    if (speedMonitoringBtn) {
        speedMonitoringBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Clear existing content
            document.body.innerHTML = '';

            // Add Speed Monitoring Content
            const speedMonitoringSection = `
                <h1 class="text-3xl font-bold">Speed Monitoring: Drive Within Limits</h1>
                <section>
                    <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
                    <p>
                        Our Speed Monitoring system uses advanced sensors and GPS data to measure vehicle speed
                        and compare it against set speed limits, providing real-time alerts to drivers.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-semibold mb-4">Live Speed Simulation</h2>
                    <div id="speed-display" style="text-align: center; margin: 20px;">
                        <h3>Current Speed: <span id="current-speed">0</span> km/h</h3>
                        <h3>Speed Limit: <span id="speed-limit">60</span> km/h</h3>
                        <div id="alert" style="margin-top: 20px; font-size: 1.2rem; color: green;">All Good! Drive Safely.</div>
                    </div>
                </section>
            `;
            document.body.innerHTML = speedMonitoringSection;

            // Start Speed Simulation
            simulateSpeedMonitoring();
        });
    }

    // Function to simulate speed monitoring
    function simulateSpeedMonitoring() {
        const speedElement = document.getElementById('current-speed');
        const alertElement = document.getElementById('alert');
        const speedLimitElement = document.getElementById('speed-limit');

        const speedLimit = 60; // Default speed limit
        speedLimitElement.textContent = speedLimit;

        function updateSpeed() {
            const currentSpeed = Math.floor(Math.random() * 100); // Simulate random speed (0–100 km/h)
            speedElement.textContent = currentSpeed;

            if (currentSpeed > speedLimit) {
                alertElement.textContent = 'Slow Down! You are over the speed limit.';
                alertElement.style.color = 'red';
            } else {
                alertElement.textContent = 'All Good! Drive Safely.';
                alertElement.style.color = 'green';
            }
        }

        setInterval(updateSpeed, 2000); // Update speed every 2 seconds
    }
});

// Function to simulate proximity alerts
function simulateProximity() {
    const zones = ['front', 'back', 'left', 'right'];

    zones.forEach(zone => {
        const element = document.getElementById(zone);
        const distance = Math.floor(Math.random() * 150); // Random distance (0–150 cm)

        if (distance < 30) {
            element.style.background = 'red';
        } else if (distance < 100) {
            element.style.background = 'orange';
        } else {
            element.style.background = 'green';
        }
    });

    setTimeout(simulateProximity, 1000); // Repeat every 1 second
}
