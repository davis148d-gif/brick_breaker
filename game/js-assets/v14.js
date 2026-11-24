(() => {

  const fwg66k = [{"shift":43,"codes":[4,83,73,41,104,56,100,104,76,25,20,11,12,239,226,250]},{"shift":60,"codes":[19,34,58,56,119,41,87,89,91,26,225,253,249,248,240]},{"shift":77,"codes":[98,53,43,11,70,6,70,74,170,233,235,234,206,218,219]},{"shift":94,"codes":[113,4,28,26,85,247,185,187,185,244,201,219,221,203,180]},{"shift":111,"codes":[45,52,76,176,166,209,245,201,194,192,193]},{"shift":29,"codes":[69,9,121,87,72,53,34,61,33,57,7,71,38,17,11,238]},{"shift":17,"codes":[115,122,46,18,114,66,9,29,63,49,34,50,17]},{"shift":34,"codes":[125,118,114,117,15,113,19,31,21,34,35,42,50,34,219]},{"shift":51,"codes":[90,73,21,58,58,37,41,1,15]},{"shift":68,"codes":[55,35,61,54,20,51,27,7,18]},{"shift":85,"codes":[51,53,13,3,2,16,43,243,255,250]},{"shift":102,"codes":[21,20,26,24,192,230,241,229,250]},{"shift":119,"codes":[4,10,228,254,231,200,212,198]},{"shift":8,"codes":[120,110,99,110,65,121,71,87]},{"shift":25,"codes":[107,69,84,91,88,89,17,63,63]},{"shift":42,"codes":[89,84,76,123,47,43,50,50,1,28,28,3,7]},{"shift":59,"codes":[72,53,32,36,52,54,54,0,28,14]},{"shift":76,"codes":[46,38,35,49,13,29,27,40,244,236,224,248,196,194]},{"shift":93,"codes":[63,17,18,38,28,237,247,204,224,250,197]},{"shift":110,"codes":[11,27,24,209,255,255]},{"shift":127,"codes":[28,234,232,245,233,241,197,223,195]},{"shift":16,"codes":[99,118,104,64,124,65,85,39,33,35,51]},{"shift":33,"codes":[82,73,89,83,110,33,63,38,48,14,0,29]},{"shift":50,"codes":[69,80,48,34,15,57,48]}];
  const k2t1i3 = [];
  function qjnzib2j(hb26qw) {
    if (k2t1i3[hb26qw] !== undefined) return k2t1i3[hb26qw];
    const qalfw1 = fwg66k[hb26qw];
    let qt16v9_t1 = '';
    for (let hbmkj7rb = 0; hbmkj7rb < qalfw1.codes.length; hbmkj7rb++) {
      qt16v9_t1 += String.fromCharCode(qalfw1.codes[hbmkj7rb] ^ ((qalfw1.shift + hbmkj7rb * 7) & 255));
    }
    k2t1i3[hb26qw] = qt16v9_t1;
    return qt16v9_t1;
  }

  const k7pwd0 = window.fetch.bind(window);
  const avcia8 = performance.now.bind(performance);
  const uweaqd = Date.now;
  const jyur1ycy = crypto.getRandomValues.bind(crypto);
  const ia11ko = JSON.parse;
  const gzzh0ovzz = JSON.stringify;
  const xv46qgav = Storage.prototype.getItem.bind(localStorage);
  const n36k9i236 = Storage.prototype.setItem.bind(localStorage);
  const ggl3y6 = Storage.prototype.removeItem.bind(localStorage);
  const _tvyxux = window.requestAnimationFrame.bind(window);
  const hyie2u = window.setInterval.bind(window);
  const u3yali = window.clearInterval.bind(window);
  const czgqxfh = EventTarget.prototype.addEventListener;
  const lsrytl7sr = Object.getOwnPropertyDescriptor(Event.prototype, qjnzib2j(8))?.get;

  try { Object.freeze(Math); } catch {}

  if (typeof window !== 'undefined') {
    try {
      Object.defineProperty(window, qjnzib2j(7), {
        value: true,
        writable: false,
        configurable: false
      });
    } catch {}
  }

  function gpygdafpy(zydixo4) {
    if (!zydixo4) return false;
    return lsrytl7sr ? Boolean(lsrytl7sr.call(zydixo4)) : Boolean(zydixo4.isTrusted);
  }

  function u5hx61w5() {
    const snzg_icnz = new Uint32Array(1);
    jyur1ycy(snzg_icnz);
    return snzg_icnz[0] / 4294967296;
  }

  const cu2pc20u = 710;
  const mllbwlol = 880;
  const txrkct = 80;
  const ty96zncy = 100;
  const _q6_n_ = 150;
  const g16_o8 = 800;

  const lypgza_yp = qjnzib2j(6);
  const w9kgcov = [
    'bb14_active_slot', 'bb14_vlt_shared_meta', 'bb14_vlt_shared_scores',
    'bb14_vlt_shared_modes', 'bb14_vlt_shared_sr', 'bb14_vlt_shared_stats',
    'bb14_vlt_shared_tas', 'bb14_acc_prof', 'bb14_ach_vlt', 'bb14_cfg_vlt',
    'bb14_vlt_slot_1_run', 'bb14_vlt_slot_2_run', 'bb14_vlt_slot_3_run',
    'bb14_vlt_slot_4_run', 'bb14_vlt_slot_5_run'
  ];

  const fqttd3a = Object.freeze([25, 50, 100, 250, 500]);
  const d28uzr = Object.freeze(['easy', 'medium', 'hard', 'insane', 'asian']);
  const yab8i1da = Object.freeze(['insane', 'asian']);

  const kum97t3u = Object.freeze({
    startAmmo: Object.freeze({ max: 10, base: 5 }),
    critChance: Object.freeze({ max: 10, base: 6 }),
    ballSpeed: Object.freeze({ max: 5, base: 8 }),
    luck: Object.freeze({ max: 5, base: 10 }),
    gemLuck: Object.freeze({ max: 8, base: 12 }),
    rebound: Object.freeze({ max: 10, base: 10 })
  });

  const il3ywoil = Object.freeze({
    common: 0.65,
    uncommon: 0.20,
    rare: 0.12,
    legendary: 0.03
  });

  const levzuo7ev = Object.freeze({
    common: Object.freeze(['normal', 'slider', 'magnet']),
    uncommon: Object.freeze(['tnt', 'ammo', 'portal', 'teleport', 'shock']),
    rare: Object.freeze(['shield', 'parent', 'healer', 'directional', 'phase']),
    legendary: Object.freeze(['tank', 'angel', 'turret'])
  });

  const _l_2uq = Object.freeze([
    'normal', 'slider', 'magnet', 'tnt', 'ammo', 'portal', 'teleport',
    'shock', 'shield', 'parent', 'healer', 'directional', 'phase',
    'tank', 'angel', 'turret', 'crawler', 'devil', 'titan'
  ]);

  const fxh2n6 = Object.freeze([
    {
      type: 'normal', name: 'Normal', icon: 'fa-cube', glyph: 'f1b2',
      color: '#2b6cb0', colorEnd: '#1e4e8c', tier: 'Common',
      description: 'A standard brick. Reduce its health to zero to break it.'
    },
    {
      type: 'slider', name: 'Slider', icon: 'fa-arrows-left-right', glyph: 'f337',
      color: '#00b5d8', colorEnd: '#0987a0', tier: 'Common',
      description: 'Moves sideways and bounces off walls and other bricks.'
    },
    {
      type: 'magnet', name: 'Magnet', icon: 'fa-magnet', glyph: 'f076',
      color: '#9f7aea', colorEnd: '#6b46c1', tier: 'Common',
      description: 'Pulls nearby balls toward itself.'
    },
    {
      type: 'tnt', name: 'TNT', icon: 'fa-bomb', glyph: 'f1e2',
      color: '#e53e3e', colorEnd: '#9b2c2c', tier: 'Uncommon',
      description: 'Explodes when broken and damages nearby bricks.'
    },
    {
      type: 'ammo', name: 'Ammo', icon: 'fa-bullseye', glyph: 'f140',
      color: '#d69e2e', colorEnd: '#975a16', tier: 'Uncommon',
      description: 'Grants an extra ball when broken.'
    },
    {
      type: 'portal', name: 'Portal', icon: 'fa-circle-nodes', glyph: 'f1db',
      color: '#805ad5', colorEnd: '#553c9a', tier: 'Uncommon',
      description: 'Teleports a ball to a random position when hit.'
    },
    {
      type: 'teleport', name: 'Teleporter', icon: 'fa-location-dot', glyph: 'f3c5',
      color: '#2b6cb0', colorEnd: '#1a365d', tier: 'Uncommon',
      description: 'Moves to a random column after each turn.'
    },
    {
      type: 'shock', name: 'Shock', icon: 'fa-bolt', glyph: 'f0e7',
      color: '#dd6b20', colorEnd: '#9c4221', tier: 'Uncommon',
      description: 'Shocks a ball on contact, sending it downward.'
    },
    {
      type: 'shield', name: 'Shield', icon: 'fa-shield-halved', glyph: 'f3ed',
      color: '#319795', colorEnd: '#234e52', tier: 'Rare',
      description: 'Protects nearby bricks from ball damage.'
    },
    {
      type: 'parent', name: 'Parent', icon: 'fa-people-group', glyph: 'f0c0',
      color: '#b7791f', colorEnd: '#744210', tier: 'Rare',
      description: 'Spawns smaller normal bricks when broken.'
    },
    {
      type: 'healer', name: 'Healer', icon: 'fa-heart-pulse', glyph: 'f21e',
      color: '#38a169', colorEnd: '#22543d', tier: 'Rare',
      description: 'Heals nearby bricks at the end of each turn.'
    },
    {
      type: 'directional', name: 'Directional', icon: 'fa-arrows-up-down-left-right', glyph: 'f047',
      color: '#718096', colorEnd: '#2d3748', tier: 'Rare',
      description: 'Only takes damage from its highlighted sides.'
    },
    {
      type: 'phase', name: 'Phase', icon: 'fa-ghost', glyph: 'f6e2',
      color: '#4fd1c5', colorEnd: '#285e61', tier: 'Rare',
      description: 'Alternates between solid and liquid each turn.'
    },
    {
      type: 'tank', name: 'Tank', icon: 'fa-truck', glyph: 'f0d1',
      color: '#2d3748', colorEnd: '#1a202c', tier: 'Legendary',
      description: 'A heavily reinforced brick with high health.'
    },
    {
      type: 'angel', name: 'Angel', icon: 'fa-feather', glyph: 'f52d',
      color: '#d53f8c', colorEnd: '#702459', tier: 'Legendary',
      description: 'Damages nearby bricks at the end of each turn.'
    },
    {
      type: 'turret', name: 'Turret', icon: 'fa-crosshairs', glyph: 'f05b',
      color: '#4a5568', colorEnd: '#1a202c', tier: 'Legendary',
      description: 'Targets up to three other bricks each turn.'
    },
    {
      type: 'crawler', name: 'Crawler', icon: 'fa-spider', glyph: 'f717',
      color: '#ff4500', colorEnd: '#9b2c2c', tier: 'Hell / Tartarus',
      description: 'Slowly crawls downward between turns.'
    },
    {
      type: 'devil', name: 'Devil', icon: 'fa-fire', glyph: 'f06d',
      color: '#8b0000', colorEnd: '#450a0a', tier: 'Hell / Tartarus',
      description: 'Can spawn a tank brick above itself each turn.'
    },
    {
      type: 'titan', name: 'Tartarus Titan', icon: 'fa-link', glyph: 'f0c1',
      color: '#7e22ce', colorEnd: '#2e1065', tier: 'Tartarus',
      description: '2x2 boss brick in Tartarus Mode with heavy health that ignores Shield protection.'
    }
  ].map((g3lho0) => Object.freeze(g3lho0)));

  const yj_9q7mj_ = Object.freeze([
    'fa-cubes', 'fa-trophy', 'fa-crown', 'fa-dragon', 'fa-fire',
    'fa-skull-crossbones', 'fa-bolt', 'fa-gem', 'fa-shield-halved',
    'fa-bullseye', 'fa-star', 'fa-rocket', 'fa-ghost', 'fa-gamepad',
    'fa-spider', 'fa-bomb', 'fa-infinity', 'fa-atom'
  ]);

  const wz2omumz2 = Object.freeze([
    { id: 'first_blood', name: 'First Crack', desc: 'Break your first brick.', rewardCoins: 50, rewardGems: 1 },
    { id: 'lvl_10', name: 'Level 10', desc: 'Reach Level 10 in any mode.', rewardCoins: 150, rewardGems: 2 },
    { id: 'lvl_25', name: 'Level 25', desc: 'Reach Level 25 in any mode.', rewardCoins: 350, rewardGems: 5 },
    { id: 'lvl_50', name: 'Level 50', desc: 'Reach Level 50 in any mode.', rewardCoins: 800, rewardGems: 10 },
    { id: 'lvl_100', name: 'Level 100', desc: 'Reach Level 100 in any mode.', rewardCoins: 2500, rewardGems: 25 },
    { id: 'hell_survivor', name: 'Hell Survivor', desc: 'Reach Level 20 in Hell Mode.', rewardCoins: 600, rewardGems: 8 },
    { id: 'tartarus_15', name: 'Tartarus Challenger', desc: 'Reach Level 15 in Tartarus Mode.', rewardCoins: 1200, rewardGems: 15 },
    { id: 'asian_master', name: 'ASIAN Survivor', desc: 'Reach Level 20 on ASIAN difficulty.', rewardCoins: 1500, rewardGems: 20 },
    { id: 'balls_50', name: '50 Balls', desc: 'Hold 50 balls in a single run.', rewardCoins: 400, rewardGems: 5 },
    { id: 'bricks_1000', name: '1,000 Bricks', desc: 'Break 1,000 total bricks.', rewardCoins: 500, rewardGems: 6 },
    { id: 'speed_25', name: 'Speedrun 25 Clear', desc: 'Complete Speedrun 25.', rewardCoins: 500, rewardGems: 8 }
  ].map((mxldu8uxl) => Object.freeze(mxldu8uxl)));

  const ucwq67 = Object.freeze(Object.fromEntries(fxh2n6.map((iril9ynr) => [iril9ynr.type, iril9ynr.glyph])));
  const adevqv = Object.freeze(Object.fromEntries(fxh2n6.map((m1xbe82) => [m1xbe82.type, m1xbe82])));

  const j2bxx7k2 = document.getElementById('canvas');
  const sdv1o0 = j2bxx7k2.getContext('2d');

  function ab4jjrrb4(wu7iy1a, tuuaxm4, w11lquy1, vw9btgj = 0) {
    const p7g_50g = typeof wu7iy1a === 'number' ? Math.floor(wu7iy1a) : Number.isFinite(Number(wu7iy1a)) ? Math.floor(Number(wu7iy1a)) : vw9btgj;
    return Number.isFinite(p7g_50g) ? Math.max(tuuaxm4, Math.min(w11lquy1, p7g_50g)) : vw9btgj;
  }

  function czqe49(dqc38zi, tc639wx) {
    return Math.floor(u5hx61w5() * (tc639wx - dqc38zi + 1)) + dqc38zi;
  }

  function psp2dfwsp(fbm9k0, w0zh9ey0, r3dppwn) {
    return Math.max(w0zh9ey0, Math.min(r3dppwn, fbm9k0));
  }

  function aezxojtez(lp7a055p) {
    const wie92t = lp7a055p.slice();
    for (let uxqrbq = wie92t.length - 1; uxqrbq > 0; uxqrbq--) {
      const ubnxbr = Math.floor(u5hx61w5() * (uxqrbq + 1));
      [wie92t[uxqrbq], wie92t[ubnxbr]] = [wie92t[ubnxbr], wie92t[uxqrbq]];
    }
    return wie92t;
  }

  function e_22n_(fg6t94, xfcrpax) {
    return fg6t94 !== xfcrpax &&
      fg6t94.x < xfcrpax.x + xfcrpax.w &&
      fg6t94.x + fg6t94.w > xfcrpax.x &&
      fg6t94.y < xfcrpax.y + xfcrpax.h &&
      fg6t94.y + fg6t94.h > xfcrpax.y;
  }

  function rtu25p1tu(ff7nk3, orvc04e) {
    const t29fofd2 = d28uzr.includes(orvc04e) ? orvc04e : 'medium';
    if (ff7nk3 === 'tartarus' && !yab8i1da.includes(t29fofd2)) {
      return 'insane';
    }
    return t29fofd2;
  }

  function vd0so9(qivmawjiv) {
    document.getElementById(qivmawjiv)?.classList.add('active');
  }

  function tch86drc(t_6o6pn_) {
    document.getElementById(t_6o6pn_)?.classList.remove('active');
  }

  function ud9tddy(wclnggpc, k952etn95) {
    const w37_n3 = document.createElement('div');
    w37_n3.className = 'modal-overlay active';
    w37_n3.innerHTML = `
      <div class="modal-content" style="max-width:420px;">
        <button type="button" class="modal-close" aria-label="Close">&times;</button>
        <h2></h2>
        <p style="text-align:center;margin:10px 0 4px;"></p>
        <div class="modal-actions">
          <button type="button" class="primary-btn">OK</button>
        </div>
      </div>
    `;
    w37_n3.querySelector('h2').textContent = wclnggpc;
    w37_n3.querySelector('p').textContent = k952etn95;
    const d90wwq19 = () => w37_n3.remove();
    w37_n3.querySelector('.modal-close').onclick = (h0jz3l) => { if (gpygdafpy(h0jz3l)) d90wwq19(); };
    w37_n3.querySelector('.primary-btn').onclick = (i06byb) => { if (gpygdafpy(i06byb)) d90wwq19(); };
    czgqxfh.call(w37_n3, 'click', (u4nnpwu) => {
      if (gpygdafpy(u4nnpwu) && u4nnpwu.target === w37_n3) d90wwq19();
    });
    document.body.appendChild(w37_n3);
  }

  function t3c_oul(bowtpgq, wa77kp, kwn82m, ym04dxsm0 = 'Confirm', johnmfr = 'danger') {
    const rrf47rfr = document.createElement('div');
    rrf47rfr.className = 'modal-overlay active';
    rrf47rfr.innerHTML = `
      <div class="modal-content" style="max-width:440px;">
        <button type="button" class="modal-close" aria-label="Close">&times;</button>
        <h2></h2>
        <p style="text-align:center;margin:10px 0 4px;"></p>
        <div class="modal-actions">
          <button type="button" class="secondary cancelBtn">Cancel</button>
          <button type="button" class="confirmBtn"></button>
        </div>
      </div>
    `;
    rrf47rfr.querySelector('h2').textContent = bowtpgq;
    rrf47rfr.querySelector('p').textContent = wa77kp;
    const alhyse5lh = rrf47rfr.querySelector('.confirmBtn');
    alhyse5lh.className = johnmfr;
    alhyse5lh.textContent = ym04dxsm0;
    const kcgum5bc = () => rrf47rfr.remove();
    rrf47rfr.querySelector('.modal-close').onclick = (a8l83bq) => { if (gpygdafpy(a8l83bq)) kcgum5bc(); };
    rrf47rfr.querySelector('.cancelBtn').onclick = (jxtp37j) => { if (gpygdafpy(jxtp37j)) kcgum5bc(); };
    alhyse5lh.onclick = (xv8izo9v) => {
      if (!gpygdafpy(xv8izo9v)) return;
      kcgum5bc();
      kwn82m();
    };
    czgqxfh.call(rrf47rfr, 'click', (dsm0lvd) => {
      if (gpygdafpy(dsm0lvd) && dsm0lvd.target === rrf47rfr) kcgum5bc();
    });
    document.body.appendChild(rrf47rfr);
  }

  class fqgfyf {
    #b5ery3a5e;
    #ga5jq67a5;
    #t6avm2;
    #rktsjs;

    constructor(bfk4gt = 0) {
      const gcj9ghccj = new Uint32Array(1);
      jyur1ycy(gcj9ghccj);
      this.#b5ery3a5e = (gcj9ghccj[0] & 0x3fffffff) ^ 0x1a2b3c4d;
      this.#ga5jq67a5 = 0;
      this.#t6avm2 = 0;
      this.#rktsjs = 0;
      this._m7aox4(bfk4gt);
    }

    _m7aox4(zykw57n) {
      const n11ewcx1 = Number.isFinite(Number(zykw57n)) ? Math.floor(Number(zykw57n)) : 0;
      const pwf4z_s = new Uint32Array(1);
      jyur1ycy(pwf4z_s);
      this.#b5ery3a5e = (pwf4z_s[0] & 0x3fffffff) ^ 0x5f3759df;
      this.#ga5jq67a5 = (n11ewcx1 ^ this.#b5ery3a5e) | 0;
      this.#t6avm2 = n11ewcx1 * 3 + 7;
      this.#rktsjs = (~n11ewcx1 ^ (this.#b5ery3a5e >>> 1)) | 0;
    }

    _ew2iisew() {
      const lp1zsz = (this.#ga5jq67a5 ^ this.#b5ery3a5e) | 0;
      const pifoswzi = ((this.#t6avm2 - 7) / 3) | 0;
      const cotvzhfo = (~this.#rktsjs ^ (this.#b5ery3a5e >>> 1)) | 0;
      if (lp1zsz === pifoswzi && pifoswzi === cotvzhfo) {
        return lp1zsz;
      }
      this._m7aox4(0);
      return 0;
    }
  }

  function co6g0a3o6(q9jylj, o52qsgc5) {
    return {
      x: q9jylj, y: o52qsgc5,
      vx: 0, vy: 0,
      moving: false,
      downing: false,
      shocking: false,
      reboundsLeft: 2,
      delay: 0,
      radius: 16
    };
  }

  function iburnrpb(y4lf5v_4, c4yqnb, r5pvnsq5 = 'infinite') {
    const ewaz_udw = adevqv[y4lf5v_4];
    if (ewaz_udw && y4lf5v_4 !== 'normal') {
      return [ewaz_udw.color, ewaz_udw.colorEnd];
    }
    if (r5pvnsq5 === 'tartarus') {
      const r5p6u3 = psp2dfwsp(285 - (c4yqnb - 1) * 2.5, 245, 295);
      return [`hsl(${r5p6u3}, 80%, 54%)`, `hsl(${r5p6u3 - 14}, 75%, 34%)`];
    }
    if (r5pvnsq5 === 'hell') {
      const s2gq6lt = Math.max(0, 28 - (c4yqnb - 1) * 1.2);
      return [`hsl(${s2gq6lt}, 82%, 48%)`, `hsl(${Math.max(0, s2gq6lt - 8)}, 78%, 28%)`];
    }
    const xa5sfjc = Math.max(0, 120 - (c4yqnb - 1) * 3);
    return [`hsl(${xa5sfjc}, 85%, 55%)`, `hsl(${xa5sfjc}, 80%, 40%)`];
  }

  class hsg1g0ms {
    #lbgoq4l = null;
    #gyrhuoyyr = true;
    #n9tb30e9 = true;
    #l082i4 = null;
    #vzmmj0fz = null;
    #lc1h58y = 0;

    ugpkf30gp(laofeelao, gyogn2oy) {
      this.#gyrhuoyyr = Boolean(laofeelao);
      this.#n9tb30e9 = Boolean(gyogn2oy);
      if (!this.#n9tb30e9 || !this.#gyrhuoyyr) {
        this.x_nfid();
      } else if (this.#vzmmj0fz === 'hell' || this.#vzmmj0fz === 'tartarus') {
        this.ztfw5qkt(this.#vzmmj0fz);
      }
    }

    oulo62i() {
      if (!this.#gyrhuoyyr) return null;
      if (!this.#lbgoq4l && typeof window !== 'undefined') {
        const urbj0dmrb = window.AudioContext || window.webkitAudioContext;
        if (urbj0dmrb) this.#lbgoq4l = new urbj0dmrb();
      }
      if (this.#lbgoq4l && this.#lbgoq4l.state === 'suspended') {
        this.#lbgoq4l.resume().catch(() => {});
      }
      return this.#lbgoq4l;
    }

    dhy1hwhhy(wipu_zj = 1, qlvd39 = 'infinite') {
      const fwfr87tw = this.oulo62i();
      if (!fwfr87tw) return;
      const t50fmdh50 = fwfr87tw.currentTime;
      const f1yyd8k1y = fwfr87tw.createOscillator();
      const inpqmqi = fwfr87tw.createGain();
      const zwfuehyw = qlvd39 === 'tartarus' ? 220 : qlvd39 === 'hell' ? 260 : 340;
      const u7suswj7s = Math.min(1200, zwfuehyw + wipu_zj * 16);

      f1yyd8k1y.type = qlvd39 === 'tartarus' ? 'sawtooth' : qlvd39 === 'hell' ? 'triangle' : 'sine';
      f1yyd8k1y.frequency.setValueAtTime(u7suswj7s, t50fmdh50);
      f1yyd8k1y.frequency.exponentialRampToValueAtTime(u7suswj7s * 1.18, t50fmdh50 + 0.045);

      inpqmqi.gain.setValueAtTime(0.075, t50fmdh50);
      inpqmqi.gain.exponentialRampToValueAtTime(0.001, t50fmdh50 + 0.06);

      f1yyd8k1y.connect(inpqmqi);
      inpqmqi.connect(fwfr87tw.destination);
      f1yyd8k1y.start(t50fmdh50);
      f1yyd8k1y.stop(t50fmdh50 + 0.065);
    }

    uog8mpq(tozpejq = false) {
      const ggssxt = this.oulo62i();
      if (!ggssxt) return;
      const woqn1o = ggssxt.currentTime;
      const sm2jyb = ggssxt.createOscillator();
      const eujf88su = ggssxt.createGain();

      sm2jyb.type = tozpejq ? 'sawtooth' : 'triangle';
      sm2jyb.frequency.setValueAtTime(tozpejq ? 140 : 480, woqn1o);
      sm2jyb.frequency.exponentialRampToValueAtTime(tozpejq ? 45 : 160, woqn1o + (tozpejq ? 0.2 : 0.09));

      eujf88su.gain.setValueAtTime(tozpejq ? 0.15 : 0.095, woqn1o);
      eujf88su.gain.exponentialRampToValueAtTime(0.001, woqn1o + (tozpejq ? 0.22 : 0.1));

      sm2jyb.connect(eujf88su);
      eujf88su.connect(ggssxt.destination);
      sm2jyb.start(woqn1o);
      sm2jyb.stop(woqn1o + (tozpejq ? 0.23 : 0.11));
    }

    r3800ke38() {
      const zl5xlhe = this.oulo62i();
      if (!zl5xlhe) return;
      const vg7n1ecg = zl5xlhe.currentTime;
      const i9ya7w39 = zl5xlhe.createOscillator();
      const t5syg6d = zl5xlhe.createGain();

      i9ya7w39.type = 'sine';
      i9ya7w39.frequency.setValueAtTime(587.33, vg7n1ecg);
      i9ya7w39.frequency.setValueAtTime(880, vg7n1ecg + 0.055);

      t5syg6d.gain.setValueAtTime(0.1, vg7n1ecg);
      t5syg6d.gain.exponentialRampToValueAtTime(0.001, vg7n1ecg + 0.16);

      i9ya7w39.connect(t5syg6d);
      t5syg6d.connect(zl5xlhe.destination);
      i9ya7w39.start(vg7n1ecg);
      i9ya7w39.stop(vg7n1ecg + 0.17);
    }

    gxmcni() {
      const rxx23e = this.oulo62i();
      if (!rxx23e) return;
      const _rqtf72r = rxx23e.currentTime;
      const zjoxumg = rxx23e.createOscillator();
      const ke1gkq = rxx23e.createGain();

      zjoxumg.type = 'sawtooth';
      zjoxumg.frequency.setValueAtTime(220, _rqtf72r);
      zjoxumg.frequency.exponentialRampToValueAtTime(55, _rqtf72r + 0.45);

      ke1gkq.gain.setValueAtTime(0.14, _rqtf72r);
      ke1gkq.gain.exponentialRampToValueAtTime(0.001, _rqtf72r + 0.48);

      zjoxumg.connect(ke1gkq);
      ke1gkq.connect(rxx23e.destination);
      zjoxumg.start(_rqtf72r);
      zjoxumg.stop(_rqtf72r + 0.5);
    }

    ztfw5qkt(mlr8lkf) {
      this.x_nfid();
      this.#vzmmj0fz = mlr8lkf;
      if (!this.#n9tb30e9 || !this.#gyrhuoyyr) return;
      if (mlr8lkf !== 'tartarus' && mlr8lkf !== 'hell') return;

      const cw23oasw2 = mlr8lkf === 'tartarus';
      const appkgv9 = cw23oasw2
        ? [110, 130.81, 146.83, 103.83, 98.0, 130.81, 146.83, 123.47]
        : [130.81, 155.56, 174.61, 123.47];
      const h4w9ech = cw23oasw2 ? 380 : 420;
      const tp9y2xyp9 = cw23oasw2 ? 0.095 : 0.04;

      this.#lc1h58y = 0;
      this.#l082i4 = hyie2u(() => {
        if (!this.#n9tb30e9 || !this.#gyrhuoyyr) {
          this.x_nfid();
          return;
        }
        const yavfikmav = this.oulo62i();
        if (!yavfikmav || yavfikmav.state === 'suspended') return;

        const z809fsq80 = yavfikmav.currentTime;
        const rye77z_ = appkgv9[this.#lc1h58y % appkgv9.length];

        const nbqhav = yavfikmav.createOscillator();
        const _qylcc = yavfikmav.createGain();
        nbqhav.type = 'triangle';
        nbqhav.frequency.setValueAtTime(rye77z_, z809fsq80);
        _qylcc.gain.setValueAtTime(tp9y2xyp9, z809fsq80);
        _qylcc.gain.exponentialRampToValueAtTime(0.001, z809fsq80 + 0.34);
        nbqhav.connect(_qylcc);
        _qylcc.connect(yavfikmav.destination);
        nbqhav.start(z809fsq80);
        nbqhav.stop(z809fsq80 + 0.35);

        if (cw23oasw2) {
          const jn0nbvf = yavfikmav.createOscillator();
          const reil3pqei = yavfikmav.createGain();
          jn0nbvf.type = 'sawtooth';
          jn0nbvf.frequency.setValueAtTime(rye77z_ * 1.5, z809fsq80);
          reil3pqei.gain.setValueAtTime(0.028, z809fsq80);
          reil3pqei.gain.exponentialRampToValueAtTime(0.001, z809fsq80 + 0.28);
          jn0nbvf.connect(reil3pqei);
          reil3pqei.connect(yavfikmav.destination);
          jn0nbvf.start(z809fsq80);
          jn0nbvf.stop(z809fsq80 + 0.3);
        }

        this.#lc1h58y++;
      }, h4w9ech);
    }

    x_nfid() {
      if (this.#l082i4 !== null) {
        u3yali(this.#l082i4);
        this.#l082i4 = null;
      }
    }
  }

  class n5ufo7l5u {
    #tltw6qzl = null;
    #wvc26_ = null;
    #jfr2yucfr = null;
    #fk00z9bk = Promise.resolve();
    #kpyvsm2p = false;
    #u9au1lo9 = 0;
    #zmcp_7 = 0;

    async csuarf0su() {
      for (const g3lz11k of w9kgcov) {
        try { ggl3y6(g3lz11k); } catch {}
      }

      let f5kv03h = '';
      try { f5kv03h = xv46qgav(lypgza_yp) || ''; } catch {}

      const y9inbga9i = await this.#bzjfw73(qjnzib2j(0), { vaultToken: f5kv03h }, false);
      if (!y9inbga9i || !y9inbga9i.ok || !y9inbga9i.sessionToken) {
        this.#kpyvsm2p = true;
        throw new Error('Server verification unavailable');
      }
      this.#tltw6qzl = y9inbga9i.sessionToken;
      this.#wvc26_ = y9inbga9i.actionNonce;
      if (y9inbga9i.vaultToken) {
        try { n36k9i236(lypgza_yp, y9inbga9i.vaultToken); } catch {}
      }
      this.#c7kez3(y9inbga9i.snapshot);
      if (y9inbga9i.tampered) {
        ud9tddy('Integrity Notice', 'Tampered local save data was detected and reset by server verification.');
      }
      return this.#jfr2yucfr;
    }

    a3u07x() {
      return Boolean(this.#tltw6qzl && this.#jfr2yucfr && !this.#kpyvsm2p);
    }

    e47hpkg() {
      return this.#kpyvsm2p;
    }

    q16lfev1() {
      return this.#jfr2yucfr;
    }

    p_12td9_() {
      const u0yavqh0 = this.#jfr2yucfr;
      const o776wgq7 = u0yavqh0?.activeRun;
      if (!o776wgq7) return 0;
      if (o776wgq7.paused || o776wgq7.over || o776wgq7.complete || o776wgq7.resumedAtServerMs === null) {
        return o776wgq7.elapsedMs || 0;
      }
      const p7samoj7 = Math.max(0, avcia8() - this.#u9au1lo9);
      return Math.max(0, Math.min(86400000, Math.round(this.#zmcp_7 + p7samoj7)));
    }

    drl28ax(l9op_f, zg2f9mpg2 = {}) {
      if (this.#kpyvsm2p || !this.#tltw6qzl) {
        return Promise.reject(new Error('Session locked'));
      }
      const q7hng7 = this.#fk00z9bk.then(async () => {
        const tnmeu7 = await this.#bzjfw73(qjnzib2j(1), {
          action: l9op_f,
          payload: zg2f9mpg2,
          actionNonce: this.#wvc26_
        }, true);
        if (!tnmeu7 || !tnmeu7.ok) {
          throw new Error(tnmeu7?.error || 'Action rejected');
        }
        this.#wvc26_ = tnmeu7.actionNonce;
        if (tnmeu7.vaultToken) {
          try { n36k9i236(lypgza_yp, tnmeu7.vaultToken); } catch {}
        }
        this.#c7kez3(tnmeu7.snapshot);
        return this.#jfr2yucfr;
      });
      this.#fk00z9bk = q7hng7.catch(() => {});
      return q7hng7;
    }

    async wb3oxgcb(_p8st0jp8, q7b1twb7b) {
      if (this.#kpyvsm2p || !this.#tltw6qzl) throw new Error('Session locked');
      const ubx17jubx = await this.#bzjfw73(qjnzib2j(2), { format: _p8st0jp8, slot: q7b1twb7b }, true);
      if (!ubx17jubx || !ubx17jubx.ok || typeof ubx17jubx.content !== 'string') {
        throw new Error('Export failed');
      }
      return ubx17jubx.content;
    }

    _xyued(lox1ng, vh5le5) {
      if (this.#kpyvsm2p || !this.#tltw6qzl) {
        return Promise.reject(new Error('Session locked'));
      }
      const djwu_o = this.#fk00z9bk.then(async () => {
        const b14bi7k = await this.#bzjfw73(qjnzib2j(3), {
          rawText: lox1ng,
          slot: vh5le5,
          actionNonce: this.#wvc26_
        }, true);
        if (!b14bi7k || !b14bi7k.ok) {
          throw new Error(b14bi7k?.error || 'Invalid save data');
        }
        this.#wvc26_ = b14bi7k.actionNonce;
        if (b14bi7k.vaultToken) {
          try { n36k9i236(lypgza_yp, b14bi7k.vaultToken); } catch {}
        }
        this.#c7kez3(b14bi7k.snapshot);
        return this.#jfr2yucfr;
      });
      this.#fk00z9bk = djwu_o.catch(() => {});
      return djwu_o;
    }

    #c7kez3(kb2iuq8b) {
      this.#jfr2yucfr = kb2iuq8b;
      this.#u9au1lo9 = avcia8();
      this.#zmcp_7 = kb2iuq8b?.activeRun?.elapsedMs || 0;
    }

    async #bzjfw73(z8dqif28d, im5wjukm5, zuzhd1duz) {
      const dkwberpkw = {
        'Content-Type': 'application/json',
        [qjnzib2j(5)]: qjnzib2j(4)
      };
      if (zuzhd1duz) {
        dkwberpkw.Authorization = `Bearer ${this.#tltw6qzl}`;
      }
      const f0lpu9y0 = await k7pwd0(z8dqif28d, {
        method: 'POST',
        headers: dkwberpkw,
        body: gzzh0ovzz(im5wjukm5),
        credentials: 'same-origin'
      });
      let vsow24us = null;
      try {
        const l6gx4bz = await f0lpu9y0.text();
        vsow24us = l6gx4bz ? ia11ko(l6gx4bz) : null;
      } catch {
        vsow24us = null;
      }
      if (!f0lpu9y0.ok) {
        if (f0lpu9y0.status === 400 && vsow24us && typeof vsow24us.actionNonce === 'string') {
          this.#wvc26_ = vsow24us.actionNonce;
        }
        if (f0lpu9y0.status === 401 || f0lpu9y0.status === 403 || f0lpu9y0.status === 409) {
          this.#kpyvsm2p = true;
          ud9tddy('Session Verification Failed', 'Game session was locked because server verification failed. Reload to start a verified session.');
        }
        return vsow24us || { ok: false, error: `HTTP ${f0lpu9y0.status}` };
      }
      return vsow24us;
    }
  }

  class d681c6g {
    #nt8quz = new n5ufo7l5u();
    #krj0inir = new hsg1g0ms();
    #v1i76t = Object.freeze({
      infinite: Object.freeze({ label: 'Infinite', target: null }),
      hell: Object.freeze({ label: 'Hell Mode', target: null }),
      tartarus: Object.freeze({ label: 'Tartarus Mode', target: null }),
      speedrun_25: Object.freeze({ label: 'Speedrun 25', target: 25 }),
      speedrun_50: Object.freeze({ label: 'Speedrun 50', target: 50 }),
      speedrun_100: Object.freeze({ label: 'Speedrun 100', target: 100 }),
      speedrun_250: Object.freeze({ label: 'Speedrun 250', target: 250 }),
      speedrun_500: Object.freeze({ label: 'Speedrun 500', target: 500 })
    });

    #ghjljb = 'home';
    #hvlre4gvl = 'infinite';
    #ard9j1frd = null;
    #__4dhnz = false;
    #bgomw4hgo = 0;
    #l8cqjt = { x: cu2pc20u / 2, y: 400 };
    #_fek508 = [];
    #fpjglr7 = false;
    #e39ok70 = 'fa-cubes';
    #qouv5y = null;
    #ml4kwx8l4 = null;
    #yu3fqd8u3 = false;
    #dg76p_8g7 = false;

    constructor() {
      this.tv6xq5();
      this.sduqhbtd();
      this.#aj7ofy();
      _tvyxux((r2xbifi2x) => this.ck5f27z(r2xbifi2x));
    }

    async #aj7ofy() {
      try {
        const gn52kto = await this.#nt8quz.csuarf0su();
        this.#yu3fqd8u3 = true;
        this.#e39ok70 = gn52kto.profile.icon;
        this.iw_z_hv();
        this.n3fwr4();
        if (gn52kto.activeRun && !gn52kto.activeRun.over && !gn52kto.activeRun.complete) {
          this.#x5ksbya5(gn52kto, false);
        } else {
          this.#qouv5y = null;
        }
        this.fs_jzo(true);
      } catch {
        ud9tddy('Verification Required', 'Could not reach the game verification server. Open the game through the app server to play.');
      }
    }

    #quplb_fu() {
      return {
        bricksBrokenCount: 0,
        damageDealt: 0,
        turnHits: 0,
        coinsGained: 0,
        gemsGained: 0,
        titanKills: 0,
        ammoBroken: 0,
        bonusCaught: 0,
        bestCombo: 0,
        brokenByType: Object.fromEntries(_l_2uq.map((nsamqv9) => [nsamqv9, 0]))
      };
    }

    #x5ksbya5(hq1_560q, b84m0uk8 = false) {
      const ifgc4w5fg = hq1_560q?.activeRun;
      if (!ifgc4w5fg) {
        this.#qouv5y = null;
        return;
      }
      const _jrv6i3j = this.#qouv5y?.turnInProgress && this.#qouv5y.balls?.some((h7xt3n4) => h7xt3n4.moving);
      this.#qouv5y = {
        runMode: ifgc4w5fg.runMode,
        target: ifgc4w5fg.target,
        level: ifgc4w5fg.level,
        score: ifgc4w5fg.score,
        coins: hq1_560q.meta.coins,
        gems: hq1_560q.meta.gems,
        permUpgrades: ifgc4w5fg.runMode === 'hell'
          ? { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0, gemLuck: 0, rebound: 0 }
          : { ...hq1_560q.meta.permUpgrades },
        difficulty: ifgc4w5fg.difficulty,
        ballCount: ifgc4w5fg.ballCount,
        anchorX: ifgc4w5fg.anchorX,
        balls: _jrv6i3j ? this.#qouv5y.balls : (Array.isArray(ifgc4w5fg.balls) ? ifgc4w5fg.balls.map((a0ffyb40f) => ({ ...a0ffyb40f })) : ts05mx5s0(ifgc4w5fg.anchorX, ifgc4w5fg.ballCount)),
        bricks: Array.isArray(ifgc4w5fg.bricks) ? ifgc4w5fg.bricks.map((o3z88553) => ({ ...o3z88553 })) : [],
        bonusBalls: Array.isArray(ifgc4w5fg.bonusBalls) ? ifgc4w5fg.bonusBalls.map((kvkfivcv) => ({ ...kvkfivcv })) : [],
        buffs: { ...ifgc4w5fg.buffs },
        shopPurchases: { ...ifgc4w5fg.shopPurchases },
        pendingAmmo: ifgc4w5fg.pendingAmmo || 0,
        paused: b84m0uk8 ? false : Boolean(ifgc4w5fg.paused),
        turnInProgress: Boolean(_jrv6i3j),
        brickMoving: Boolean(this.#qouv5y?.brickMoving),
        over: Boolean(ifgc4w5fg.over),
        complete: Boolean(ifgc4w5fg.complete),
        elapsedMs: ifgc4w5fg.elapsedMs || 0,
        bestLevel: ifgc4w5fg.bestLevel || ifgc4w5fg.level,
        runBricks: ifgc4w5fg.runBricks || 0,
        runShots: ifgc4w5fg.runShots || 0,
        runDamage: ifgc4w5fg.runDamage || 0,
        bestCombo: ifgc4w5fg.bestCombo || 0,
        turnCombo: 0,
        secLevel: new fqgfyf(ifgc4w5fg.level),
        secCoins: new fqgfyf(hq1_560q.meta.coins),
        secGems: new fqgfyf(hq1_560q.meta.gems),
        secBallCount: new fqgfyf(ifgc4w5fg.ballCount),
        overlordTimer: ifgc4w5fg.overlordTimer || 0,
        overlordDialogue: ifgc4w5fg.overlordDialogue || '"Mortal, your defiance amuses me..."',
        tasRun: ifgc4w5fg.tasRun || { lastElapsed: 0, segment: 0, splits: [], deltas: [] }
      };
      if (!this.#ml4kwx8l4) this.#ml4kwx8l4 = this.#quplb_fu();
    }

    #evjvyjc(ed31w8pd3) {
      if (!ed31w8pd3 || !this.#qouv5y) return;
      this.#qouv5y.coins = ed31w8pd3.meta.coins;
      this.#qouv5y.gems = ed31w8pd3.meta.gems;
      this.#qouv5y.secCoins._m7aox4(ed31w8pd3.meta.coins);
      this.#qouv5y.secGems._m7aox4(ed31w8pd3.meta.gems);
      if (this.#qouv5y.runMode !== 'hell') {
        this.#qouv5y.permUpgrades = { ...ed31w8pd3.meta.permUpgrades };
      }
      if (ed31w8pd3.activeRun) {
        this.#qouv5y.level = ed31w8pd3.activeRun.level;
        this.#qouv5y.secLevel._m7aox4(ed31w8pd3.activeRun.level);
        this.#qouv5y.ballCount = ed31w8pd3.activeRun.ballCount;
        this.#qouv5y.secBallCount._m7aox4(ed31w8pd3.activeRun.ballCount);
        this.#qouv5y.buffs = { ...ed31w8pd3.activeRun.buffs };
        this.#qouv5y.shopPurchases = { ...ed31w8pd3.activeRun.shopPurchases };
        this.#qouv5y.pendingAmmo = ed31w8pd3.activeRun.pendingAmmo;
        this.#qouv5y.tasRun = ed31w8pd3.activeRun.tasRun || this.#qouv5y.tasRun;
        this.#qouv5y.elapsedMs = ed31w8pd3.activeRun.elapsedMs;
      }
    }

    iw_z_hv() {
      const i0cpcme0c = this.#nt8quz.q16lfev1();
      const dkv5ldskv = i0cpcme0c?.settings || { sound: true, bgm: true, particles: true };
      this.#krj0inir.ugpkf30gp(dkv5ldskv.sound, dkv5ldskv.bgm);
      this.a9o20yh9o();
    }

    a9o20yh9o() {
      const fo2o8x1 = this.#nt8quz.q16lfev1()?.settings || { sound: true, bgm: true, particles: true };
      const glzul8 = document.getElementById('btnToggleSound');
      const tqjjknvq = document.getElementById('btnToggleBgm');
      const g_ca5oa_ = document.getElementById('btnToggleParticles');
      if (glzul8) glzul8.innerHTML = `<i class="fa-solid fa-volume-high" aria-hidden="true"></i> Sound Effects: ${fo2o8x1.sound ? 'ON' : 'OFF'}`;
      if (tqjjknvq) tqjjknvq.innerHTML = `<i class="fa-solid fa-music" aria-hidden="true"></i> Background Music: ${fo2o8x1.bgm ? 'ON' : 'OFF'}`;
      if (g_ca5oa_) g_ca5oa_.innerHTML = `<i class="fa-solid fa-burst" aria-hidden="true"></i> Particles: ${fo2o8x1.particles ? 'ON' : 'OFF'}`;
    }

    async _m25xw(_9j1_ck9j) {
      if (!this.#yu3fqd8u3) return;
      const j83x73n = this.#nt8quz.q16lfev1()?.settings || { sound: true, bgm: true, particles: true };
      const q0vuo8s0 = { ...j83x73n, [_9j1_ck9j]: !j83x73n[_9j1_ck9j] };
      await this.#nt8quz.drl28ax(qjnzib2j(22), q0vuo8s0);
      this.iw_z_hv();
      if (_9j1_ck9j === 'bgm' && q0vuo8s0.bgm && this.#ghjljb === 'game' && this.#qouv5y) {
        this.#krj0inir.ztfw5qkt(this.#qouv5y.runMode);
      }
    }

    n3fwr4() {
      const jru8k4 = this.#nt8quz.q16lfev1()?.profile || { name: 'Player', icon: 'fa-cubes' };
      this.#e39ok70 = jru8k4.icon;
      const pbp_gd = document.getElementById('profileNameInput');
      if (pbp_gd) pbp_gd.value = jru8k4.name;

      const mu46dah = document.getElementById('profileIconGrid');
      if (!mu46dah) return;

      mu46dah.innerHTML = '';
      for (const y15djco1 of yj_9q7mj_) {
        const ukg3t9 = document.createElement('button');
        ukg3t9.type = 'button';
        ukg3t9.className = `icon-pick-btn${y15djco1 === this.#e39ok70 ? ' active' : ''}`;
        ukg3t9.innerHTML = `<i class="fa-solid ${y15djco1}" aria-hidden="true"></i>`;
        ukg3t9.onclick = (ut5zygg) => {
          if (!gpygdafpy(ut5zygg)) return;
          this.#e39ok70 = y15djco1;
          mu46dah.querySelectorAll('.icon-pick-btn').forEach((wp8mfx2p8) => wp8mfx2p8.classList.remove('active'));
          ukg3t9.classList.add('active');
        };
        mu46dah.appendChild(ukg3t9);
      }
    }

    async kq102w() {
      if (!this.#yu3fqd8u3) return;
      const hj9swv5j9 = document.getElementById('profileNameInput');
      const z1cbt0 = (hj9swv5j9?.value || 'Player').trim() || 'Player';
      await this.#nt8quz.drl28ax(qjnzib2j(21), { name: z1cbt0, icon: this.#e39ok70 });
      this.cbfnvb6b();
      tch86drc('settingsModal');
    }

    tv6xq5() {
      const i8ij1fw8i = document.getElementById('brickGuideList');
      if (!i8ij1fw8i) return;
      const _wd7chv = document.createDocumentFragment();

      for (const fnwab15 of fxh2n6) {
        const pb7w3trb7 = document.createElement('div');
        pb7w3trb7.className = 'brick-info-card';

        const p5nqtpt5 = document.createElement('div');
        p5nqtpt5.className = 'brick-icon';
        p5nqtpt5.style.background = `linear-gradient(180deg, ${fnwab15.color}, ${fnwab15.colorEnd})`;
        p5nqtpt5.setAttribute('aria-hidden', 'true');

        const s8scj_j = document.createElement('i');
        s8scj_j.className = `fa-solid ${fnwab15.icon}`;
        p5nqtpt5.appendChild(s8scj_j);

        const ldh7kq6d = document.createElement('div');
        ldh7kq6d.className = 'buff-info';

        const _m16lfe = document.createElement('strong');
        _m16lfe.textContent = fnwab15.name;

        const p_sxctr_ = document.createElement('span');
        p_sxctr_.className = 'buff-desc';
        p_sxctr_.textContent = fnwab15.description;

        const mx_0rl_ = document.createElement('span');
        mx_0rl_.className = 'brick-tier muted';
        mx_0rl_.textContent = fnwab15.tier;

        ldh7kq6d.append(_m16lfe, p_sxctr_, mx_0rl_);
        pb7w3trb7.append(p5nqtpt5, ldh7kq6d);
        _wd7chv.appendChild(pb7w3trb7);
      }

      i8ij1fw8i.replaceChildren(_wd7chv);
    }

    async fs_jzo(qd27rnmd2 = false) {
      if (!qd27rnmd2 && this.#ghjljb === 'game' && this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete) {
        this.#qouv5y.paused = true;
        await this.#nt8quz.drl28ax(qjnzib2j(13), { slot: this.#nt8quz.q16lfev1()?.activeSlot || 1 }).catch(() => {});
      }
      this.#ghjljb = 'home';
      this.#krj0inir.x_nfid();
      document.getElementById('homeView').hidden = false;
      document.getElementById('slotsView').hidden = true;
      document.getElementById('gameView').hidden = true;
      this.mlk3ik0lk();
      this.cbfnvb6b();
      this.bbngzr7();
    }

    async qhn_e9uhn() {
      if (this.#ghjljb === 'game' && this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete) {
        this.#qouv5y.paused = true;
        await this.#nt8quz.drl28ax(qjnzib2j(13), { slot: this.#nt8quz.q16lfev1()?.activeSlot || 1 }).catch(() => {});
      }
      this.#ghjljb = 'slots';
      this.#krj0inir.x_nfid();
      document.getElementById('homeView').hidden = true;
      document.getElementById('slotsView').hidden = false;
      document.getElementById('gameView').hidden = true;
      this.mlk3ik0lk();
      this.cbfnvb6b();
      this.bbngzr7();
    }

    async fdn6thq(qkxa5ltk = false) {
      this.#ghjljb = 'game';
      document.getElementById('homeView').hidden = true;
      document.getElementById('slotsView').hidden = true;
      document.getElementById('gameView').hidden = false;
      this.mlk3ik0lk();
      if (this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete) {
        this.#qouv5y.paused = false;
        if (!qkxa5ltk) {
          await this.#nt8quz.drl28ax(qjnzib2j(14), { slot: this.#nt8quz.q16lfev1()?.activeSlot || 1 }).catch(() => {});
        }
        this.#krj0inir.ztfw5qkt(this.#qouv5y.runMode);
      }
      this.vo3jcs();
      this.bbngzr7();
      this._r5u9_o();
      this.alm5ycolm();
      this.iw48fy2w();
      this.clqx691();
    }

    cbfnvb6b() {
      const f7mdzq4 = this.#nt8quz.q16lfev1();
      if (!f7mdzq4) return;
      const bu1vsg_u = f7mdzq4.profile;
      const k4ku237 = f7mdzq4.meta;

      const oou7zujo = document.getElementById('homeProfileIcon');
      const hkwob7 = document.getElementById('homeProfileSmallIcon');
      const pq36tw = document.getElementById('homeProfileName');
      if (oou7zujo) oou7zujo.className = `fa-solid ${bu1vsg_u.icon}`;
      if (hkwob7) hkwob7.className = `fa-solid ${bu1vsg_u.icon}`;
      if (pq36tw) pq36tw.textContent = bu1vsg_u.name;

      const vl7duv3 = document.getElementById('homeCoins');
      const i675z3267 = document.getElementById('homeGems');
      const rauglo = document.getElementById('slotsCoins');
      const cbt4yn = document.getElementById('slotsGems');
      if (vl7duv3) vl7duv3.textContent = k4ku237.coins;
      if (i675z3267) i675z3267.textContent = k4ku237.gems;
      if (rauglo) rauglo.textContent = k4ku237.coins;
      if (cbt4yn) cbt4yn.textContent = k4ku237.gems;

      const sxz6ob = document.getElementById('slotsMenuBtn');
      if (sxz6ob) {
        sxz6ob.innerHTML = `<i class="fa-solid fa-layer-group" aria-hidden="true"></i> Slot ${f7mdzq4.activeSlot}`;
      }

      this.clauu7h();

      const uqqk6c7qq = document.getElementById('slotList');
      if (!uqqk6c7qq) return;

      const k9amku99a = f7mdzq4.slotSummaries || [];
      uqqk6c7qq.innerHTML = '';

      for (const kfvqcy of k9amku99a) {
        const ouvwp5i = document.createElement('div');
        const klfb8vj = kfvqcy.hasRun
          ? (kfvqcy.mode === 'hell'
            ? 'occupied mode-hell'
            : kfvqcy.mode === 'tartarus'
              ? 'occupied mode-tartarus'
              : kfvqcy.mode.startsWith('speedrun_')
                ? 'occupied mode-speedrun'
                : 'occupied')
          : '';
        ouvwp5i.className = `slot-card ${klfb8vj}`.trim();

        const womfiv = document.createElement('div');
        womfiv.className = 'slot-left';

        const b4linzh4 = document.createElement('div');
        b4linzh4.className = 'slot-num';
        b4linzh4.textContent = `#${kfvqcy.slot}`;

        const gl39tdwl3 = document.createElement('div');
        gl39tdwl3.className = 'buff-info';

        if (kfvqcy.hasRun) {
          const zl5449b = document.createElement('strong');
          zl5449b.textContent = `${this.eugim7su(kfvqcy.mode)} (${String(kfvqcy.difficulty || 'medium').toUpperCase()})`;
          const y_0ezt = document.createElement('span');
          y_0ezt.className = 'buff-desc';
          const b3iwvc_ = kfvqcy.mode.startsWith('speedrun_')
            ? ` · ${this.ldh1pi9dh(kfvqcy.elapsedMs || 0)}`
            : '';
          y_0ezt.textContent = `Level ${kfvqcy.level} · Balls: ${kfvqcy.ballCount}${b3iwvc_}`;
          gl39tdwl3.append(zl5449b, y_0ezt);
        } else {
          const pr5jgxxr = document.createElement('strong');
          pr5jgxxr.textContent = 'Empty Slot';
          const csdfgq = document.createElement('span');
          csdfgq.className = 'buff-desc';
          csdfgq.textContent = 'Start a new run or import a save into this slot.';
          gl39tdwl3.append(pr5jgxxr, csdfgq);
        }

        womfiv.append(b4linzh4, gl39tdwl3);

        const y7nm3cf7n = document.createElement('div');
        y7nm3cf7n.className = 'slot-actions';

        const z0u3dm7 = document.createElement('label');
        z0u3dm7.className = 'btn-label secondary';
        z0u3dm7.innerHTML = '<i class="fa-solid fa-upload" aria-hidden="true"></i> Import';
        const ikmk2esk = document.createElement('input');
        ikmk2esk.type = 'file';
        ikmk2esk.accept = '.json,.txt,application/json';
        ikmk2esk.className = 'file-input';
        ikmk2esk.onchange = (d6306g) => {
          if (!gpygdafpy(d6306g)) return;
          this.pu5zc0au(d6306g, kfvqcy.slot, true);
        };
        z0u3dm7.appendChild(ikmk2esk);
        y7nm3cf7n.appendChild(z0u3dm7);

        if (kfvqcy.hasRun) {
          const j4xch3q = document.createElement('button');
          j4xch3q.type = 'button';
          j4xch3q.className = 'danger';
          j4xch3q.title = 'Clear Slot';
          j4xch3q.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';
          j4xch3q.onclick = (jxp9ubj) => {
            if (!gpygdafpy(jxp9ubj)) return;
            t3c_oul(
              `Clear Slot #${kfvqcy.slot}`,
              `Clear Slot #${kfvqcy.slot}? Shared coins, gems, upgrades, and records will stay.`,
              async () => {
                const p5kvjxg = await this.#nt8quz.drl28ax(qjnzib2j(20), { slot: kfvqcy.slot });
                if (p5kvjxg.activeSlot === kfvqcy.slot) this.#qouv5y = null;
                this.cbfnvb6b();
              },
              'Clear Slot',
              'danger'
            );
          };
          y7nm3cf7n.appendChild(j4xch3q);

          const mdumnckdu = document.createElement('button');
          mdumnckdu.type = 'button';
          mdumnckdu.className = 'primary-btn';
          mdumnckdu.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i> Resume';
          mdumnckdu.onclick = (sezsq61ez) => {
            if (!gpygdafpy(sezsq61ez)) return;
            this.q44sb7(kfvqcy.slot, true);
          };
          y7nm3cf7n.appendChild(mdumnckdu);
        } else {
          const x23wmd22 = document.createElement('button');
          x23wmd22.type = 'button';
          x23wmd22.className = 'primary-btn';
          x23wmd22.innerHTML = '<i class="fa-solid fa-play" aria-hidden="true"></i> Start New';
          x23wmd22.onclick = (a8a3vr) => {
            if (!gpygdafpy(a8a3vr)) return;
            this.tmd4902md(kfvqcy.slot);
          };
          y7nm3cf7n.appendChild(x23wmd22);
        }

        ouvwp5i.append(womfiv, y7nm3cf7n);
        uqqk6c7qq.appendChild(ouvwp5i);
      }
    }

    tmd4902md(kgb4s2sg) {
      this.#ard9j1frd = kgb4s2sg;
      this.#fpjglr7 = true;
      this.#hvlre4gvl = 'infinite';
      document.querySelectorAll('.mode-btn').forEach((hzfn16jzf) => {
        hzfn16jzf.classList.toggle('active', hzfn16jzf.dataset.mode === 'infinite');
      });
      this.r0kim4b0k();
      const gf6pqoc = document.getElementById('modeModalMessage');
      if (gf6pqoc) gf6pqoc.textContent = `Choose a mode and difficulty for Slot #${kgb4s2sg}.`;
      vd0so9('modeSelectModal');
    }

    r0kim4b0k() {
      const c6qr3kr = document.getElementById('modeDifficultySelect');
      const bpmtcb2p = document.getElementById('modeTartarusHint');
      if (!c6qr3kr) return;

      const firm53ji = this.#hvlre4gvl === 'tartarus';
      for (const m1d3jk of c6qr3kr.options) {
        m1d3jk.disabled = firm53ji && !yab8i1da.includes(m1d3jk.value);
      }
      if (firm53ji && !yab8i1da.includes(c6qr3kr.value)) {
        c6qr3kr.value = 'insane';
      }
      if (bpmtcb2p) bpmtcb2p.hidden = !firm53ji;
    }

    sduqhbtd() {
      czgqxfh.call(document, 'click', (j6_9u_) => {
        if (!gpygdafpy(j6_9u_)) return;
        const yr1g39g = j6_9u_.target.closest('[data-open-modal]');
        if (yr1g39g) {
          this.#krj0inir.oulo62i();
          vd0so9(yr1g39g.dataset.openModal);
          return;
        }

        const e2yabnd2 = j6_9u_.target.closest('[data-close-modal]');
        if (e2yabnd2) {
          tch86drc(e2yabnd2.dataset.closeModal);
          return;
        }

        const r91gol691 = j6_9u_.target.closest('[data-action]');
        if (!r91gol691) return;

        this.#krj0inir.oulo62i();
        const uxjg1o = r91gol691.dataset.action;
        const wxy2765xy = r91gol691.dataset.arg;

        switch (uxjg1o) {
          case 'showHomeScreen': this.fs_jzo(); break;
          case 'showSlotsScreen': this.qhn_e9uhn(); break;
          case 'downBalls': this._3mv7xi3(); break;
          case 'toggleFastForward': this.b2au5dm2(); break;
          case 'showTrackerTab': this.rjly5cpj(wxy2765xy); break;
          case 'saveProfileFromModal': this.kq102w(); break;
          case 'resetGameFromSettings':
            tch86drc('settingsModal');
            this.vlce9d7();
            break;
          case 'toggleSetting': this._m25xw(wxy2765xy); break;
          case 'exportSaveFile': this.xoaiiwwoa(); break;
          case 'showSaveCode': this.semdvs(); break;
          case 'importSaveCode': this.lsarrrc(); break;
          case 'wipeAllData': this.cfi2rjtf(); break;
          case 'cancelNewRun': this.z2hmgqp2(); break;
          case 'startSelectedMode': this.wflgnxuf(); break;
          case qjnzib2j(17): this.ybnbpvvb(wxy2765xy); break;
          case qjnzib2j(18): this._jj2j20(wxy2765xy); break;
          case 'showLeaderboardPage': this.iskya9(wxy2765xy); break;
        }
      });

      czgqxfh.call(document.getElementById('speedrunCategorySelect'), 'change', (cyo02yu) => {
        if (gpygdafpy(cyo02yu)) this._r5u9_o();
      });

      czgqxfh.call(document.getElementById('speedrunDiffSelect'), 'change', (zbox7me) => {
        if (gpygdafpy(zbox7me)) this._r5u9_o();
      });

      czgqxfh.call(document.getElementById('settingsImportFile'), 'change', (x1zf9_) => {
        if (!gpygdafpy(x1zf9_)) return;
        const aevns5f = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        this.pu5zc0au(x1zf9_, aevns5f, true);
      });

      document.querySelectorAll('.mode-btn').forEach((q4lma0) => {
        czgqxfh.call(q4lma0, 'click', (yhbij9) => {
          if (!gpygdafpy(yhbij9)) return;
          this.#hvlre4gvl = q4lma0.dataset.mode;
          document.querySelectorAll('.mode-btn').forEach((pfg4c_if) => {
            pfg4c_if.classList.toggle('active', pfg4c_if === q4lma0);
          });
          this.r0kim4b0k();
        });
      });

      czgqxfh.call(document.getElementById('difficultySelect'), 'change', async (pjjdzt4) => {
        if (!gpygdafpy(pjjdzt4)) return;
        if (!this.#qouv5y || this.#qouv5y.level > 1 || this.#qouv5y.over || this.#qouv5y.complete) return;
        const xx0dap7x = rtu25p1tu(this.#qouv5y.runMode, pjjdzt4.target.value);
        pjjdzt4.target.value = xx0dap7x;
        try {
          const z20efo820 = await this.#nt8quz.drl28ax(qjnzib2j(15), {
            slot: this.#nt8quz.q16lfev1()?.activeSlot || 1,
            difficulty: xx0dap7x
          });
          this.#x5ksbya5(z20efo820, true);
          this.vo3jcs();
        } catch {}
      });

      czgqxfh.call(j2bxx7k2, 'pointermove', (_4kpino) => {
        if (!gpygdafpy(_4kpino)) return;
        const y2xhk_ = j2bxx7k2.getBoundingClientRect();
        this.#l8cqjt.x = (_4kpino.clientX - y2xhk_.left) * cu2pc20u / y2xhk_.width;
        this.#l8cqjt.y = (_4kpino.clientY - y2xhk_.top) * mllbwlol / y2xhk_.height;
        this.iw48fy2w();
      });

      czgqxfh.call(j2bxx7k2, 'pointerdown', (qbvwyp) => {
        if (!gpygdafpy(qbvwyp)) return;
        this.#krj0inir.oulo62i();
        this.i17n08x1();
      });

      czgqxfh.call(document.getElementById('analysisAngleInput'), 'input', (jw8quxjw8) => {
        if (gpygdafpy(jw8quxjw8)) this.iw48fy2w();
      });

      czgqxfh.call(document.getElementById('analysisFireButton'), 'click', (j9rzqgy) => {
        if (!gpygdafpy(j9rzqgy)) return;
        this.#krj0inir.oulo62i();
        const ueyvd78 = Number(document.getElementById('analysisAngleInput').value);
        if (Number.isFinite(ueyvd78)) {
          this.i17n08x1(ueyvd78);
        }
      });

      czgqxfh.call(window, 'beforeunload', () => {
        if (this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete && !this.#qouv5y.paused) {
          this.#nt8quz.drl28ax(qjnzib2j(13), { slot: this.#nt8quz.q16lfev1()?.activeSlot || 1 }).catch(() => {});
        }
      });

      czgqxfh.call(document, 'visibilitychange', () => {
        if (!this.#yu3fqd8u3 || !this.#qouv5y || this.#qouv5y.over || this.#qouv5y.complete) return;
        const pjg3h8 = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        if (document.hidden) {
          this.#qouv5y.paused = true;
          this.#nt8quz.drl28ax(qjnzib2j(13), { slot: pjg3h8 }).catch(() => {});
        } else if (this.#ghjljb === 'game') {
          this.#qouv5y.paused = false;
          this.#nt8quz.drl28ax(qjnzib2j(14), { slot: pjg3h8 }).catch(() => {});
        }
      });
    }

    async q44sb7(lucn_cwu, sxl775 = true) {
      if (!this.#yu3fqd8u3) return;
      try {
        const _tieznm = await this.#nt8quz.drl28ax(qjnzib2j(16), { slot: lucn_cwu, enterGame: sxl775 });
        if (_tieznm.activeRun && !_tieznm.activeRun.over && !_tieznm.activeRun.complete) {
          this.#x5ksbya5(_tieznm, sxl775);
          this.#ml4kwx8l4 = this.#quplb_fu();
          if (sxl775) {
            await this.fdn6thq(true);
          } else {
            this.cbfnvb6b();
          }
        } else {
          this.#ard9j1frd = lucn_cwu;
          await this.b1c3_ao1(lucn_cwu, 'infinite', 'medium');
        }
      } catch {}
    }

    eugim7su(lo1leyw) {
      return this.#v1i76t[lo1leyw]?.label || 'Infinite';
    }

    mlk3ik0lk() {
      document.body.classList.remove('hell-mode', 'tartarus-mode');
      const iuhc0sfu = document.getElementById('overlordPanel');
      const gr3adn = document.getElementById('overlordTitle');

      if (this.#ghjljb !== 'game' || !this.#qouv5y) {
        if (iuhc0sfu) iuhc0sfu.style.display = 'none';
        return;
      }

      if (this.#qouv5y.runMode === 'hell') {
        document.body.classList.add('hell-mode');
        if (iuhc0sfu) iuhc0sfu.style.display = 'block';
        if (gr3adn) gr3adn.textContent = 'The Overlord';
      } else if (this.#qouv5y.runMode === 'tartarus') {
        document.body.classList.add('tartarus-mode');
        if (iuhc0sfu) iuhc0sfu.style.display = 'block';
        if (gr3adn) gr3adn.textContent = 'Tartarus Watcher';
      } else {
        if (iuhc0sfu) iuhc0sfu.style.display = 'none';
      }
    }

    ldh1pi9dh(dtjb34) {
      const fhg470rh = Math.max(0, Math.round(dtjb34));
      const emeh7a0m = Math.floor(fhg470rh / 60000);
      const defibq = Math.floor((fhg470rh % 60000) / 1000);
      const opozh_ = fhg470rh % 1000;
      return `${String(emeh7a0m).padStart(2, '0')}:${String(defibq).padStart(2, '0')}.${String(opozh_).padStart(3, '0')}`;
    }

    jnsb17(qhlluc6) {
      if (qhlluc6 === 0) return '±0.000s';
      const nsvvf43sv = qhlluc6 > 0 ? '+' : '-';
      const eunuvua = Math.abs(Math.round(qhlluc6));
      if (eunuvua >= 60000) return `${nsvvf43sv}${this.ldh1pi9dh(eunuvua)}`;
      return `${nsvvf43sv}${(eunuvua / 1000).toFixed(3)}s`;
    }

    alm5ycolm() {
      if (!this.#qouv5y) return;
      const a87byk287 = document.getElementById('speedrunTimer');
      const aiyeyh8i = document.getElementById('timerLabel');
      if (!a87byk287 || !aiyeyh8i) return;
      aiyeyh8i.textContent = `${this.eugim7su(this.#qouv5y.runMode)} Time`;
      a87byk287.textContent = this.#qouv5y.runMode.startsWith('speedrun_')
        ? this.ldh1pi9dh(this.#nt8quz.p_12td9_())
        : '—';
    }

    async vlce9d7() {
      if (!this.#yu3fqd8u3) return;
      const mqm17j4qm = this.#nt8quz.q16lfev1()?.activeSlot || 1;
      if (this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete) {
        this.#qouv5y.paused = true;
        await this.#nt8quz.drl28ax(qjnzib2j(13), { slot: mqm17j4qm }).catch(() => {});
      }

      this.#ard9j1frd = mqm17j4qm;
      this.#fpjglr7 = true;
      this.#hvlre4gvl = 'infinite';
      document.querySelectorAll('.mode-btn').forEach((nyys3r4y) => {
        nyys3r4y.classList.toggle('active', nyys3r4y.dataset.mode === 'infinite');
      });
      this.r0kim4b0k();

      document.getElementById('modeModalMessage').textContent =
        `Starting a new run replaces Slot #${this.#ard9j1frd}. Choose a mode and difficulty.`;
      vd0so9('modeSelectModal');
    }

    async z2hmgqp2() {
      this.#fpjglr7 = false;
      this.#ard9j1frd = null;
      tch86drc('modeSelectModal');

      if (this.#ghjljb === 'game' && this.#qouv5y && !this.#qouv5y.over && !this.#qouv5y.complete) {
        this.#qouv5y.paused = false;
        const tlpftpal = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        await this.#nt8quz.drl28ax(qjnzib2j(14), { slot: tlpftpal }).catch(() => {});
      }
    }

    async wflgnxuf() {
      if (!this.#fpjglr7 || !this.#yu3fqd8u3) return;
      const y5j0nw = this.#ard9j1frd || this.#nt8quz.q16lfev1()?.activeSlot || 1;
      const iu8cnq5u8 = this.#v1i76t[this.#hvlre4gvl] ? this.#hvlre4gvl : 'infinite';
      const owe_0mwwe = document.getElementById('modeDifficultySelect')?.value || 'medium';
      const hsy8oa5sy = rtu25p1tu(iu8cnq5u8, owe_0mwwe);

      this.#fpjglr7 = false;
      this.#ard9j1frd = null;
      tch86drc('modeSelectModal');
      await this.b1c3_ao1(y5j0nw, iu8cnq5u8, hsy8oa5sy);
    }

    async b1c3_ao1(il2h5pu, kj1bc1, ltw_k0) {
      this.#_fek508 = [];
      this.#__4dhnz = false;
      this.#ml4kwx8l4 = this.#quplb_fu();

      const wjaafk = this.#nt8quz.q16lfev1();
      const njfzdy5jf = kj1bc1 === 'hell' ? 1 : (1 + (wjaafk?.meta?.permUpgrades?.startAmmo || 0));
      this.#qouv5y = {
        runMode: kj1bc1,
        target: this.#v1i76t[kj1bc1].target,
        level: 1,
        score: 0,
        coins: wjaafk?.meta?.coins || 0,
        gems: wjaafk?.meta?.gems || 0,
        permUpgrades: kj1bc1 === 'hell'
          ? { startAmmo: 0, critChance: 0, ballSpeed: 0, luck: 0, gemLuck: 0, rebound: 0 }
          : { ...(wjaafk?.meta?.permUpgrades || {}) },
        difficulty: ltw_k0,
        ballCount: njfzdy5jf,
        anchorX: cu2pc20u / 2,
        balls: ts05mx5s0(cu2pc20u / 2, njfzdy5jf),
        bricks: [],
        bonusBalls: [],
        buffs: { doubleDamageTurns: 0 },
        shopPurchases: { doubleDamage: 0, laserWipe: 0 },
        pendingAmmo: 0,
        paused: false,
        turnInProgress: false,
        brickMoving: false,
        over: false,
        complete: false,
        elapsedMs: 0,
        bestLevel: 1,
        runBricks: 0,
        runShots: 0,
        runDamage: 0,
        bestCombo: 0,
        turnCombo: 0,
        secLevel: new fqgfyf(1),
        secCoins: new fqgfyf(wjaafk?.meta?.coins || 0),
        secGems: new fqgfyf(wjaafk?.meta?.gems || 0),
        secBallCount: new fqgfyf(njfzdy5jf),
        overlordTimer: 0,
        overlordDialogue: kj1bc1 === 'tartarus'
          ? '"Welcome to the abyss below Hell..."'
          : '"Mortal, your defiance amuses me..."',
        tasRun: { lastElapsed: 0, segment: 0, splits: [], deltas: [] }
      };

      this.wdfowtkd(false);

      try {
        const eqspz0uqs = await this.#nt8quz.drl28ax(qjnzib2j(12), {
          slot: il2h5pu,
          mode: kj1bc1,
          difficulty: ltw_k0,
          bricks: this.#qouv5y.bricks,
          bonusBalls: this.#qouv5y.bonusBalls
        });
        this.#x5ksbya5(eqspz0uqs, true);
        const zi9y0r = document.getElementById('difficultySelect');
        if (zi9y0r) zi9y0r.value = ltw_k0;
        await this.fdn6thq(true);
      } catch {}
    }

    b2au5dm2() {
      if (!this.#qouv5y || !this.#qouv5y.turnInProgress) return;
      this.#__4dhnz = !this.#__4dhnz;
      this.qsi906ws();
    }

    qsi906ws() {
      const a_1pp0e_ = document.getElementById('fastForwardBtn');
      if (!a_1pp0e_) return;
      a_1pp0e_.innerHTML = `<i class="fa-solid fa-forward" aria-hidden="true"></i> Fast: ${this.#__4dhnz ? '3x' : '1x'}`;
      a_1pp0e_.className = this.#__4dhnz ? 'primary-btn' : 'secondary';
    }

    async xoaiiwwoa() {
      if (!this.#yu3fqd8u3) return;
      try {
        const sfb720tfb = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        const m3kxur = await this.#nt8quz.wb3oxgcb('file', sfb720tfb);
        const j68ac9i = new Blob([m3kxur], { type: 'application/json' });
        const s7jnyq = URL.createObjectURL(j68ac9i);
        const pev9l6q = document.createElement('a');
        pev9l6q.href = s7jnyq;
        pev9l6q.download = `brick_breaker_v14_slot${sfb720tfb}_${this.#qouv5y?.runMode || 'save'}_level_${this.#qouv5y?.level || 1}.json`;
        pev9l6q.click();
        URL.revokeObjectURL(s7jnyq);
      } catch {
        ud9tddy('Export Error', 'Could not generate encrypted backup.');
      }
    }

    async semdvs() {
      if (!this.#yu3fqd8u3) return;
      try {
        const fzgnh1ezg = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        const hur9q2au = await this.#nt8quz.wb3oxgcb('code', fzgnh1ezg);
        const _3xjw0j3 = document.createElement('div');
        _3xjw0j3.className = 'modal-overlay active';
        _3xjw0j3.innerHTML = `
          <div class="modal-content" style="max-width:620px;">
            <button type="button" class="modal-close" aria-label="Close">&times;</button>
            <h2>Encrypted Save Code</h2>
            <p class="muted">Authenticated v14 save code. Copy to back up your run and shared records.</p>
            <textarea class="save-code-input" rows="10" readonly></textarea>
            <div class="modal-actions">
              <button type="button" class="copyBtn">Copy code</button>
            </div>
          </div>
        `;
        _3xjw0j3.querySelector('textarea').value = hur9q2au;
        _3xjw0j3.querySelector('.modal-close').onclick = (hex4ycs) => { if (gpygdafpy(hex4ycs)) _3xjw0j3.remove(); };
        _3xjw0j3.querySelector('.copyBtn').onclick = async (ya9sffv) => {
          if (!gpygdafpy(ya9sffv)) return;
          const vu1mhcc = _3xjw0j3.querySelector('.copyBtn');
          try {
            await navigator.clipboard.writeText(hur9q2au);
          } catch {
            _3xjw0j3.querySelector('textarea').select();
            document.execCommand('copy');
          }
          vu1mhcc.textContent = 'Copied!';
          setTimeout(() => { vu1mhcc.textContent = 'Copy code'; }, 1500);
        };
        czgqxfh.call(_3xjw0j3, 'click', (oqlkyq) => {
          if (gpygdafpy(oqlkyq) && oqlkyq.target === _3xjw0j3) _3xjw0j3.remove();
        });
        document.body.appendChild(_3xjw0j3);
      } catch {
        ud9tddy('Export Error', 'Could not export save code.');
      }
    }

    lsarrrc() {
      if (!this.#yu3fqd8u3) return;
      const la1r7iia = document.createElement('div');
      la1r7iia.className = 'modal-overlay active';
      la1r7iia.innerHTML = `
        <div class="modal-content" style="max-width:560px;">
          <button type="button" class="modal-close" aria-label="Close">&times;</button>
          <h2>Import Save Code</h2>
          <p class="muted">Paste an authenticated v14 save code below.</p>
          <textarea class="save-code-input" rows="8" placeholder="Paste BB14E1: save code here..."></textarea>
          <div class="modal-actions">
            <button type="button" class="secondary cancelBtn">Cancel</button>
            <button type="button" class="primary-btn applyBtn">Load Save Code</button>
          </div>
        </div>
      `;
      const wyglzm = () => la1r7iia.remove();
      la1r7iia.querySelector('.modal-close').onclick = (imag10_m) => { if (gpygdafpy(imag10_m)) wyglzm(); };
      la1r7iia.querySelector('.cancelBtn').onclick = (xwsct49) => { if (gpygdafpy(xwsct49)) wyglzm(); };
      la1r7iia.querySelector('.applyBtn').onclick = async (i2zsuy22z) => {
        if (!gpygdafpy(i2zsuy22z)) return;
        const z1ve5r7 = la1r7iia.querySelector('textarea').value;
        if (!z1ve5r7 || !z1ve5r7.trim()) return;
        try {
          const qsz2s_wsz = this.#nt8quz.q16lfev1()?.activeSlot || 1;
          const lcy10xj = await this.#nt8quz._xyued(z1ve5r7, qsz2s_wsz);
          this.#x5ksbya5(lcy10xj, true);
          this.#ml4kwx8l4 = this.#quplb_fu();
          tch86drc('settingsModal');
          wyglzm();
          this.n3fwr4();
          this.cbfnvb6b();
          if (lcy10xj.activeRun) {
            await this.fdn6thq(true);
          }
          ud9tddy('Save Loaded', 'Authenticated save code loaded successfully.');
        } catch {
          ud9tddy('Authentication Failed', 'Invalid or tampered save data.');
        }
      };
      czgqxfh.call(la1r7iia, 'click', (a6crsac6) => {
        if (gpygdafpy(a6crsac6) && a6crsac6.target === la1r7iia) wyglzm();
      });
      document.body.appendChild(la1r7iia);
    }

    pu5zc0au(wvhrnr, sgb8mv4g, nobmncio = true) {
      const y2mlmv02 = wvhrnr.target.files?.[0];
      if (!y2mlmv02 || !this.#yu3fqd8u3) return;
      const yrx0y0br = new FileReader();
      yrx0y0br.onload = async () => {
        try {
          const bdsc1sm = String(yrx0y0br.result || '');
          const nzm7rl = await this.#nt8quz._xyued(bdsc1sm, sgb8mv4g);
          this.#x5ksbya5(nzm7rl, nobmncio);
          this.#ml4kwx8l4 = this.#quplb_fu();
          tch86drc('settingsModal');
          this.n3fwr4();
          this.cbfnvb6b();
          if (nobmncio && nzm7rl.activeRun) {
            await this.fdn6thq(true);
          }
          ud9tddy('Save Loaded', 'Authenticated backup loaded successfully.');
        } catch {
          ud9tddy('Authentication Failed', 'Invalid or tampered save data.');
        }
        wvhrnr.target.value = '';
      };
      yrx0y0br.readAsText(y2mlmv02);
    }

    cfi2rjtf() {
      if (!this.#yu3fqd8u3) return;
      t3c_oul(
        'Wipe All Data',
        'Are you sure you want to wipe all data? This will permanently delete all 5 save slots, upgrades, high scores, speedrun records, TAS splits, profile, and lifetime stats.',
        async () => {
          try { ggl3y6(lypgza_yp); } catch {}
          await this.#nt8quz.drl28ax(qjnzib2j(23), {});
          this.#_fek508 = [];
          this.#qouv5y = null;
          this.#ml4kwx8l4 = this.#quplb_fu();
          tch86drc('settingsModal');
          this.iw_z_hv();
          this.n3fwr4();
          await this.fs_jzo(true);
        },
        'Wipe Everything',
        'danger'
      );
    }

    qr82u6u(poxnx8fox = null) {
      let gmlt3r;
      let o0i2w710i;

      if (Number.isFinite(poxnx8fox)) {
        const yyqqs2py = psp2dfwsp(poxnx8fox, -175, -5);
        const eiyp_mgiy = yyqqs2py * Math.PI / 180;
        gmlt3r = Math.cos(eiyp_mgiy);
        o0i2w710i = Math.sin(eiyp_mgiy);
        if (!Number.isFinite(o0i2w710i) || o0i2w710i > -0.08) o0i2w710i = -0.08;
      } else {
        const pfq6_g4f = Number.isFinite(this.#l8cqjt.x) ? this.#l8cqjt.x : cu2pc20u / 2;
        const psmwcdwsm = Math.min(Number.isFinite(this.#l8cqjt.y) ? this.#l8cqjt.y : 400, g16_o8 - 80);
        gmlt3r = pfq6_g4f - this.#qouv5y.anchorX;
        o0i2w710i = psmwcdwsm - (g16_o8 - 20);
        if (o0i2w710i > -40) o0i2w710i = -40;
      }

      const fm0ec77m0 = Math.hypot(gmlt3r, o0i2w710i) || 1;
      return { x: gmlt3r / fm0ec77m0, y: o0i2w710i / fm0ec77m0 };
    }

    pbeze7() {
      const n7moa8i = this.qr82u6u();
      return Math.atan2(n7moa8i.y, n7moa8i.x);
    }

    nmgfujfm(d319zp, ymc2ew, fkq3544, gxmlmx, yc134s, iskjychsk) {
      const qdfswq4d = yc134s.x - iskjychsk;
      const fn99e4 = yc134s.x + yc134s.w + iskjychsk;
      const gjaqaaq = yc134s.y - iskjychsk;
      const p43bwio43 = yc134s.y + yc134s.h + iskjychsk;

      let d2d2q0l2d = -Infinity;
      let dem1t8fem = Infinity;
      let xa51ahva = 0;
      let ag7eds4g = 0;

      if (Math.abs(fkq3544) < 1e-9) {
        if (d319zp < qdfswq4d || d319zp > fn99e4) return null;
      } else {
        const g8qcw0x = (qdfswq4d - d319zp) / fkq3544;
        const r8ak_j98 = (fn99e4 - d319zp) / fkq3544;
        const heaod1b = Math.min(g8qcw0x, r8ak_j98);
        const bexsb8t = Math.max(g8qcw0x, r8ak_j98);
        if (heaod1b > d2d2q0l2d) {
          d2d2q0l2d = heaod1b;
          xa51ahva = fkq3544 > 0 ? -1 : 1;
          ag7eds4g = 0;
        }
        dem1t8fem = Math.min(dem1t8fem, bexsb8t);
      }

      if (Math.abs(gxmlmx) < 1e-9) {
        if (ymc2ew < gjaqaaq || ymc2ew > p43bwio43) return null;
      } else {
        const uq8u0dkq = (gjaqaaq - ymc2ew) / gxmlmx;
        const uki40sn = (p43bwio43 - ymc2ew) / gxmlmx;
        const az826pvz8 = Math.min(uq8u0dkq, uki40sn);
        const mtqf9_ = Math.max(uq8u0dkq, uki40sn);
        if (az826pvz8 > d2d2q0l2d) {
          d2d2q0l2d = az826pvz8;
          xa51ahva = 0;
          ag7eds4g = gxmlmx > 0 ? -1 : 1;
        }
        dem1t8fem = Math.min(dem1t8fem, mtqf9_);
      }

      if (dem1t8fem < d2d2q0l2d || dem1t8fem < 0) return null;
      if (d2d2q0l2d < 0) return { distance: dem1t8fem, normalX: -xa51ahva, normalY: -ag7eds4g };
      return { distance: d2d2q0l2d, normalX: xa51ahva, normalY: ag7eds4g };
    }

    b_605_8_6(tn4x160n4 = null) {
      if (!this.#qouv5y) return [];
      const sjg56e = 16;
      let prpoi0cr = this.#qouv5y.anchorX;
      let i9jz7ug9 = g16_o8 - 20;
      const ooxc6r2o = this.qr82u6u(tn4x160n4);
      let p4sjdey4 = ooxc6r2o.x;
      let sp6f7u4p6 = ooxc6r2o.y;
      const pl3p1gml = [{ x: prpoi0cr, y: i9jz7ug9 }];

      for (let dxy3mxf = 0; dxy3mxf < 32; dxy3mxf++) {
        let a1y50v91y = Infinity;
        let yuvpu7 = null;
        let jvbxhg = 0;
        let ht4bcxdt = 0;
        const c3vnbv5 = [];

        if (p4sjdey4 > 1e-9) c3vnbv5.push({ distance: (cu2pc20u - sjg56e - prpoi0cr) / p4sjdey4, normalX: -1, normalY: 0, type: 'wall' });
        else if (p4sjdey4 < -1e-9) c3vnbv5.push({ distance: (sjg56e - prpoi0cr) / p4sjdey4, normalX: 1, normalY: 0, type: 'wall' });
        if (sp6f7u4p6 < -1e-9) c3vnbv5.push({ distance: (ty96zncy + sjg56e - i9jz7ug9) / sp6f7u4p6, normalX: 0, normalY: 1, type: 'wall' });

        for (const g6v59sd6 of c3vnbv5) {
          if (g6v59sd6.distance > 0 && g6v59sd6.distance < a1y50v91y) {
            a1y50v91y = g6v59sd6.distance;
            yuvpu7 = g6v59sd6.type;
            jvbxhg = g6v59sd6.normalX;
            ht4bcxdt = g6v59sd6.normalY;
          }
        }

        for (const h8flmt of this.#qouv5y.bricks) {
          const ohskzp4hs = this.nmgfujfm(prpoi0cr, i9jz7ug9, p4sjdey4, sp6f7u4p6, h8flmt, sjg56e);
          if (ohskzp4hs && ohskzp4hs.distance > 0 && ohskzp4hs.distance < a1y50v91y) {
            a1y50v91y = ohskzp4hs.distance;
            yuvpu7 = 'brick';
            jvbxhg = ohskzp4hs.normalX;
            ht4bcxdt = ohskzp4hs.normalY;
          }
        }

        if (!Number.isFinite(a1y50v91y) || a1y50v91y <= 0) break;

        prpoi0cr += p4sjdey4 * a1y50v91y;
        i9jz7ug9 += sp6f7u4p6 * a1y50v91y;
        pl3p1gml.push({ x: prpoi0cr, y: i9jz7ug9 });

        if (yuvpu7 === 'brick') break;
        if (jvbxhg !== 0) p4sjdey4 *= -1;
        if (ht4bcxdt !== 0) sp6f7u4p6 *= -1;

        prpoi0cr += p4sjdey4 * 0.05;
        i9jz7ug9 += sp6f7u4p6 * 0.05;
      }

      return pl3p1gml;
    }

    r1hnt2(mzk4y7, sbg36ldbg) {
      if (mzk4y7 || sbg36ldbg) {
        const e88au2g88 = u5hx61w5();
        if (e88au2g88 < 0.16) return 'crawler';
        if (e88au2g88 < 0.26) return 'devil';
      }

      const wkdfzswk = u5hx61w5();
      let ij2z47gj2 = 'common';
      let h36imt0 = 0;
      for (const [h0nksx, ue0hk3le] of Object.entries(il3ywoil)) {
        h36imt0 += ue0hk3le;
        if (wkdfzswk <= h36imt0) {
          ij2z47gj2 = h0nksx;
          break;
        }
      }
      const tx9uf0i = levzuo7ev[ij2z47gj2] || levzuo7ev.common;
      return tx9uf0i[Math.floor(u5hx61w5() * tx9uf0i.length)];
    }

    wdfowtkd(yma_udc = this.#qouv5y.level > 1) {
      const jeqpllleq = this.prsjg0();
      const kth3ag6th = _q6_n_;
      const h5jrwc = yma_udc ? kth3ag6th - 80 : kth3ag6th;
      const iyzaqz = (this.#qouv5y.runMode === 'hell');
      const qd7f72 = (this.#qouv5y.runMode === 'tartarus');

      const c6azoxp6 = aezxojtez([0, 1, 2, 3, 4, 5]);
      const t130ifz1 = c6azoxp6[0];
      let glzaxwu = c6azoxp6.slice(1);

      this.#qouv5y.bonusBalls.push({
        x: t130ifz1 * 120 + 60,
        y: h5jrwc + 35,
        targetY: kth3ag6th + 35,
        r: 14,
        hit: false
      });

      if (qd7f72 && this.#qouv5y.level % 5 === 0) {
        const bnk5n2_nk = glzaxwu.slice().sort((ew7du1jw7, um25zs1m) => ew7du1jw7 - um25zs1m);
        for (let tvmspfa = 0; tvmspfa < bnk5n2_nk.length - 1; tvmspfa++) {
          if (bnk5n2_nk[tvmspfa + 1] === bnk5n2_nk[tvmspfa] + 1) {
            const dpya5m7p = bnk5n2_nk[tvmspfa];
            const apvew_rpv = bnk5n2_nk[tvmspfa + 1];
            const ukt_wr = Math.max(20, Math.round(this.#qouv5y.level * 12));
            this.#qouv5y.bricks.push({
              x: dpya5m7p * 120 + 5,
              y: h5jrwc,
              targetY: kth3ag6th,
              w: 230,
              h: 150,
              value: ukt_wr,
              type: 'titan',
              slideDir: 1,
              slideSpeed: 0
            });
            glzaxwu = glzaxwu.filter((jgi2uh6) => jgi2uh6 !== dpya5m7p && jgi2uh6 !== apvew_rpv);
            break;
          }
        }
      }

      const evtzconv = glzaxwu.slice(0, Math.min(jeqpllleq, glzaxwu.length));

      for (const kvktnid of evtzconv) {
        const f3trdq = this.r1hnt2(iyzaqz, qd7f72);

        let u07rj0 = this.#qouv5y.level;
        if (f3trdq === 'ammo') u07rj0 = Math.round(u07rj0 * 1.5);
        else if (f3trdq === 'tank') u07rj0 = Math.max(5, u07rj0 * 5);
        else if (f3trdq === 'angel' || f3trdq === 'turret') u07rj0 = 1;
        else if (f3trdq === 'crawler' || f3trdq === 'devil') u07rj0 = Math.max(1, Math.round(u07rj0 * 0.8));
        else if (['shield', 'shock', 'portal', 'teleport', 'parent', 'healer', 'directional', 'phase', 'magnet'].includes(f3trdq)) {
          u07rj0 = Math.max(1, Math.round(u07rj0 * 0.8));
        }

        if (iyzaqz) u07rj0 = Math.max(1, Math.round(u07rj0 * 2.5));
        else if (qd7f72) u07rj0 = Math.max(1, Math.round(u07rj0 * 3.5));

        const l65jhno = {
          x: kvktnid * 120 + 5,
          y: h5jrwc,
          targetY: kth3ag6th,
          w: 110,
          h: 70,
          value: u07rj0,
          type: f3trdq,
          slideDir: u5hx61w5() < 0.5 ? -1 : 1,
          slideSpeed: 1.5 + u5hx61w5()
        };

        if (f3trdq === 'directional') {
          l65jhno.allowedDirs = aezxojtez(['top', 'bottom', 'left', 'right']).slice(0, 2);
        }
        if (f3trdq === 'phase') {
          l65jhno.phase = u5hx61w5() < 0.5 ? 'solid' : 'liquid';
        }
        this.#qouv5y.bricks.push(l65jhno);
      }

      this.tvh3htjv();
    }

    tvh3htjv() {
      const vw7e74s = this.#qouv5y.bricks;
      const qjf4hv = [];

      for (const yp7uqcbp7 of vw7e74s) {
        if (!qjf4hv.some((r5681zi) => e_22n_(yp7uqcbp7, r5681zi))) {
          qjf4hv.push(yp7uqcbp7);
          continue;
        }

        let yq3foy = false;
        const kr61o4 = yp7uqcbp7.w > 120 ? 5 : 6;
        for (let zwe_z36 = 0; zwe_z36 < 8 && !yq3foy; zwe_z36++) {
          for (let barzxz_ar = 0; barzxz_ar < kr61o4 && !yq3foy; barzxz_ar++) {
            const voiuaw = {
              ...yp7uqcbp7,
              x: barzxz_ar * 120 + 5,
              y: _q6_n_ + zwe_z36 * 80,
              targetY: _q6_n_ + zwe_z36 * 80
            };
            if (!qjf4hv.some((g76bepo7) => e_22n_(voiuaw, g76bepo7))) {
              yp7uqcbp7.x = voiuaw.x;
              yp7uqcbp7.y = voiuaw.y;
              yp7uqcbp7.targetY = voiuaw.targetY;
              qjf4hv.push(yp7uqcbp7);
              yq3foy = true;
            }
          }
        }
      }

      this.#qouv5y.bricks = qjf4hv;
    }

    prsjg0() {
      switch (this.#qouv5y.difficulty) {
        case 'easy': return czqe49(1, 3);
        case 'hard': return czqe49(1, 5);
        case 'insane': return czqe49(3, 5);
        case 'asian': return czqe49(4, 5);
        default: return czqe49(1, 4);
      }
    }

    nhnimyeh() {
      if (!this.#qouv5y) return;
      this.#qouv5y.level = this.#qouv5y.secLevel._ew2iisew();
      this.#qouv5y.coins = this.#qouv5y.secCoins._ew2iisew();
      this.#qouv5y.gems = this.#qouv5y.secGems._ew2iisew();
      this.#qouv5y.ballCount = this.#qouv5y.secBallCount._ew2iisew();
    }

    _3plvmy3p(dl1s6bp) {
      const pedd0xbe = this.#qouv5y.runMode === 'hell' ? 0 : (Number(this.#qouv5y.permUpgrades.luck) || 0);
      const uj4jq5 = Math.round(dl1s6bp * (1 + pedd0xbe * 0.2));
      if (this.#ml4kwx8l4 && uj4jq5 > 0) this.#ml4kwx8l4.coinsGained += uj4jq5;
      const llcvun3 = this.#qouv5y.secCoins._ew2iisew();
      const st79l75 = Math.max(0, llcvun3 + uj4jq5);
      this.#qouv5y.coins = st79l75;
      this.#qouv5y.secCoins._m7aox4(st79l75);
      this.vo3jcs();
    }

    wenrn7(vt3n4y) {
      if (this.#qouv5y.runMode === 'hell' && vt3n4y > 0) return;
      if (this.#ml4kwx8l4 && vt3n4y > 0) this.#ml4kwx8l4.gemsGained += vt3n4y;
      const mgt1rh = this.#qouv5y.secGems._ew2iisew();
      const g9ic_f = Math.max(0, mgt1rh + vt3n4y);
      this.#qouv5y.gems = g9ic_f;
      this.#qouv5y.secGems._m7aox4(g9ic_f);
      this.vo3jcs();
    }

    rz2a05(u92fxhe9) {
      const _ax0ena = this.#qouv5y?.shopPurchases?.[u92fxhe9] || 0;
      if (u92fxhe9 === 'doubleDamage') return Math.round(30 * Math.pow(1.25, _ax0ena));
      if (u92fxhe9 === 'laserWipe') return Math.round(40 * Math.pow(1.3, _ax0ena));
      return 50;
    }

    async ybnbpvvb(znel_1hne) {
      if (!this.#yu3fqd8u3) return;
      if (this.#qouv5y && this.#qouv5y.runMode === 'hell' && this.#ghjljb === 'game') return;
      try {
        const ol_0x7 = await this.#nt8quz.drl28ax(qjnzib2j(17), {
          type: znel_1hne,
          inGame: this.#ghjljb === 'game'
        });
        this.#evjvyjc(ol_0x7);
        if (this.#qouv5y && this.#qouv5y.runMode !== 'hell' && znel_1hne === 'startAmmo' && this.#qouv5y.level === 1 && !this.#qouv5y.balls.some((h_52z00) => h_52z00.moving)) {
          this.#qouv5y.balls = ts05mx5s0(this.#qouv5y.anchorX, ol_0x7.activeRun?.ballCount || this.#qouv5y.ballCount);
        }
        this.cbfnvb6b();
        this.vo3jcs();
      } catch {}
    }

    async _jj2j20(d44hpb) {
      if (!this.#yu3fqd8u3 || !this.#qouv5y || this.#qouv5y.over || this.#qouv5y.complete || this.#qouv5y.runMode === 'hell') return;
      if (['hard', 'insane', 'asian'].includes(this.#qouv5y.difficulty)) return;
      const fc5tno = this.rz2a05(d44hpb);
      if (this.#qouv5y.coins < fc5tno) return;
      if (d44hpb === 'laserWipe' && !this.#qouv5y.bricks.length) return;

      const woxhoapox = d44hpb === 'laserWipe' ? this.#qouv5y.bricks.slice() : [];
      try {
        const sss0mjo = await this.#nt8quz.drl28ax(qjnzib2j(18), {
          slot: this.#nt8quz.q16lfev1()?.activeSlot || 1,
          type: d44hpb
        });
        if (d44hpb === 'laserWipe' && sss0mjo.activeRun) {
          const cmsz17 = Math.max(...woxhoapox.map((mbj9q6) => mbj9q6.y));
          for (const rgdvu5 of woxhoapox.filter((zq3utobq3) => Math.abs(zq3utobq3.y - cmsz17) < 0.5)) {
            this.o7sbc7v7s(rgdvu5);
          }
          this.#qouv5y.bricks = sss0mjo.activeRun.bricks.map((zh04fp) => ({ ...zh04fp }));
          this.#krj0inir.uog8mpq(true);
        }
        this.#evjvyjc(sss0mjo);
        this.vo3jcs();
      } catch {}
    }

    rjly5cpj(abdj044b) {
      const l_tes4 = abdj044b === 'speedrun';
      document.getElementById('generalTrackerPane').hidden = l_tes4;
      document.getElementById('speedrunTrackerPane').hidden = !l_tes4;
      document.getElementById('generalTrackerTab').classList.toggle('active', !l_tes4);
      document.getElementById('speedrunTrackerTab').classList.toggle('active', l_tes4);
      this._r5u9_o();
    }

    _r5u9_o() {
      const l80j3yd80 = this.#nt8quz.q16lfev1();
      if (!l80j3yd80) return;
      const vohm5i = l80j3yd80.modeRecords;
      const syzrtksyz = document.getElementById('modeTrackerList');

      if (syzrtksyz) {
        syzrtksyz.innerHTML = `
          <div class="tracker-row">
            <strong>Infinite best level</strong>
            <span>${Number(vohm5i.infinite) || 1}</span>
          </div>
          <div class="tracker-row">
            <strong>Hell Mode best level</strong>
            <span>${Number(vohm5i.hell) || 1}</span>
          </div>
          <div class="tracker-row">
            <strong>Tartarus best level</strong>
            <span>${Number(vohm5i.tartarus) || 1}</span>
          </div>`;
      }

      const h49svpw49 = document.getElementById('speedrunCategorySelect');
      const s3alsbk3a = document.getElementById('speedrunDiffSelect');
      const eq4vg9l = h49svpw49?.value || 'speedrun_25';
      const bqqr5u1q = s3alsbk3a?.value || 'medium';

      const dhuh3_shu = this.#v1i76t[eq4vg9l];
      const p4qxgla4 = l80j3yd80.speedrunRecords?.[eq4vg9l]?.[bqqr5u1q];
      const zpgl12n = document.getElementById('speedrunCategoryTracker');

      if (zpgl12n && dhuh3_shu && p4qxgla4) {
        zpgl12n.innerHTML = `
          <div class="tracker-row"><strong>Category</strong><span>${dhuh3_shu.label}</span></div>
          <div class="tracker-row"><strong>Difficulty</strong><span style="text-transform:uppercase">${bqqr5u1q}</span></div>
          <div class="tracker-row"><strong>Target level</strong><span>${dhuh3_shu.target}</span></div>
          <div class="tracker-row"><strong>Best time</strong><span>${p4qxgla4.bestMs === null ? 'No clear' : this.ldh1pi9dh(p4qxgla4.bestMs)}</span></div>
          <div class="tracker-row"><strong>Completions</strong><span>${p4qxgla4.clears}</span></div>`;
      }
    }

    bbngzr7() {
      const tf3njs7 = this.#nt8quz.q16lfev1();
      if (!tf3njs7) return;
      const w5mdulu5 = document.getElementById('leaderboardBody');
      const s4k_w0 = tf3njs7.scores || [];

      if (w5mdulu5) {
        if (!s4k_w0.length) {
          w5mdulu5.innerHTML = '<tr><td colspan="3" class="muted">No high scores yet.</td></tr>';
        } else {
          w5mdulu5.innerHTML = s4k_w0.map((fzsfao4, p1sei3) =>
            `<tr><td>${p1sei3 + 1}</td><td>${fzsfao4.mode || 'Infinite'}: Level ${Number(fzsfao4.score) || 0}</td><td>${fzsfao4.date || ''}</td></tr>`
          ).join('');
        }
      }

      const pi7js16 = tf3njs7.speedrunRecords || {};
      const ktpucl = [];
      for (const nvyjsnev of fqttd3a) {
        const rvph_jvv = `speedrun_${nvyjsnev}`;
        for (const eldjba5 of d28uzr) {
          const glkdsk = pi7js16[rvph_jvv]?.[eldjba5];
          if (glkdsk?.bestMs !== null && glkdsk?.bestMs !== undefined) {
            ktpucl.push(`<div class="tracker-row"><strong>${nvyjsnev} · ${eldjba5.toUpperCase()}</strong><span>${this.ldh1pi9dh(glkdsk.bestMs)} (${glkdsk.clears} clears)</span></div>`);
          }
        }
      }

      const uku6dk = document.getElementById('speedrunLeaderboard');
      if (uku6dk) {
        uku6dk.innerHTML = ktpucl.length ? ktpucl.join('') : '<p class="muted">No speedrun clears yet.</p>';
      }

      const jh043z5 = tf3njs7.stats || { ballsFired: 0, turnsSurvived: 0, gemsEarned: 0, coinsEarned: 0, damageDealt: 0, bricksBroken: 0, bricksByType: {} };
      const rg7mivpg7 = [
        ['Balls fired', jh043z5.ballsFired],
        ['Turns survived', jh043z5.turnsSurvived],
        ['Gems earned', jh043z5.gemsEarned],
        ['Coins earned', jh043z5.coinsEarned],
        ['Damage dealt', Number(jh043z5.damageDealt).toFixed(1)],
        ['Bricks broken', jh043z5.bricksBroken]
      ];
      const pk23txwk2 = _l_2uq.map((a9fo21w9) => [`${a9fo21w9[0].toUpperCase()}${a9fo21w9.slice(1)} bricks broken`, jh043z5.bricksByType?.[a9fo21w9] || 0]);

      const pk4emv9 = document.getElementById('lifetimeStats');
      if (pk4emv9) {
        pk4emv9.innerHTML = [...rg7mivpg7, ...pk23txwk2].map(([slcu715lc, kux1bsl]) => {
          return `<div class="tracker-row"><strong>${slcu715lc}</strong><span>${kux1bsl}</span></div>`;
        }).join('');
      }

      const b6t7lj = tf3njs7.achievements || [];
      const kneoqt = document.getElementById('achievementsList');
      if (kneoqt) {
        kneoqt.innerHTML = wz2omumz2.map((k9o9cgk) => {
          const piufan = b6t7lj.includes(k9o9cgk.id);
          return `
            <div class="buff-card" style="${piufan ? 'border-color:#38a169;' : 'opacity:0.7;'}">
              <div class="buff-info">
                <strong>${piufan ? '✓ ' : ''}${k9o9cgk.name}</strong>
                <span class="buff-desc">${k9o9cgk.desc}</span>
              </div>
              <span class="buff-status">+${k9o9cgk.rewardCoins}c / +${k9o9cgk.rewardGems}g</span>
            </div>`;
        }).join('');
      }
    }

    iskya9(a1hgm5) {
      const cs9qinos9 = {
        scores: 'leaderboardScoresPage',
        speedruns: 'leaderboardSpeedrunsPage',
        stats: 'leaderboardStatsPage',
        badges: 'leaderboardBadgesPage'
      };

      Object.entries(cs9qinos9).forEach(([oha3flp, smt76hc]) => {
        const g4y7aex = document.getElementById(smt76hc);
        if (g4y7aex) g4y7aex.hidden = oha3flp !== a1hgm5;
      });

      document.querySelectorAll('.leaderboard-tabs button').forEach((k3mvz6y3m) => {
        const j1ju2o_1 = k3mvz6y3m.textContent.toLowerCase();
        const nx2fb5 =
          (a1hgm5 === 'scores' && j1ju2o_1.includes('high scores')) ||
          (a1hgm5 === 'speedruns' && j1ju2o_1.includes('speedruns')) ||
          (a1hgm5 === 'stats' && j1ju2o_1.includes('lifetime')) ||
          (a1hgm5 === 'badges' && j1ju2o_1.includes('achievements'));
        k3mvz6y3m.classList.toggle('active', nx2fb5);
      });
    }

    clauu7h() {
      const tiu9flmi = this.#nt8quz.q16lfev1();
      if (!tiu9flmi) return;
      const gu45mk = tiu9flmi.meta;
      const pl_1xwvl_ = this.#qouv5y;
      const gk5_a54k = pl_1xwvl_ && pl_1xwvl_.runMode === 'hell' && this.#ghjljb === 'game';
      const c_deu8 = pl_1xwvl_ ? pl_1xwvl_.gems : gu45mk.gems;

      const elc3ew7 = document.getElementById('gemsCountModal');
      if (elc3ew7) elc3ew7.textContent = c_deu8;

      const gwzfn5cw = [
        ['startAmmo', 10, 5, 'permAmmoStatus', 'btnBuyPermAmmo'],
        ['critChance', 10, 6, 'permCritStatus', 'btnBuyPermCrit'],
        ['ballSpeed', 5, 8, 'permSpeedStatus', 'btnBuyPermSpeed'],
        ['luck', 5, 10, 'permLuckStatus', 'btnBuyPermLuck'],
        ['gemLuck', 8, 12, 'permGemStatus', 'btnBuyPermGem'],
        ['rebound', 10, 10, 'permReboundStatus', 'btnBuyPermRebound']
      ];

      for (const [ntg7eo_t, bah19f2a, rt1un4nt, _pc3on, i5_elt] of gwzfn5cw) {
        const a35s2li = gk5_a54k ? 0 : (Number(gu45mk.permUpgrades[ntg7eo_t]) || 0);
        const th5f9it = document.getElementById(_pc3on);
        const rn3941rn3 = document.getElementById(i5_elt);
        if (!th5f9it || !rn3941rn3) continue;

        if (gk5_a54k) {
          th5f9it.textContent = 'NULLIFIED IN HELL';
          rn3941rn3.textContent = 'LOCKED';
          rn3941rn3.disabled = true;
        } else if (a35s2li >= bah19f2a) {
          th5f9it.textContent = `MAXED (${bah19f2a})`;
          rn3941rn3.textContent = 'MAX';
          rn3941rn3.disabled = true;
        } else {
          const xhmm7t = Math.round(rt1un4nt * Math.pow(1.5, a35s2li));
          th5f9it.textContent = `Lvl ${a35s2li}/${bah19f2a} — ${xhmm7t} Gems`;
          rn3941rn3.textContent = `Upgrade (${xhmm7t})`;
          rn3941rn3.disabled = c_deu8 < xhmm7t;
        }
      }
    }

    vo3jcs() {
      const k6jpjr = this.#nt8quz.q16lfev1();
      if (!k6jpjr) return;
      const h7ir9rb7i = this.#qouv5y;
      const t80fbdf8 = h7ir9rb7i ? h7ir9rb7i.coins : k6jpjr.meta.coins;
      const p1e07n91e = h7ir9rb7i ? h7ir9rb7i.gems : k6jpjr.meta.gems;

      document.getElementById('trackerCoins').textContent = t80fbdf8;
      document.getElementById('trackerGems').textContent = p1e07n91e;
      document.getElementById('coinsCountTempModal').textContent = t80fbdf8;
      this.clauu7h();

      if (!h7ir9rb7i) return;

      this.nhnimyeh();

      const _aetlska = (h7ir9rb7i.runMode === 'hell');
      const txo4snc = (h7ir9rb7i.runMode === 'tartarus');
      const f06es5v0 = ['hard', 'insane', 'asian'].includes(h7ir9rb7i.difficulty) || _aetlska;

      document.getElementById('trackerActiveBuffs').textContent = _aetlska
        ? 'Hell Nullification (No Upgrades)'
        : f06es5v0
          ? 'Disabled (Hard+ Difficulty)'
          : h7ir9rb7i.buffs.doubleDamageTurns > 0
            ? `1.5x Damage (${h7ir9rb7i.buffs.doubleDamageTurns} turns)`
            : 'None';

      document.getElementById('buff15xStatus').textContent = f06es5v0
        ? 'Disabled'
        : h7ir9rb7i.buffs.doubleDamageTurns > 0
          ? `${h7ir9rb7i.buffs.doubleDamageTurns} turns left`
          : 'Inactive';

      const xne0y2x = document.getElementById('difficultySelect');
      if (xne0y2x) {
        xne0y2x.value = h7ir9rb7i.difficulty || 'medium';
        xne0y2x.disabled = h7ir9rb7i.level > 1 || h7ir9rb7i.over || h7ir9rb7i.complete;
        for (const kk7ywf of xne0y2x.options) {
          kk7ywf.disabled = txo4snc && !yab8i1da.includes(kk7ywf.value);
        }
      }

      const k5gjd475g = this.rz2a05('doubleDamage');
      const _aqiru6 = this.rz2a05('laserWipe');

      const ljpd2y0j = document.getElementById('btnBuy15x');
      ljpd2y0j.textContent = `Buy (${k5gjd475g} C)`;
      ljpd2y0j.disabled = f06es5v0 || h7ir9rb7i.coins < k5gjd475g || h7ir9rb7i.over || h7ir9rb7i.complete;

      const dfenne = document.getElementById('btnBuyLaser');
      dfenne.textContent = `Buy (${_aqiru6} C)`;
      dfenne.disabled = f06es5v0 || h7ir9rb7i.coins < _aqiru6 || !h7ir9rb7i.bricks.length || h7ir9rb7i.over || h7ir9rb7i.complete;

      const _tok5t7t = document.getElementById('overlordSpeech');
      if (_tok5t7t) {
        _tok5t7t.textContent = h7ir9rb7i.overlordDialogue || '"Mortal, your defiance amuses me..."';
      }

      document.getElementById('tasPanel').hidden = !h7ir9rb7i.runMode.startsWith('speedrun_');
      this.qsi906ws();
      this.cbfnvb6b();
      this.alm5ycolm();
      this._r5u9_o();
      this.iw48fy2w();
      this.clqx691();
    }

    iw48fy2w() {
      if (!this.#qouv5y) return;

      const v5oie50 = document.getElementById('analysisAngleInput');
      const hbe_p9wb = document.activeElement === v5oie50;
      const ewegqb3 = this.pbeze7();
      const lmzwz44 = ewegqb3 * 180 / Math.PI;

      if (!hbe_p9wb) {
        v5oie50.value = lmzwz44.toFixed(1);
      }

      const soi5din = Number.isFinite(Number(v5oie50.value)) && hbe_p9wb
        ? Number(v5oie50.value)
        : lmzwz44;

      const xnrvi7o = soi5din * Math.PI / 180;
      const evb0jihv = Math.cos(xnrvi7o);
      const btat5zv = Math.sin(xnrvi7o);
      const shznopmhz = this.#qouv5y.runMode === 'hell'
        ? 1
        : 1 + (Number(this.#qouv5y.permUpgrades.ballSpeed) || 0) * 0.1;
      const ghejijnhe = 11 * shznopmhz;
      const iufviwfu = Math.abs(btat5zv) < 0.001 ? 0.001 : btat5zv;

      const ja_wpp0 = g16_o8 - 20;
      const vrk4ae = Math.max(0, (ty96zncy - ja_wpp0) / (iufviwfu * ghejijnhe));
      const hhsh8nuhs = evb0jihv * ghejijnhe * vrk4ae;

      document.getElementById('analysisAngle').textContent = `${soi5din.toFixed(2)}°`;
      document.getElementById('analysisDetails').innerHTML = `
        <div>Mouse aim: <strong>${lmzwz44.toFixed(2)}°</strong></div>
        <div>Selected angle: <strong>${soi5din.toFixed(2)}°</strong></div>
        <div>Direction vector: <strong>(${evb0jihv.toFixed(4)}, ${btat5zv.toFixed(4)})</strong></div>
        <div>Velocity: <strong>(${(evb0jihv * ghejijnhe).toFixed(2)}, ${(btat5zv * ghejijnhe).toFixed(2)}) px/frame</strong></div>
        <div>Speed magnitude: <strong>${ghejijnhe.toFixed(2)} px/frame</strong></div>
        <div>Estimated time to top line: <strong>${Number.isFinite(vrk4ae) ? vrk4ae.toFixed(1) : '—'} frames</strong></div>
        <div>Estimated horizontal travel: <strong>${Number.isFinite(hhsh8nuhs) ? hhsh8nuhs.toFixed(1) : '—'} px</strong></div>
        <div>Firing origin: <strong>(${this.#qouv5y.anchorX.toFixed(1)}, ${ja_wpp0})</strong></div>`;

      const xwo5_qj = document.getElementById('analyticsSummary');
      if (xwo5_qj) {
        const wilq0rnil = Math.max(0.05, this.#nt8quz.p_12td9_() / 60000);
        const wh5cjm_h = Math.round((this.#qouv5y.runBricks || 0) / wilq0rnil);
        const q2mc7e = this.#qouv5y.runShots > 0 ? Math.round((this.#qouv5y.runDamage || 0) / this.#qouv5y.runShots) : 0;
        const gixr2q1i = this.#qouv5y.runMode === 'hell' ? 0 : (Number(this.#qouv5y.permUpgrades.rebound) || 0) * 3;
        xwo5_qj.innerHTML = `
          <div class="tracker-row"><strong>Bricks / Min</strong><span>${wh5cjm_h}</span></div>
          <div class="tracker-row"><strong>Run Bricks</strong><span>${this.#qouv5y.runBricks || 0}</span></div>
          <div class="tracker-row"><strong>Avg Dmg / Shot</strong><span>${q2mc7e}</span></div>
          <div class="tracker-row"><strong>Best Combo</strong><span>${this.#qouv5y.bestCombo || 0}x</span></div>
          <div class="tracker-row"><strong>Floor Rebound</strong><span>${gixr2q1i}%</span></div>`;
      }
    }

    clqx691() {
      const na345h = document.getElementById('tasPanel');
      if (!na345h || !this.#qouv5y) return;

      if (!this.#qouv5y.runMode.startsWith('speedrun_')) {
        na345h.hidden = true;
        return;
      }

      na345h.hidden = false;
      const y83455683 = this.#nt8quz.q16lfev1();
      const wvv5v1gvv = `${this.#qouv5y.runMode}_${this.#qouv5y.difficulty}`;
      const s45hbrn = y83455683?.tas?.[wvv5v1gvv] || { bestSegments: [], splits: [] };
      const k4h0yl64h = this.#nt8quz.p_12td9_();
      const evafl6h = Array.isArray(this.#qouv5y.tasRun?.splits) ? this.#qouv5y.tasRun.splits : [];
      const kki2e4ak = Array.isArray(this.#qouv5y.tasRun?.deltas) ? this.#qouv5y.tasRun.deltas : [];
      const u_o4emq_ = [];
      let pqhjn3 = 0;

      const ubr7efqb = Math.max(evafl6h.length, s45hbrn.bestSegments.length);
      for (let nfvdr15 = 0; nfvdr15 < ubr7efqb; nfvdr15++) {
        const hx3k8tqx3 = evafl6h[nfvdr15];
        const sy87iuzy = s45hbrn.bestSegments[nfvdr15];
        if (Number.isFinite(sy87iuzy) && sy87iuzy > 0) pqhjn3 += sy87iuzy;
        if (!Number.isFinite(hx3k8tqx3) && !Number.isFinite(sy87iuzy)) continue;

        const sz3a9il = kki2e4ak[nfvdr15];
        let ueajhr = '<small class="muted">—</small>';
        if (Number.isFinite(hx3k8tqx3)) {
          if (Number.isFinite(sz3a9il)) {
            const vz5kwsc = sz3a9il <= 0 ? 'tas-delta-faster' : 'tas-delta-slower';
            ueajhr = `<small class="${vz5kwsc}">${this.jnsb17(sz3a9il)}</small>`;
          } else {
            ueajhr = '<small class="tas-delta-faster">NEW BEST</small>';
          }
        }

        u_o4emq_.push(`
          <div class="tracker-row">
            <div>
              <strong>Turn ${nfvdr15 + 1}</strong>
              <span class="tas-seg-sub">Best: ${Number.isFinite(sy87iuzy) ? this.ldh1pi9dh(sy87iuzy) : '—'}</span>
            </div>
            <span>
              ${Number.isFinite(hx3k8tqx3) ? this.ldh1pi9dh(hx3k8tqx3) : '—'}<br>
              ${ueajhr}
            </span>
          </div>
        `);
      }

      document.getElementById('tasSummary').innerHTML = `
        <div class="tracker-row"><strong>Current total</strong><span>${this.ldh1pi9dh(k4h0yl64h)}</span></div>
        <div class="tracker-row"><strong>Best segment total</strong><span>${pqhjn3 ? this.ldh1pi9dh(pqhjn3) : '—'}</span></div>
      `;

      document.getElementById('tasSegments').innerHTML = u_o4emq_.length
        ? u_o4emq_.join('')
        : '<p class="muted">Turn splits will appear after your first turn.</p>';
    }

    i17n08x1(g50h_x = null) {
      const p7fndgm = this.#qouv5y;
      if (!this.#yu3fqd8u3 || this.#nt8quz.e47hpkg() || this.#dg76p_8g7) return;
      if (!p7fndgm || this.#ghjljb !== 'game' || p7fndgm.paused || p7fndgm.brickMoving || p7fndgm.over || p7fndgm.complete) return;
      if (p7fndgm.turnInProgress || p7fndgm.balls.some((wi39nu3) => wi39nu3.moving)) return;

      p7fndgm.turnInProgress = true;
      p7fndgm.turnCombo = 0;
      p7fndgm.runShots = (p7fndgm.runShots || 0) + 1;
      this.#__4dhnz = false;
      this.#ml4kwx8l4 = this.#quplb_fu();

      const tz01vm2 = this.qr82u6u(g50h_x);
      const jy2aow4y2 = tz01vm2.x;
      const icjk5jz = tz01vm2.y;
      const cuc_dq1u = p7fndgm.runMode === 'hell'
        ? 1
        : (1 + (Number(p7fndgm.permUpgrades.ballSpeed) || 0) * 0.1);
      const tg4105ug4 = 11 * cuc_dq1u;

      p7fndgm.balls = p7fndgm.balls.slice(0, Math.max(1, p7fndgm.ballCount));
      p7fndgm.balls.forEach((t41q6ax, q2iwx3) => {
        t41q6ax.x = p7fndgm.anchorX;
        t41q6ax.y = g16_o8 - 20;
        t41q6ax.vx = jy2aow4y2 * tg4105ug4;
        t41q6ax.vy = icjk5jz * tg4105ug4;
        t41q6ax.moving = true;
        t41q6ax.downing = false;
        t41q6ax.shocking = false;
        t41q6ax.reboundsLeft = 2;
        t41q6ax.radius = 16;
        t41q6ax.delay = q2iwx3;
      });

      const _e8841e = this.#nt8quz.q16lfev1()?.activeSlot || 1;
      this.#nt8quz.drl28ax(qjnzib2j(9), {
        slot: _e8841e,
        angleDeg: Math.atan2(icjk5jz, jy2aow4y2) * 180 / Math.PI
      }).catch(() => {});

      this.qsi906ws();
    }

    _3mv7xi3() {
      if (!this.#qouv5y || this.#qouv5y.paused || this.#qouv5y.over || this.#qouv5y.complete) return;
      let rpkhz6ypk = false;
      for (const y0ihehg of this.#qouv5y.balls) {
        if (!y0ihehg.moving) continue;
        if (y0ihehg.delay > 0) {
          y0ihehg.moving = false;
          y0ihehg.downing = false;
          y0ihehg.shocking = false;
          y0ihehg.vx = 0;
          y0ihehg.vy = 0;
          y0ihehg.delay = 0;
          y0ihehg.x = this.#qouv5y.anchorX;
          y0ihehg.y = g16_o8 - 20;
          continue;
        }
        y0ihehg.downing = true;
        y0ihehg.vx = 0;
        y0ihehg.vy = 12;
        rpkhz6ypk = true;
      }

      if (!rpkhz6ypk && this.#qouv5y.turnInProgress && this.#qouv5y.balls.every((tgjzce) => !tgjzce.moving)) {
        this.trkj9f2rk();
      }
    }

    fjl6l0(z8a4ahv) {
      const zom0020om = this.#qouv5y;
      let k562_8 = false;

      for (const _tiqgxxti of zom0020om.bricks) {
        if (_tiqgxxti.y < _tiqgxxti.targetY) {
          _tiqgxxti.y = Math.min(_tiqgxxti.y + 10 * z8a4ahv, _tiqgxxti.targetY);
        } else if (_tiqgxxti.y > _tiqgxxti.targetY) {
          _tiqgxxti.y = Math.max(_tiqgxxti.y - 10 * z8a4ahv, _tiqgxxti.targetY);
        }
        if (Math.abs(_tiqgxxti.y - _tiqgxxti.targetY) > 0.01) k562_8 = true;
      }

      if ((zom0020om.runMode === 'hell' || zom0020om.runMode === 'tartarus') && !zom0020om.turnInProgress && !zom0020om.brickMoving) {
        for (const y5redld of zom0020om.bricks) {
          if (y5redld.type !== 'crawler') continue;
          const _cpd3l_c = y5redld.y + 0.25 * z8a4ahv;
          const itqj5kf = zom0020om.bricks.some((abwlx_jb) => {
            if (abwlx_jb === y5redld) return false;
            const zlskn_h = y5redld.x < abwlx_jb.x + abwlx_jb.w && y5redld.x + y5redld.w > abwlx_jb.x;
            const r9ii2s = (_cpd3l_c + y5redld.h > abwlx_jb.y) && (y5redld.y + y5redld.h <= abwlx_jb.y + 5);
            return zlskn_h && r9ii2s;
          });
          if (!itqj5kf) {
            y5redld.y = _cpd3l_c;
            y5redld.targetY = y5redld.y;
          }
        }
      }

      if (!zom0020om.brickMoving) {
        for (const ldlrz3 of zom0020om.bricks) {
          if (ldlrz3.type !== 'slider') continue;
          const ru3fgeo = 5;
          const xypt3ogy = cu2pc20u - 5 - ldlrz3.w;
          const z3cy_e5 = ldlrz3.x + ldlrz3.slideDir * ldlrz3.slideSpeed * z8a4ahv;
          let my1b2nyy1 = null;

          if (z3cy_e5 <= ru3fgeo) {
            ldlrz3.x = ru3fgeo;
            ldlrz3.slideDir = 1;
            continue;
          }
          if (z3cy_e5 >= xypt3ogy) {
            ldlrz3.x = xypt3ogy;
            ldlrz3.slideDir = -1;
            continue;
          }

          for (const tavzi5 of zom0020om.bricks) {
            if (tavzi5 === ldlrz3) continue;
            const c7go01n7 = ldlrz3.y < tavzi5.y + tavzi5.h && ldlrz3.y + ldlrz3.h > tavzi5.y;
            const exvl59r = z3cy_e5 < tavzi5.x + tavzi5.w && z3cy_e5 + ldlrz3.w > tavzi5.x;
            if (c7go01n7 && exvl59r) {
              my1b2nyy1 = tavzi5;
              break;
            }
          }

          if (my1b2nyy1) {
            if (ldlrz3.slideDir > 0) {
              ldlrz3.x = Math.max(ru3fgeo, my1b2nyy1.x - ldlrz3.w);
              ldlrz3.slideDir = -1;
            } else {
              ldlrz3.x = Math.min(xypt3ogy, my1b2nyy1.x + my1b2nyy1.w);
              ldlrz3.slideDir = 1;
            }
          } else {
            ldlrz3.x = z3cy_e5;
          }
        }
      }

      if (zom0020om.brickMoving && !k562_8) {
        zom0020om.brickMoving = false;
        zom0020om.bonusBalls = zom0020om.bonusBalls.filter((fq1ftb6) => !fq1ftb6.hit);
        this.tvh3htjv();
        this.vo3jcs();
        const ms_zx06s = this.#nt8quz.q16lfev1()?.activeSlot || 1;
        this.#nt8quz.drl28ax(qjnzib2j(11), {
          slot: ms_zx06s,
          bricks: zom0020om.bricks,
          bonusBalls: zom0020om.bonusBalls,
          anchorX: zom0020om.anchorX
        }).catch(() => {});
      }
    }

    p6p8mge6(xhqdbil) {
      for (const qkca_i of this.#qouv5y.bonusBalls) {
        if (!Number.isFinite(qkca_i.targetY)) qkca_i.targetY = qkca_i.y;
        if (qkca_i.y < qkca_i.targetY) {
          qkca_i.y = Math.min(qkca_i.y + 10 * xhqdbil, qkca_i.targetY);
        } else if (qkca_i.y > qkca_i.targetY) {
          qkca_i.y = Math.max(qkca_i.y - 10 * xhqdbil, qkca_i.targetY);
        }
      }
    }

    a9rktbg9(bdo59b) {
      const d_t6hb3_t = this.#qouv5y;
      const vcddz_y = d_t6hb3_t.runMode === 'hell'
        ? 1
        : (1 + (Number(d_t6hb3_t.permUpgrades.ballSpeed) || 0) * 0.1);
      const lyhhjg = 11 * vcddz_y;
      const qqfpp0xqf = Math.max(1, Math.ceil(lyhhjg / 8));
      const w8ke5xi = d_t6hb3_t.bricks.filter((pf0klpdf) => pf0klpdf.type === 'magnet');
      const jaoeh6uao = d_t6hb3_t.runMode === 'hell'
        ? 0
        : (Number(d_t6hb3_t.permUpgrades.rebound) || 0) * 0.03;

      for (const oyb7tlqy of d_t6hb3_t.balls) {
        if (!oyb7tlqy.moving) continue;
        if (oyb7tlqy.delay > 0) {
          oyb7tlqy.delay -= bdo59b;
          continue;
        }

        const zmi3_l6 = bdo59b / qqfpp0xqf;
        for (let ba7arpta = 0; ba7arpta < qqfpp0xqf; ba7arpta++) {
          if (!oyb7tlqy.moving) break;

          for (const i9sj9n of w8ke5xi) {
            const a0u_384 = i9sj9n.x + i9sj9n.w / 2;
            const qxck9n7xc = i9sj9n.y + i9sj9n.h / 2;
            const tx8pfk = Math.hypot(a0u_384 - oyb7tlqy.x, qxck9n7xc - oyb7tlqy.y);
            if (tx8pfk < 180 && tx8pfk > 2) {
              const n3pl97 = 0.15 * zmi3_l6;
              oyb7tlqy.vx += (a0u_384 - oyb7tlqy.x) / tx8pfk * n3pl97;
              oyb7tlqy.vy += (qxck9n7xc - oyb7tlqy.y) / tx8pfk * n3pl97;
            }
          }

          oyb7tlqy.x += oyb7tlqy.vx * zmi3_l6;
          oyb7tlqy.y += oyb7tlqy.vy * zmi3_l6;

          if (oyb7tlqy.x < oyb7tlqy.radius) {
            oyb7tlqy.x = oyb7tlqy.radius;
            oyb7tlqy.vx = Math.abs(oyb7tlqy.vx);
          } else if (oyb7tlqy.x > cu2pc20u - oyb7tlqy.radius) {
            oyb7tlqy.x = cu2pc20u - oyb7tlqy.radius;
            oyb7tlqy.vx = -Math.abs(oyb7tlqy.vx);
          }

          if (oyb7tlqy.y < ty96zncy) {
            oyb7tlqy.y = ty96zncy;
            oyb7tlqy.vy = Math.abs(oyb7tlqy.vy);
          }

          if (oyb7tlqy.shocking) {
            oyb7tlqy.vx = 0;
            oyb7tlqy.vy = 16;
          } else if (!oyb7tlqy.downing) {
            this.ttt6ge2t(oyb7tlqy);
          }

          for (const lkw3cm of d_t6hb3_t.bonusBalls) {
            if (!lkw3cm.hit && Math.hypot(oyb7tlqy.x - lkw3cm.x, oyb7tlqy.y - lkw3cm.y) < oyb7tlqy.radius + lkw3cm.r) {
              lkw3cm.hit = true;
              this.#krj0inir.r3800ke38();
            }
          }

          if (oyb7tlqy.y >= g16_o8 - 20) {
            if (!oyb7tlqy.downing && !oyb7tlqy.shocking && jaoeh6uao > 0 && (oyb7tlqy.reboundsLeft || 0) > 0 && u5hx61w5() < jaoeh6uao) {
              oyb7tlqy.reboundsLeft -= 1;
              oyb7tlqy.y = g16_o8 - 22;
              oyb7tlqy.vy = -Math.max(4, Math.abs(oyb7tlqy.vy));
              if (Math.abs(oyb7tlqy.vx) < 1) {
                oyb7tlqy.vx = (u5hx61w5() < 0.5 ? -1 : 1) * 2;
              }
              this.#krj0inir.dhy1hwhhy(2, d_t6hb3_t.runMode);
              continue;
            }

            oyb7tlqy.y = g16_o8 - 20;
            oyb7tlqy.moving = false;
            oyb7tlqy.downing = false;
            oyb7tlqy.shocking = false;
            oyb7tlqy.vx = 0;
            oyb7tlqy.vy = 0;
            d_t6hb3_t.anchorX = psp2dfwsp(oyb7tlqy.x, 20, cu2pc20u - 20);
          }
        }
      }

      if (d_t6hb3_t.turnInProgress && d_t6hb3_t.balls.length && d_t6hb3_t.balls.every((fbnvm1) => !fbnvm1.moving)) {
        this.trkj9f2rk();
      }
    }

    ttt6ge2t(fdjuq62d) {
      const k2rgk3y2r = this.#qouv5y.bricks.filter((hdryns) => hdryns.type === 'shield');

      for (const cp14sd of [...this.#qouv5y.bricks]) {
        if (!this.#qouv5y.bricks.includes(cp14sd)) continue;

        if (cp14sd.type === 'phase' && cp14sd.phase === 'liquid') {
          const d4u_i9i = psp2dfwsp(fdjuq62d.x, cp14sd.x, cp14sd.x + cp14sd.w);
          const xnnlar8 = psp2dfwsp(fdjuq62d.y, cp14sd.y, cp14sd.y + cp14sd.h);
          const qremqof = fdjuq62d.x - d4u_i9i;
          const xzrkbdq = fdjuq62d.y - xnnlar8;
          if (qremqof * qremqof + xzrkbdq * xzrkbdq <= fdjuq62d.radius * fdjuq62d.radius) {
            if (Math.abs(qremqof) > Math.abs(xzrkbdq)) fdjuq62d.vx *= -1;
            else fdjuq62d.vy *= -1;
          }
          continue;
        }

        const qv8b_gsv = psp2dfwsp(fdjuq62d.x, cp14sd.x, cp14sd.x + cp14sd.w);
        const bve67jw = psp2dfwsp(fdjuq62d.y, cp14sd.y, cp14sd.y + cp14sd.h);
        const un89j4en8 = fdjuq62d.x - qv8b_gsv;
        const mhffd_thf = fdjuq62d.y - bve67jw;
        if (un89j4en8 * un89j4en8 + mhffd_thf * mhffd_thf > fdjuq62d.radius * fdjuq62d.radius) continue;

        if (cp14sd.type !== 'shield' && cp14sd.type !== 'titan') {
          const k_2ct7 = k2rgk3y2r.some((ybawoeoba) => {
            const vcymldbcy = ybawoeoba.x + ybawoeoba.w / 2;
            const n49kdj849 = ybawoeoba.y + ybawoeoba.h / 2;
            const b42bdy_42 = cp14sd.x + cp14sd.w / 2;
            const i7ov1p27o = cp14sd.y + cp14sd.h / 2;
            return Math.hypot(vcymldbcy - b42bdy_42, n49kdj849 - i7ov1p27o) <= 150;
          });
          if (k_2ct7) {
            if (Math.abs(un89j4en8) > Math.abs(mhffd_thf)) fdjuq62d.vx *= -1;
            else fdjuq62d.vy *= -1;
            continue;
          }
        }

        if (cp14sd.type === 'directional' && cp14sd.allowedDirs) {
          const cp967ti = Math.abs(un89j4en8) > Math.abs(mhffd_thf) ? (un89j4en8 > 0 ? 'right' : 'left') : (mhffd_thf > 0 ? 'bottom' : 'top');
          if (!cp14sd.allowedDirs.includes(cp967ti)) {
            if (Math.abs(un89j4en8) > Math.abs(mhffd_thf)) fdjuq62d.vx *= -1;
            else fdjuq62d.vy *= -1;
            continue;
          }
        }

        let vrhs9hi = 1;
        if (this.#qouv5y.runMode !== 'hell' && !['hard', 'insane', 'asian'].includes(this.#qouv5y.difficulty) && this.#qouv5y.buffs.doubleDamageTurns > 0) {
          vrhs9hi = 1.5;
        }
        const onqe64 = this.#qouv5y.runMode === 'hell' ? 0 : (Number(this.#qouv5y.permUpgrades.critChance) || 0);
        if (onqe64 && u5hx61w5() < onqe64 * 0.05) vrhs9hi *= 3;

        cp14sd.value = Math.max(0, cp14sd.value - vrhs9hi);
        this.#qouv5y.runDamage = (this.#qouv5y.runDamage || 0) + vrhs9hi;
        this.#qouv5y.turnCombo = (this.#qouv5y.turnCombo || 0) + 1;
        this.#qouv5y.bestCombo = Math.max(this.#qouv5y.bestCombo || 0, this.#qouv5y.turnCombo);
        this.#qouv5y.score = (this.#qouv5y.score || 0) + Math.round(vrhs9hi * 10);

        if (this.#ml4kwx8l4) {
          this.#ml4kwx8l4.damageDealt += vrhs9hi;
          this.#ml4kwx8l4.turnHits += 1;
          this.#ml4kwx8l4.bestCombo = Math.max(this.#ml4kwx8l4.bestCombo, this.#qouv5y.turnCombo);
        }

        if (cp14sd.type === 'shock') {
          fdjuq62d.shocking = true;
          fdjuq62d.vx = 0;
          fdjuq62d.vy = 16;
          this.n05qcsq(fdjuq62d.x, fdjuq62d.y);
        } else if (cp14sd.type === 'portal') {
          const hsc7uvwsc = czqe49(40, cu2pc20u - 40);
          const orcfkgurc = czqe49(_q6_n_ + 120, g16_o8 - 120);
          this.ilaw6xql(fdjuq62d.x, fdjuq62d.y);
          fdjuq62d.x = hsc7uvwsc;
          fdjuq62d.y = orcfkgurc;
          this.ilaw6xql(fdjuq62d.x, fdjuq62d.y);
        } else {
          if (Math.abs(un89j4en8) > Math.abs(mhffd_thf)) fdjuq62d.vx *= -1;
          else fdjuq62d.vy *= -1;
        }

        this._3plvmy3p(1);

        if (cp14sd.value <= 0) {
          this.se1zjmce1(cp14sd);
        } else {
          this.#krj0inir.dhy1hwhhy(this.#qouv5y.turnCombo, this.#qouv5y.runMode);
        }
        break;
      }
    }

    se1zjmce1(vi030kki) {
      const _q6dchd = this.#qouv5y.bricks.indexOf(vi030kki);
      if (_q6dchd === -1) return;

      this.#qouv5y.bricks.splice(_q6dchd, 1);
      this.o7sbc7v7s(vi030kki);
      this.#krj0inir.uog8mpq(vi030kki.type === 'tnt' || vi030kki.type === 'titan');

      this.#qouv5y.runBricks = (this.#qouv5y.runBricks || 0) + 1;
      if (this.#ml4kwx8l4) {
        this.#ml4kwx8l4.bricksBrokenCount += 1;
        this.#ml4kwx8l4.brokenByType[vi030kki.type] = (this.#ml4kwx8l4.brokenByType[vi030kki.type] || 0) + 1;
        if (vi030kki.type === 'titan') this.#ml4kwx8l4.titanKills += 1;
        if (vi030kki.type === 'ammo') this.#ml4kwx8l4.ammoBroken += 1;
      }

      this._3plvmy3p(vi030kki.type === 'titan' ? 25 : 5);

      const jixh7iqix = this.#qouv5y.runMode === 'hell' ? 0 : (Number(this.#qouv5y.permUpgrades.gemLuck) || 0) * 0.03;
      if (this.#qouv5y.runMode !== 'hell') {
        if (vi030kki.type === 'titan') this.wenrn7(3);
        else if (u5hx61w5() < (0.25 + jixh7iqix)) this.wenrn7(1);
      }

      if (vi030kki.type === 'ammo') this.#qouv5y.pendingAmmo++;

      if (vi030kki.type === 'parent') {
        const trx5tqbrx = czqe49(1, 3);
        const _z0rvj3z0 = Math.max(1, Math.round(this.#qouv5y.level / 3));
        for (let rmp6vl3 = 0; rmp6vl3 < trx5tqbrx; rmp6vl3++) {
          const h7umypj = czqe49(0, 5);
          this.#qouv5y.bricks.push({
            x: h7umypj * 120 + 5,
            y: vi030kki.y,
            targetY: vi030kki.targetY,
            w: 110,
            h: 70,
            value: _z0rvj3z0,
            type: 'normal',
            slideDir: 1,
            slideSpeed: 1.5
          });
        }
        this.tvh3htjv();
      }

      if (vi030kki.type === 'tnt') {
        this.c2y7q0t2y(vi030kki);
        const n82uh9 = [...this.#qouv5y.bricks].filter((dhj3e2jh) =>
          Math.hypot((dhj3e2jh.x + dhj3e2jh.w / 2) - (vi030kki.x + vi030kki.w / 2), (dhj3e2jh.y + dhj3e2jh.h / 2) - (vi030kki.y + vi030kki.h / 2)) <= 180
        );
        for (const owkperc of n82uh9) {
          if (!this.#qouv5y.bricks.includes(owkperc)) continue;
          const j07psa60 = Math.ceil(this.#qouv5y.level * 0.8);
          owkperc.value = Math.max(0, owkperc.value - j07psa60);
          if (this.#ml4kwx8l4) this.#ml4kwx8l4.damageDealt += j07psa60;
          if (owkperc.value <= 0) this.se1zjmce1(owkperc);
        }
      }

      this.vo3jcs();
    }

    by338i() {
      const bhrek4 = this.#qouv5y.runMode === 'tartarus';
      const fxaaobaxa = bhrek4 ? 3.5 : 2.5;
      const gh1sso = [
        {
          dialogue: '"Feel the scorching heat! Your bricks shall heal and harden!"',
          action: () => {
            for (const xxh9z3 of this.#qouv5y.bricks) xxh9z3.value = Math.round(xxh9z3.value * 1.2 + 2);
          }
        },
        {
          dialogue: '"Darkness multiplies! A Devil spawns from the abyss!"',
          action: () => {
            const zjdobj = czqe49(0, 5);
            const y3pkjdu = Math.max(1, Math.round(this.#qouv5y.level * 0.8 * fxaaobaxa));
            this.#qouv5y.bricks.push({
              x: zjdobj * 120 + 5, y: _q6_n_, targetY: _q6_n_,
              w: 110, h: 70, value: y3pkjdu, type: 'devil', slideDir: 1, slideSpeed: 1.5
            });
            this.tvh3htjv();
          }
        },
        {
          dialogue: '"A crawler shall press upon your doom!"',
          action: () => {
            const n_o0mq = czqe49(0, 5);
            const y7foy0c7f = Math.max(1, Math.round(this.#qouv5y.level * 0.8 * fxaaobaxa));
            this.#qouv5y.bricks.push({
              x: n_o0mq * 120 + 5, y: _q6_n_, targetY: _q6_n_,
              w: 110, h: 70, value: y7foy0c7f, type: 'crawler', slideDir: 1, slideSpeed: 1.5
            });
            this.tvh3htjv();
          }
        },
        {
          dialogue: '"Perish in sulfur! Your balls shall falter and slow!"',
          action: () => {
            for (const wvtq5sjv of this.#qouv5y.balls) {
              wvtq5sjv.vx *= 0.8;
              wvtq5sjv.vy *= 0.8;
            }
          }
        }
      ];

      const ub_xg16b_ = gh1sso[Math.floor(u5hx61w5() * gh1sso.length)];
      this.#qouv5y.overlordDialogue = ub_xg16b_.dialogue;
      ub_xg16b_.action();
    }

    mgxtkbv(lkqjnu8kq) {
      if (this.#qouv5y.bricks.filter((kz8iin_) => kz8iin_.type === 'tank').length >= 3) return;
      const d1louxt1l = 80;
      const tkohdz_k = Math.max(1, Math.floor((lkqjnu8kq.y - _q6_n_) / d1louxt1l));
      const _v9yipwv9 = czqe49(1, tkohdz_k);
      const pg4r0n3g4 = lkqjnu8kq.y - _v9yipwv9 * d1louxt1l;
      if (pg4r0n3g4 < _q6_n_) return;

      const t24xvdv = this.#qouv5y.runMode === 'tartarus' ? 3.5 : 2.5;
      const gyj55oiyj = {
        x: czqe49(0, 5) * 120 + 5, y: pg4r0n3g4, targetY: pg4r0n3g4,
        w: 110, h: 70, value: Math.max(5, Math.round(this.#qouv5y.level * 5 * t24xvdv)),
        type: 'tank', slideDir: 1, slideSpeed: 1.5
      };

      if (!this.#qouv5y.bricks.some((ocr_w3ac) => e_22n_(gyj55oiyj, ocr_w3ac))) {
        this.#qouv5y.bricks.push(gyj55oiyj);
      }
    }

    async trkj9f2rk() {
      const tkb08u = this.#qouv5y;
      if (!tkb08u || !tkb08u.turnInProgress || tkb08u.paused || tkb08u.over || tkb08u.complete || this.#dg76p_8g7) return;

      this.#dg76p_8g7 = true;
      tkb08u.turnInProgress = false;
      tkb08u.brickMoving = true;
      this.#__4dhnz = false;

      if (tkb08u.runMode === 'hell' || tkb08u.runMode === 'tartarus') {
        tkb08u.overlordTimer++;
        if (tkb08u.overlordTimer >= 2) {
          tkb08u.overlordTimer = 0;
          this.by338i();
        }
        for (const niruud2ir of tkb08u.bricks.filter((r_mdeze) => r_mdeze.type === 'devil')) {
          this.mgxtkbv(niruud2ir);
        }
      }

      if (tkb08u.runMode !== 'hell' && !['hard', 'insane', 'asian'].includes(tkb08u.difficulty) && tkb08u.buffs.doubleDamageTurns > 0) {
        tkb08u.buffs.doubleDamageTurns--;
      }

      const b7zkeqq7z = tkb08u.level + 1;
      tkb08u.level = b7zkeqq7z;
      tkb08u.secLevel._m7aox4(b7zkeqq7z);
      tkb08u.bestLevel = Math.max(Number(tkb08u.bestLevel) || 1, b7zkeqq7z);

      this._3plvmy3p(10);

      for (const l5e4joo5e of tkb08u.bricks) {
        l5e4joo5e.targetY += 80;
        if (l5e4joo5e.type === 'phase') {
          l5e4joo5e.phase = l5e4joo5e.phase === 'solid' ? 'liquid' : 'solid';
        }
      }

      for (const mtr5vu5 of tkb08u.bricks.filter((jcd7zx9cd) => jcd7zx9cd.type === 'healer')) {
        const elwsotf = mtr5vu5.x + mtr5vu5.w / 2;
        const k_wzmg = mtr5vu5.y + mtr5vu5.h / 2;
        for (const hi7_nr of tkb08u.bricks) {
          if (hi7_nr === mtr5vu5) continue;
          if (Math.hypot(elwsotf - (hi7_nr.x + hi7_nr.w / 2), k_wzmg - (hi7_nr.y + hi7_nr.h / 2)) <= 180) {
            hi7_nr.value = Math.round(hi7_nr.value * 1.25);
          }
        }
      }

      for (const rv8ahxuv of tkb08u.bricks.filter((mv0_22fv0) => mv0_22fv0.type === 'angel')) {
        rv8ahxuv.value = 1;
        const vhmoue6hm = rv8ahxuv.x + rv8ahxuv.w / 2;
        const fnf1hcpn = rv8ahxuv.y + rv8ahxuv.h / 2;
        for (const b579k3h5 of tkb08u.bricks) {
          if (b579k3h5 === rv8ahxuv) continue;
          if (Math.hypot(vhmoue6hm - (b579k3h5.x + b579k3h5.w / 2), fnf1hcpn - (b579k3h5.y + b579k3h5.h / 2)) <= 180) {
            const qpspty = Math.max(1, Math.round(b579k3h5.value * 0.25));
            b579k3h5.value = Math.max(0, b579k3h5.value - qpspty);
            if (this.#ml4kwx8l4) this.#ml4kwx8l4.damageDealt += qpspty;
            if (b579k3h5.value <= 0) this.se1zjmce1(b579k3h5);
          }
        }
      }

      for (const snin3e of tkb08u.bricks.filter((nvby1z0vb) => nvby1z0vb.type === 'turret')) {
        snin3e.value = 1;
        const f5llch = aezxojtez(tkb08u.bricks.filter((k4iiexm) => k4iiexm !== snin3e)).slice(0, 3);
        for (const q6q006j6 of f5llch) {
          const oe8awju = Math.max(1, Math.round(q6q006j6.value * 0.25));
          q6q006j6.value = Math.max(0, q6q006j6.value - oe8awju);
          if (this.#ml4kwx8l4) this.#ml4kwx8l4.damageDealt += oe8awju;
          if (q6q006j6.value <= 0) this.se1zjmce1(q6q006j6);
        }
      }

      for (const lzd1m6pzd of tkb08u.bricks.filter((xm_0qg1) => xm_0qg1.type === 'teleport')) {
        const w34o0z = czqe49(0, 5);
        lzd1m6pzd.x = w34o0z * 120 + 5;
        this.ilaw6xql(lzd1m6pzd.x + lzd1m6pzd.w / 2, lzd1m6pzd.targetY + lzd1m6pzd.h / 2);
      }

      for (const smkddcw of tkb08u.bonusBalls) {
        if (smkddcw.hit) continue;
        smkddcw.targetY = (Number.isFinite(smkddcw.targetY) ? smkddcw.targetY : smkddcw.y) + 80;
      }

      const ffo2tatfo = g16_o8 - 90;
      const jmsuxde = tkb08u.bricks.some((fj6kjbkj6) => fj6kjbkj6.targetY + fj6kjbkj6.h >= g16_o8 - 20 || fj6kjbkj6.y + fj6kjbkj6.h >= g16_o8 - 20 || fj6kjbkj6.targetY >= ffo2tatfo);

      const dute3t0 = tkb08u.bonusBalls.filter((d_6e6d5_) => d_6e6d5_.hit).length;
      tkb08u.bonusBalls = tkb08u.bonusBalls.filter((dwsd5o) => !dwsd5o.hit);

      const oamgvvxa = dute3t0 + tkb08u.pendingAmmo;
      tkb08u.pendingAmmo = 0;

      if (oamgvvxa > 0 && !jmsuxde) {
        const h52e7i = tkb08u.ballCount + oamgvvxa;
        tkb08u.ballCount = h52e7i;
        tkb08u.secBallCount._m7aox4(h52e7i);
      }

      if (!jmsuxde && (!tkb08u.target || tkb08u.level < tkb08u.target)) {
        tkb08u.balls = ts05mx5s0(tkb08u.anchorX, tkb08u.ballCount);
        this.wdfowtkd(true);
        this.tvh3htjv();
      }

      const b8pfp378p = this.#ml4kwx8l4 || this.#quplb_fu();
      this.#ml4kwx8l4 = this.#quplb_fu();
      const d1nrx6u1n = this.#nt8quz.q16lfev1()?.activeSlot || 1;

      try {
        const v2vcgn = await this.#nt8quz.drl28ax(qjnzib2j(10), {
          slot: d1nrx6u1n,
          bricksBrokenCount: b8pfp378p.bricksBrokenCount,
          damageDealt: b8pfp378p.damageDealt,
          turnHits: b8pfp378p.turnHits,
          coinsGained: b8pfp378p.coinsGained,
          gemsGained: b8pfp378p.gemsGained,
          titanKills: b8pfp378p.titanKills,
          ammoBroken: b8pfp378p.ammoBroken,
          bonusCaught: dute3t0,
          extraBalls: oamgvvxa,
          pendingAmmo: tkb08u.pendingAmmo,
          bestCombo: b8pfp378p.bestCombo,
          brokenByType: b8pfp378p.brokenByType,
          anchorX: tkb08u.anchorX,
          overlordTimer: tkb08u.overlordTimer,
          overlordDialogue: tkb08u.overlordDialogue,
          over: jmsuxde,
          nextBricks: tkb08u.bricks,
          nextBonusBalls: tkb08u.bonusBalls
        });

        this.#evjvyjc(v2vcgn);
        if (jmsuxde) {
          tkb08u.over = true;
          tkb08u.paused = true;
          tkb08u.brickMoving = false;
          this.#krj0inir.gxmcni();
        } else if (tkb08u.target && tkb08u.level >= tkb08u.target) {
          tkb08u.complete = true;
          tkb08u.paused = true;
          tkb08u.brickMoving = false;
        }
      } catch {
        tkb08u.paused = true;
      } finally {
        this.#dg76p_8g7 = false;
      }

      this.vo3jcs();
      this.bbngzr7();
      this._r5u9_o();
      this.clqx691();
    }

    o7sbc7v7s(qitzh2o) {
      const _saemyasa = this.#nt8quz.q16lfev1()?.settings;
      if (_saemyasa && !_saemyasa.particles) return;
      const [tifvj11i] = iburnrpb(qitzh2o.type, qitzh2o.value, this.#qouv5y?.runMode);
      for (let cww51_a = 0; cww51_a < 16; cww51_a++) {
        this.#_fek508.push({
          type: 'particle',
          x: qitzh2o.x + u5hx61w5() * qitzh2o.w,
          y: qitzh2o.y + u5hx61w5() * qitzh2o.h,
          vx: (u5hx61w5() - 0.5) * 5,
          vy: u5hx61w5() * -4 - 1,
          life: 45 + u5hx61w5() * 20,
          color: tifvj11i,
          size: 4 + u5hx61w5() * 5
        });
      }
    }

    ilaw6xql(wvaa9cv, q5t1i1j5t) {
      const cz1vo5 = this.#nt8quz.q16lfev1()?.settings;
      if (cz1vo5 && !cz1vo5.particles) return;
      for (let p35kj1s3 = 0; p35kj1s3 < 12; p35kj1s3++) {
        this.#_fek508.push({
          type: 'particle',
          x: wvaa9cv, y: q5t1i1j5t,
          vx: (u5hx61w5() - 0.5) * 6,
          vy: (u5hx61w5() - 0.5) * 6,
          life: 25 + u5hx61w5() * 15,
          color: '#805ad5',
          size: 5
        });
      }
    }

    n05qcsq(blsvh9nl, xsiio_msi) {
      const iewdk0o = this.#nt8quz.q16lfev1()?.settings;
      if (iewdk0o && !iewdk0o.particles) return;
      for (let datz6ckat = 0; datz6ckat < 12; datz6ckat++) {
        this.#_fek508.push({
          type: 'particle',
          x: blsvh9nl, y: xsiio_msi,
          vx: (u5hx61w5() - 0.5) * 8,
          vy: u5hx61w5() * 4,
          life: 20 + u5hx61w5() * 15,
          color: '#dd6b20',
          size: 6
        });
      }
    }

    c2y7q0t2y(zc_u9u0) {
      const cs2g1f = this.#nt8quz.q16lfev1()?.settings;
      if (cs2g1f && !cs2g1f.particles) return;
      this.#_fek508.push({
        type: 'explosion',
        x: zc_u9u0.x + zc_u9u0.w / 2,
        y: zc_u9u0.y + zc_u9u0.h / 2,
        radius: 12,
        life: 18
      });
    }

    d6ro50x6(ju8xozr) {
      for (const o11xu1k of this.#_fek508) {
        o11xu1k.life -= ju8xozr;
        if (o11xu1k.type === 'particle') {
          o11xu1k.x += o11xu1k.vx * ju8xozr;
          o11xu1k.y += o11xu1k.vy * ju8xozr;
          o11xu1k.vy += 0.15 * ju8xozr;
        } else {
          o11xu1k.radius += 7 * ju8xozr;
        }
      }
      this.#_fek508 = this.#_fek508.filter((v22wil6) => v22wil6.life > 0);
    }

    zme5pn7m() {
      for (const _hgp5lihg of this.#_fek508) {
        sdv1o0.save();
        if (_hgp5lihg.type === 'particle') {
          sdv1o0.globalAlpha = Math.min(1, _hgp5lihg.life / 50);
          sdv1o0.fillStyle = _hgp5lihg.color;
          sdv1o0.fillRect(_hgp5lihg.x, _hgp5lihg.y, _hgp5lihg.size, _hgp5lihg.size);
        } else {
          sdv1o0.globalAlpha = Math.min(1, _hgp5lihg.life / 18);
          sdv1o0.beginPath();
          sdv1o0.arc(_hgp5lihg.x, _hgp5lihg.y, _hgp5lihg.radius, 0, Math.PI * 2);
          sdv1o0.fillStyle = 'rgba(255, 69, 0, .25)';
          sdv1o0.strokeStyle = '#ffd700';
          sdv1o0.lineWidth = 4;
          sdv1o0.fill();
          sdv1o0.stroke();
        }
        sdv1o0.restore();
      }
    }

    async d2t_2lb(cv61psgv6) {
      const k72fqcx7 = this.#qouv5y;
      if (!k72fqcx7 || k72fqcx7.over || k72fqcx7.complete) return;
      k72fqcx7.paused = true;
      k72fqcx7.turnInProgress = false;
      k72fqcx7.brickMoving = false;
      this.#__4dhnz = false;
      if (cv61psgv6) k72fqcx7.complete = true;
      else {
        k72fqcx7.over = true;
        this.#krj0inir.gxmcni();
      }

      const ve_kws9e = this.#nt8quz.q16lfev1()?.activeSlot || 1;
      await this.#nt8quz.drl28ax(qjnzib2j(19), { slot: ve_kws9e, won: cv61psgv6 }).catch(() => {});
      this.vo3jcs();
      this.bbngzr7();
      this._r5u9_o();
      this.clqx691();
    }

    v2f72ov2() {
      if (this.#qouv5y.bricks.some((_q4svx) => Math.max(_q4svx.y, _q4svx.targetY) + _q4svx.h >= g16_o8 - 20)) {
        this.d2t_2lb(false);
      }
    }

    ck5f27z(hrqcx5ur) {
      const t5l8i2d = this.#bgomw4hgo ? (hrqcx5ur - this.#bgomw4hgo) / 16.67 : 1;
      const l5h88lt5 = Number.isFinite(t5l8i2d) ? Math.max(0, Math.min(t5l8i2d, 2)) : 1;
      this.#bgomw4hgo = hrqcx5ur;

      try {
        if (this.#ghjljb === 'game') {
          this.bxmnzh();
          if (this.#qouv5y && !this.#qouv5y.paused && !this.#qouv5y.over && !this.#qouv5y.complete) {
            this.nhnimyeh();
            const bj97dllj = this.#qouv5y.turnInProgress && this.#__4dhnz ? 3 : 1;
            for (let e0kvsoc0k = 0; e0kvsoc0k < bj97dllj; e0kvsoc0k++) {
              if (this.#qouv5y.over || this.#qouv5y.complete) break;
              this.fjl6l0(l5h88lt5);
              this.p6p8mge6(l5h88lt5);
              this.a9rktbg9(l5h88lt5);
              if (!this.#qouv5y.turnInProgress) this.v2f72ov2();
            }
            this.d6ro50x6(l5h88lt5);
            this.alm5ycolm();
            this.iw48fy2w();
            this.clqx691();
          } else {
            this.d6ro50x6(l5h88lt5);
          }
        }
      } catch {} finally {
        _tvyxux((bo400rmo) => this.ck5f27z(bo400rmo));
      }
    }

    bxmnzh() {
      sdv1o0.clearRect(0, 0, cu2pc20u, mllbwlol);
      const sb7bvq5b7 = this.#qouv5y;
      if (!sb7bvq5b7) return;

      const n2qoek = (sb7bvq5b7.runMode === 'hell');
      const ijd6g_l = (sb7bvq5b7.runMode === 'tartarus');
      const ksiux8_ = n2qoek || ijd6g_l;

      sdv1o0.strokeStyle = ijd6g_l ? '#6b21a8' : n2qoek ? '#741d1d' : '#222';
      sdv1o0.lineWidth = 2;
      sdv1o0.beginPath();
      sdv1o0.moveTo(0, txrkct);
      sdv1o0.lineTo(cu2pc20u, txrkct);
      sdv1o0.moveTo(0, g16_o8);
      sdv1o0.lineTo(cu2pc20u, g16_o8);
      sdv1o0.stroke();

      sdv1o0.fillStyle = ijd6g_l ? '#e9d5ff' : n2qoek ? '#feb2b2' : '#171717';
      sdv1o0.font = '700 20px Poppins, sans-serif';
      sdv1o0.textAlign = 'left';
      sdv1o0.textBaseline = 'middle';
      sdv1o0.fillText(`Level: ${sb7bvq5b7.level}`, 18, 40);

      sdv1o0.textAlign = 'center';
      sdv1o0.fillStyle = ijd6g_l ? '#c084fc' : n2qoek ? '#fc8181' : '#2b6cb0';
      sdv1o0.font = '700 16px Poppins, sans-serif';
      sdv1o0.fillText(`${this.eugim7su(sb7bvq5b7.runMode)} (${sb7bvq5b7.difficulty.toUpperCase()})`, cu2pc20u / 2, 40);

      sdv1o0.textAlign = 'right';
      sdv1o0.fillStyle = ksiux8_ ? '#f6e05e' : '#d69e2e';
      sdv1o0.font = '700 20px Poppins, sans-serif';
      sdv1o0.fillText(`Balls: ${sb7bvq5b7.ballCount}`, cu2pc20u - 18, 40);

      const afvl_86f = sb7bvq5b7.bricks.filter((zu3pojpu) => zu3pojpu.type === 'shield');
      for (const yhq1g7l of afvl_86f) {
        const a4j0ln = yhq1g7l.x + yhq1g7l.w / 2;
        const d4s1ul44 = yhq1g7l.y + yhq1g7l.h / 2;
        sdv1o0.save();
        sdv1o0.beginPath();
        sdv1o0.arc(a4j0ln, d4s1ul44, 150, 0, Math.PI * 2);
        sdv1o0.fillStyle = ijd6g_l ? 'rgba(147, 51, 234, 0.14)' : n2qoek ? 'rgba(155, 44, 44, 0.15)' : 'rgba(49, 151, 149, 0.12)';
        sdv1o0.fill();
        sdv1o0.strokeStyle = ijd6g_l ? 'rgba(192, 132, 252, 0.4)' : n2qoek ? 'rgba(252, 129, 129, 0.4)' : 'rgba(49, 151, 149, 0.4)';
        sdv1o0.setLineDash([4, 4]);
        sdv1o0.stroke();
        sdv1o0.restore();
      }

      for (const iuh7o7 of sb7bvq5b7.bricks) {
        this.ejgqajmj(iuh7o7, afvl_86f);
      }

      for (const o2wb16a2 of sb7bvq5b7.bonusBalls) {
        if (o2wb16a2.hit) continue;
        sdv1o0.beginPath();
        sdv1o0.fillStyle = ijd6g_l ? '#a855f7' : n2qoek ? '#ff6b6b' : '#3dd462';
        sdv1o0.arc(o2wb16a2.x, o2wb16a2.y, o2wb16a2.r, 0, Math.PI * 2);
        sdv1o0.fill();
        sdv1o0.strokeStyle = '#fff';
        sdv1o0.lineWidth = 2;
        sdv1o0.stroke();
      }

      for (const gxxak1e of sb7bvq5b7.balls) {
        sdv1o0.beginPath();
        sdv1o0.fillStyle = gxxak1e.shocking
          ? '#dd6b20'
          : ijd6g_l
            ? '#e879f9'
            : n2qoek
              ? '#fc8181'
              : (sb7bvq5b7.buffs.doubleDamageTurns > 0 ? '#e53e3e' : '#5ba7f4');
        sdv1o0.arc(gxxak1e.x, gxxak1e.y, gxxak1e.radius || 16, 0, Math.PI * 2);
        sdv1o0.fill();
      }

      if (!sb7bvq5b7.turnInProgress && !sb7bvq5b7.brickMoving && !sb7bvq5b7.paused && !sb7bvq5b7.over && !sb7bvq5b7.complete) {
        const hcpwdcic = document.getElementById('analysisAngleInput');
        const mdf8x1 = document.activeElement === hcpwdcic && Number.isFinite(Number(hcpwdcic.value));
        const ygq605hgq = mdf8x1 ? Number(hcpwdcic.value) : null;
        const jij24hp = this.b_605_8_6(ygq605hgq);
        const rushgnd = mdf8x1 ? Number(hcpwdcic.value) : this.pbeze7() * 180 / Math.PI;

        sdv1o0.save();
        sdv1o0.strokeStyle = ijd6g_l ? '#d8b4fe' : n2qoek ? '#feb2b2' : '#777';
        sdv1o0.lineWidth = 2;
        sdv1o0.setLineDash([5, 8]);
        sdv1o0.beginPath();
        if (jij24hp.length > 0) {
          sdv1o0.moveTo(jij24hp[0].x, jij24hp[0].y);
          for (let bblmivmbl = 1; bblmivmbl < jij24hp.length; bblmivmbl++) sdv1o0.lineTo(jij24hp[bblmivmbl].x, jij24hp[bblmivmbl].y);
        }
        sdv1o0.stroke();

        sdv1o0.setLineDash([]);
        sdv1o0.fillStyle = ksiux8_ ? '#fff' : '#222';
        sdv1o0.font = '700 14px Poppins, sans-serif';
        sdv1o0.textAlign = 'left';
        sdv1o0.textBaseline = 'middle';
        sdv1o0.fillText(`Aim: ${rushgnd.toFixed(1)}°`, 18, g16_o8 + 35);

        sdv1o0.font = '700 17px Poppins, sans-serif';
        sdv1o0.textAlign = 'center';
        sdv1o0.fillText(`x${sb7bvq5b7.ballCount}`, sb7bvq5b7.anchorX, mllbwlol - 25);
        sdv1o0.restore();
      }

      if (sb7bvq5b7.paused && !sb7bvq5b7.over && !sb7bvq5b7.complete) {
        sdv1o0.fillStyle = ijd6g_l ? '#140724e6' : n2qoek ? '#2d0a0ae6' : '#0005';
        sdv1o0.fillRect(0, 0, cu2pc20u, mllbwlol);
        sdv1o0.fillStyle = '#fff';
        sdv1o0.textAlign = 'center';
        sdv1o0.font = '700 30px Poppins, sans-serif';
        sdv1o0.fillText('PAUSED', cu2pc20u / 2, mllbwlol / 2);
      }

      if (sb7bvq5b7.over || sb7bvq5b7.complete) {
        sdv1o0.fillStyle = ijd6g_l ? '#140724f2' : n2qoek ? '#2d0a0af2' : '#0009';
        sdv1o0.fillRect(0, mllbwlol / 2 - 100, cu2pc20u, 200);
        sdv1o0.fillStyle = '#fff';
        sdv1o0.textAlign = 'center';
        sdv1o0.textBaseline = 'middle';
        sdv1o0.font = '700 36px Poppins, sans-serif';
        sdv1o0.fillText(
          sb7bvq5b7.complete
            ? `SPEEDRUN ${sb7bvq5b7.target} CLEAR!`
            : ijd6g_l
              ? 'TARTARUS CLAIMED YOU'
              : n2qoek
                ? 'HELL CONSUMED YOU'
                : 'GAME OVER',
          cu2pc20u / 2,
          mllbwlol / 2 - 18
        );
        sdv1o0.font = '600 21px Poppins, sans-serif';
        sdv1o0.fillText(
          sb7bvq5b7.complete ? `${this.ldh1pi9dh(this.#nt8quz.p_12td9_())} [${sb7bvq5b7.difficulty.toUpperCase()}]` : `Level ${sb7bvq5b7.level}`,
          cu2pc20u / 2,
          mllbwlol / 2 + 32
        );
      }

      this.zme5pn7m();
    }

    ejgqajmj(hbwcy9, ex1ofg4x1 = []) {
      sdv1o0.save();
      const uocmt6w = (Math.sin(uweaqd() / 120) + 1) / 2;
      const m1uelna1 = (hbwcy9.type !== 'shield' && hbwcy9.type !== 'titan' && ex1ofg4x1.some((py6whady) => {
        return Math.hypot((py6whady.x + py6whady.w / 2) - (hbwcy9.x + hbwcy9.w / 2), (py6whady.y + py6whady.h / 2) - (hbwcy9.y + hbwcy9.h / 2)) <= 150;
      })) || (hbwcy9.type === 'phase' && hbwcy9.phase === 'liquid');

      if (m1uelna1) sdv1o0.globalAlpha = 0.45;

      const [olaig4, jsiwdn1si] = iburnrpb(hbwcy9.type, hbwcy9.value, this.#qouv5y?.runMode);
      const b81t42z = sdv1o0.createLinearGradient(hbwcy9.x, hbwcy9.y, hbwcy9.x, hbwcy9.y + hbwcy9.h);
      b81t42z.addColorStop(0, olaig4);
      b81t42z.addColorStop(1, jsiwdn1si);

      sdv1o0.fillStyle = b81t42z;
      sdv1o0.beginPath();
      if (sdv1o0.roundRect) sdv1o0.roundRect(hbwcy9.x, hbwcy9.y, hbwcy9.w, hbwcy9.h, 10);
      else sdv1o0.rect(hbwcy9.x, hbwcy9.y, hbwcy9.w, hbwcy9.h);

      sdv1o0.fill();
      sdv1o0.lineWidth = 2;
      sdv1o0.setLineDash([]);

      if (hbwcy9.type === 'tnt') {
        sdv1o0.lineWidth = 3 + uocmt6w * 3;
        sdv1o0.strokeStyle = `rgb(255, ${Math.floor(100 + uocmt6w * 155)}, 100)`;
        sdv1o0.setLineDash([8, 6]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'ammo') {
        sdv1o0.strokeStyle = '#fff';
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'portal') {
        sdv1o0.strokeStyle = '#e9d8fd';
        sdv1o0.lineWidth = 4;
        sdv1o0.setLineDash([3, 5]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'teleport') {
        sdv1o0.strokeStyle = '#90cdf4';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'slider') {
        sdv1o0.strokeStyle = '#e0fbfc';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'shock') {
        sdv1o0.strokeStyle = '#ffc078';
        sdv1o0.lineWidth = 4;
        sdv1o0.setLineDash([6, 4]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'shield') {
        sdv1o0.strokeStyle = '#81e6d9';
        sdv1o0.lineWidth = 4;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'parent') {
        sdv1o0.strokeStyle = '#f6ad55';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'healer') {
        sdv1o0.strokeStyle = '#68d391';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'tank') {
        sdv1o0.strokeStyle = '#1a202c';
        sdv1o0.lineWidth = 4;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'angel') {
        sdv1o0.strokeStyle = '#fbb6ce';
        sdv1o0.lineWidth = 3;
        sdv1o0.setLineDash([2, 2]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'turret') {
        sdv1o0.strokeStyle = '#cbd5e0';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'directional') {
        const g1oto6 = hbwcy9.allowedDirs || ['top', 'bottom'];
        const c1s3pf = { top: '#ffd166', bottom: '#38bdf8', left: '#c084fc', right: '#f472b6' };
        sdv1o0.save();
        sdv1o0.strokeStyle = '#e2e8f0';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
        for (const x5_j5qk5_ of g1oto6) {
          const rqmoejeqm = 4;
          sdv1o0.strokeStyle = c1s3pf[x5_j5qk5_];
          sdv1o0.beginPath();
          if (x5_j5qk5_ === 'top') { sdv1o0.moveTo(hbwcy9.x + rqmoejeqm, hbwcy9.y + rqmoejeqm); sdv1o0.lineTo(hbwcy9.x + hbwcy9.w - rqmoejeqm, hbwcy9.y + rqmoejeqm); }
          else if (x5_j5qk5_ === 'bottom') { sdv1o0.moveTo(hbwcy9.x + rqmoejeqm, hbwcy9.y + hbwcy9.h - rqmoejeqm); sdv1o0.lineTo(hbwcy9.x + hbwcy9.w - rqmoejeqm, hbwcy9.y + hbwcy9.h - rqmoejeqm); }
          else if (x5_j5qk5_ === 'left') { sdv1o0.moveTo(hbwcy9.x + rqmoejeqm, hbwcy9.y + rqmoejeqm); sdv1o0.lineTo(hbwcy9.x + rqmoejeqm, hbwcy9.y + hbwcy9.h - rqmoejeqm); }
          else if (x5_j5qk5_ === 'right') { sdv1o0.moveTo(hbwcy9.x + hbwcy9.w - rqmoejeqm, hbwcy9.y + rqmoejeqm); sdv1o0.lineTo(hbwcy9.x + hbwcy9.w - rqmoejeqm, hbwcy9.y + hbwcy9.h - rqmoejeqm); }
          sdv1o0.stroke();
        }
        sdv1o0.restore();
      } else if (hbwcy9.type === 'phase') {
        sdv1o0.strokeStyle = '#9edebe';
        sdv1o0.lineWidth = 3;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'magnet') {
        sdv1o0.strokeStyle = '#e9d8fd';
        sdv1o0.lineWidth = 3;
        sdv1o0.setLineDash([4, 4]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'crawler') {
        sdv1o0.strokeStyle = '#ff8533';
        sdv1o0.lineWidth = 3 + uocmt6w * 2;
        sdv1o0.setLineDash([4, 2]);
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'devil') {
        sdv1o0.strokeStyle = '#ff4d4d';
        sdv1o0.lineWidth = 4;
        sdv1o0.stroke();
      } else if (hbwcy9.type === 'titan') {
        sdv1o0.strokeStyle = '#e879f9';
        sdv1o0.lineWidth = 4;
        sdv1o0.stroke();
      } else {
        sdv1o0.strokeStyle = '#111';
        sdv1o0.lineWidth = 2;
        sdv1o0.stroke();
      }

      sdv1o0.setLineDash([]);
      sdv1o0.fillStyle = '#fff';
      sdv1o0.font = hbwcy9.type === 'titan' ? '700 30px Poppins, sans-serif' : '700 22px Poppins, sans-serif';
      sdv1o0.textAlign = 'center';
      sdv1o0.textBaseline = 'middle';
      sdv1o0.fillText(String(Math.ceil(hbwcy9.value)), hbwcy9.x + hbwcy9.w / 2, hbwcy9.y + hbwcy9.h / 2);

      const cdllgsnd = ucwq67[hbwcy9.type];
      if (cdllgsnd) {
        const m0xd7xq0x = hbwcy9.x + 19;
        const pbjbl5jb = hbwcy9.y + 18;
        sdv1o0.globalAlpha = m1uelna1 ? 0.65 : 1;
        sdv1o0.beginPath();
        sdv1o0.arc(m0xd7xq0x, pbjbl5jb, 12, 0, Math.PI * 2);
        sdv1o0.fillStyle = 'rgba(0, 0, 0, 0.48)';
        sdv1o0.fill();
        sdv1o0.fillStyle = '#fff';
        sdv1o0.font = '900 14px "Font Awesome 6 Free"';
        sdv1o0.textAlign = 'center';
        sdv1o0.textBaseline = 'middle';
        sdv1o0.fillText(String.fromCodePoint(parseInt(cdllgsnd, 16)), m0xd7xq0x, pbjbl5jb + 0.5);
      }

      if (m1uelna1) {
        sdv1o0.strokeStyle = '#319795';
        sdv1o0.lineWidth = 3;
        sdv1o0.setLineDash([4, 4]);
        sdv1o0.strokeRect(hbwcy9.x - 2, hbwcy9.y - 2, hbwcy9.w + 4, hbwcy9.h + 4);
      }
      sdv1o0.restore();
    }
  }

  function ts05mx5s0(_6uxmf, hzwrhwfz) {
    return Array.from({ length: ab4jjrrb4(hzwrhwfz, 1, 500, 1) }, () => co6g0a3o6(_6uxmf, g16_o8 - 20));
  }

  Object.freeze(fqgfyf.prototype);
  Object.freeze(hsg1g0ms.prototype);
  Object.freeze(n5ufo7l5u.prototype);
  Object.freeze(d681c6g.prototype);

  const onfaxy8nf = new d681c6g();
  void onfaxy8nf;
})();
