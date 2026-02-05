/**
 * IBONARIUM · REALITY CORE V4 · COSMO EDITION
 * 60+ Metrics + 5 Reality Phases + 4 Global Columns
 */

const METRICS_SCHEME = {
    geo: [
        { id: 'solar_wind', lbl: 'Solar Wind Velocity', unit: 'km/s', base: 400, var: 100 },
        { id: 'kp_index', lbl: 'Geomagnetic Kp', unit: 'kp', base: 2, var: 4, floor: 0 },
        { id: 'xray_flux', lbl: 'X-Ray Flux', unit: 'W/m²', base: 1.2e-6, var: 5e-7 },
        { id: 'proton_dens', lbl: 'Proton Density', unit: 'p/cm³', base: 5, var: 3 },
        { id: 'mag_decl', lbl: 'Magnetic Declination', unit: '°', base: -12.5, var: 0.1 },
        { id: 'seismic_jitter', lbl: 'Seismic Jitter', unit: 'Hz', base: 0.05, var: 0.02 }
    ],
    soc: [
        { id: 'anxiety', lbl: 'Collective Anxiety', unit: 'idx', base: 45, var: 25 },
        { id: 'net_lat', lbl: 'Backbone Latency', unit: 'ms', base: 18, var: 5 },
        { id: 'news_heat', lbl: 'News Cycle Intensity', unit: 'H', base: 65, var: 20 },
        { id: 'bot_ratio', lbl: 'AI Agent Saturaton', unit: '%', base: 38, var: 10 },
        { id: 'data_entropy', lbl: 'Big Data Entropy', unit: 'S', base: 1.45, var: 0.2 },
        { id: 'viral_k', lbl: 'Information K-Factor', unit: 'K', base: 2.1, var: 0.5 }
    ],
    bio: [
        { id: 'schumann', lbl: 'Schumann Resonance', unit: 'Hz', base: 7.83, var: 0.5 },
        { id: 'bio_res', lbl: 'Biomass Resonance', unit: 'Hz', base: 14.2, var: 2 },
        { id: 'flora_freq', lbl: 'Vegetation EMF Output', unit: 'μV', base: 45, var: 10 },
        { id: 'o2_sat', lbl: 'Oxygen Saturation', unit: '%', base: 20.9, var: 0.1 },
        { id: 'sea_temp', lbl: 'Surface Thermal Gradient', unit: 'K', base: 288, var: 2 },
        { id: 'soil_hum', lbl: 'Soil Humidity Index', unit: 'H', base: 55, var: 10 }
    ],
    qnt: [
        { id: 'ent_noise', lbl: 'Quantum Entropy Noise', unit: 'dB', base: -140, var: 10 },
        { id: 'phase_shift', lbl: 'Reality Phase Shift', unit: 'Δφ', base: 0.001, var: 0.005 },
        { id: 'chrono_jitter', lbl: 'Temporal Jitter', unit: 'ps', base: 15, var: 50 },
        { id: 'wave_coll', lbl: 'Superposition Collapse', unit: 'C', base: 450, var: 100 },
        { id: 'hilbert_dim', lbl: 'Hilbert Dimensions', unit: 'D', base: 11.2, var: 0.5 },
        { id: 'multi_overlap', lbl: 'Multiverse Overlap', unit: 'Ω', base: 0.015, var: 0.01 }
    ],
    cosmos: [
        { id: 'cosmic_ray', lbl: 'Cosmic Ray Flux', unit: 'n/cm²', base: 1.2, var: 0.8 },
        { id: 'cmb_temp', lbl: 'CMB Background Temp', unit: 'K', base: 2.725, var: 0.002 },
        { id: 'neutrino', lbl: 'Solar Neutrino Yield', unit: 'SNU', base: 65, var: 15 },
        { id: 'bh_signal', lbl: 'Black Hole Proximity', unit: 'Hz', base: 0.01, var: 0.1, floor: 0 },
        { id: 'dark_matter', lbl: 'Dark Matter Density', unit: 'GeV', base: 0.3, var: 0.05 },
        { id: 'vacuum_en', lbl: 'Vacuum Energy Flux', unit: 'J', base: 1e-15, var: 1e-14 },
        { id: 'galactic_dust', lbl: 'Galactic Dust Opacity', unit: 'τ', base: 0.04, var: 0.01 },
        { id: 'pulsar_sync', lbl: 'Pulsar Jitter Alpha', unit: 'ps', base: 12, var: 40 },
        { id: 'quasar_rs', lbl: 'Quasar Redshift Zeta', unit: 'z', base: 1.42, var: 0.05 },
        { id: 'stellar_turb', lbl: 'Stellar Wind Turb.', unit: 'M', base: 1.4, var: 0.4 },
        { id: 'meteor_flux', lbl: 'Large Meteoroid Flux', unit: 'f', base: 0.02, var: 0.1, floor: 0 },
        { id: 'mag_standoff', lbl: 'Magnetopause Standoff', unit: 'Re', base: 10.4, var: 2 }
    ]
};

const PHASES = [
    { name: 'СТАЗИС', range: [0, 0.2], color: '#ffffff' },
    { name: 'СИНХРОНІЗАЦІЯ', range: [0.2, 0.4], color: '#00d2ff' },
    { name: 'ПОТІК', range: [0.4, 0.6], color: '#8800ff' },
    { name: 'ХАОС', range: [0.6, 0.8], color: '#ffff00' },
    { name: 'КОЛАПС', range: [0.8, 1.0], color: '#ff0044' }
];

class RealityUltimateV4 {
    constructor() {
        this.can = document.getElementById('viz-canvas');
        this.ctx = this.can.getContext('2d');
        this.starsCan = document.getElementById('bg-stars');
        this.starsCtx = this.starsCan.getContext('2d');
        this.glitchCan = document.getElementById('glitch-overlay');
        this.glitchCtx = this.glitchCan.getContext('2d');

        this.rci = 0.5;
        this.frame = 0;
        this.particles = [];
        this.stars = [];
        this.isGlitched = false;

        this.init();
    }

    init() {
        this.resize();
        this.initStars();
        this.initManifold();
        this.renderMetrics();
        this.startLoops();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        [this.can, this.starsCan, this.glitchCan].forEach(c => {
            c.width = window.innerWidth;
            c.height = window.innerHeight;
        });
    }

    initStars() {
        for (let i = 0; i < 300; i++) {
            this.stars.push({
                x: Math.random() * innerWidth, y: Math.random() * innerHeight,
                s: Math.random() * 1.5, v: Math.random() * 0.4 + 0.1, o: Math.random()
            });
        }
    }

    initManifold() {
        for (let i = 0; i < 400; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * 700, y: (Math.random() - 0.5) * 700, z: (Math.random() - 0.5) * 700,
                c: Math.random() > 0.5 ? '#00d2ff' : '#8800ff'
            });
        }
    }

    renderMetrics() {
        for (const [tag, list] of Object.entries(METRICS_SCHEME)) {
            const container = document.getElementById(`cat-${tag}`);
            if (!container) continue;
            const grid = document.createElement('div');
            grid.className = 'm-grid';
            list.forEach(m => {
                grid.innerHTML += `
                    <div class="m-row"><span class="m-lbl">${m.lbl}</span></div>
                    <div class="m-row" style="text-align:right"><span class="m-val" id="v-${m.id}">---</span></div>
                `;
            });
            container.appendChild(grid);
        }
    }

    startLoops() {
        const tick = () => {
            const now = new Date();
            const ms = now.getMilliseconds().toString().padStart(3, '0');
            document.getElementById('clock').innerText = now.toLocaleTimeString('uk-UA') + '.' + ms;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        this.updateData();
        setInterval(() => this.updateData(), 3000);
        setInterval(() => this.generateReports(), 10000);
        this.renderLoop();
    }

    updateData() {
        let driftSum = 0;
        let count = 0;

        for (const [tag, list] of Object.entries(METRICS_SCHEME)) {
            list.forEach(m => {
                const shift = (Math.random() - 0.5) * m.var;
                const val = m.base + shift;
                const el = document.getElementById(`v-${m.id}`);
                if (el) el.innerText = this.format(val, m.unit);
                driftSum += Math.abs(shift / (m.var || 1));
                count++;
            });
        }

        this.rci = 0.1 + (driftSum / count) * 0.9;
        this.rci = Math.max(0, Math.min(1, this.rci));
        document.getElementById('rci').innerText = this.rci.toFixed(4);

        let phase = PHASES[0];
        PHASES.forEach(p => { if (this.rci >= p.range[0] && this.rci < p.range[1]) phase = p; });
        if (this.rci >= 0.8) phase = PHASES[4];

        const phEl = document.getElementById('phase-name');
        phEl.innerText = phase.name;
        phEl.style.color = phase.color;

        this.isGlitched = this.rci > 0.65;
        document.getElementById('alert-msg').style.display = this.isGlitched ? 'block' : 'none';
        if (this.isGlitched) document.getElementById('alert-msg').innerText = this.rci > 0.85 ? "COSMIC COLLAPSE" : "PHASE INSTABILITY";

        if (Math.random() > 0.9) this.log(`Synchronized L${Math.floor(Math.random() * 5)}. Phase: ${phase.name}.`);
    }

    format(v, unit) {
        if (v < 0.0001) return v.toExponential(2);
        return v.toFixed(v > 100 ? 0 : 3) + " " + unit;
    }

    generateReports() {
        const r = [
            "Детектування гравітаційних хвиль від ближніх бінарних систем.",
            "Збільшення потоку космічних променів корелює з джитером часу.",
            "Нейтринний вихід сонця стабільний. Квантові параметри L4 синхронізовані.",
            "Магнітопауза реагує на турбулентність зоряного вітру. Моніторинг активний."
        ];
        ['geo', 'soc', 'bio', 'qnt', 'cosmos'].forEach(k => {
            const el = document.getElementById(`desc-${k}`);
            if (el) el.innerText = r[Math.floor(Math.random() * r.length)];
        });
    }

    log(msg) {
        const log = document.getElementById('log-scroll');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="log-ts">[${new Date().toLocaleTimeString('uk-UA')}]</span> <span>${msg}</span>`;
        log.prepend(entry);
        if (log.children.length > 30) log.lastChild.remove();
    }

    renderLoop() {
        this.frame++;
        this.drawStars();
        this.drawManifold();
        if (this.isGlitched) this.drawGlitch();
        requestAnimationFrame(() => this.renderLoop());
    }

    drawStars() {
        const ctx = this.starsCtx;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        ctx.fillStyle = "#fff";
        this.stars.forEach(s => {
            ctx.globalAlpha = s.o * (0.1 + 0.3 * Math.sin(this.frame * 0.01 + s.x));
            ctx.beginPath(); ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2); ctx.fill();
            s.x -= s.v; if (s.x < 0) s.x = innerWidth;
        });
    }

    drawManifold() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        const cx = innerWidth / 2, cy = innerHeight / 2;
        const rotX = this.frame * 0.003, rotY = this.frame * 0.005;
        const fov = 700;

        const proj = this.particles.map(p => {
            let x = p.x, y = p.y, z = p.z;
            let y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
            let z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
            let x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);
            let z2 = -x * Math.sin(rotY) + z1 * Math.cos(rotY);
            const s = fov / (fov + z2 + 500);
            return { x: cx + x2 * s, y: cy + y1 * s, s, c: p.c };
        });

        ctx.strokeStyle = `rgba(0, 210, 255, ${this.isGlitched ? 0.3 : 0.07})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let i = 0; i < proj.length; i += 10) {
            ctx.moveTo(proj[i].x, proj[i].y);
            let t = proj[(i + 37) % proj.length];
            ctx.lineTo(t.x, t.y);
        }
        ctx.stroke();

        proj.forEach(p => {
            ctx.fillStyle = this.isGlitched && Math.random() > 0.8 ? '#f04' : p.c;
            ctx.globalAlpha = p.s * (this.isGlitched ? 0.9 : 0.4);
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s * (this.isGlitched ? 4 : 1.2), 0, Math.PI * 2); ctx.fill();
        });
    }

    drawGlitch() {
        const ctx = this.glitchCtx;
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        if (this.frame % 15 < 3) {
            ctx.fillStyle = 'rgba(255, 0, 68, 0.04)';
            ctx.fillRect(0, Math.random() * innerHeight, innerWidth, Math.random() * 200);
        }
    }
}

new RealityUltimateV4();
