export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  :root {
    --rz-blue:   #3395FF;
    --rz-dark:   #072654;
    --ink:       #0f172a;
    --ink-2:     #334155;
    --ink-3:     #64748b;
    --ink-4:     #94a3b8;
    --border:    #e2e8f0;
    --surface:   #f8fafc;
    --white:     #ffffff;
    --success:   #10b981;
    --error:     #ef4444;
    --radius:    14px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,.07), 0 2px 6px rgba(0,0,0,.04);
    --shadow-lg: 0 20px 50px rgba(0,0,0,.10), 0 8px 20px rgba(0,0,0,.06);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'Plus Jakarta Sans', sans-serif; }

  
  .pass-toggle {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #bbbbc6;
    padding: 4px;
    display: flex;
    transition: color 0.2s;
  }

  .pass-toggle:hover { color: #6366f1; }

  /* ── PAGE SHELL ── */
  .pay-page {
    min-height: 80vh;
    background: #f1f5f9;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 20px 20px 20px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .pay-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 100px;
    align-items: start;
    animation: wrapIn .55s cubic-bezier(.22,1,.36,1) both;
  }

  @keyframes wrapIn {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }

  @media (max-width: 820px) {
    .pay-wrapper { grid-template-columns: 1fr; }
    .order-col   { order: -1; }
  }

  /* ── CARD ── */
  .card {
  
    background: var(--white);
    border-radius: 20px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-md);
    overflow: hidden;
  }

  /* ── ORDER SUMMARY ── */
  .order-col {}

  .order-header {
    background: linear-gradient(135deg, var(--rz-dark) 0%, #0d3b7a 100%);
    padding: 28px 28px 22px;
    position: relative;
    overflow: hidden;
    border-radius:20px
  }

  .order-header::before {
    content: '';
    position: absolute;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: rgba(51,149,255,.12);
    top: -60px; right: -40px;
  }

  .order-header::after {
    content: '';
    position: absolute;
    width: 120px; height: 120px;
    border-radius: 50%;
    background: rgba(255,255,255,.05);
    bottom: -30px; left: 30px;
  }

  .order-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(51,149,255,.18);
    border: 1px solid rgba(51,149,255,.3);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 11px;
    font-weight: 600;
    color: #93c5fd;
    letter-spacing: .05em;
    text-transform: uppercase;
    margin-bottom: 16px;
    position: relative;
  }

  .order-title {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
    position: relative;
  }

  .order-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,.5);
    font-weight: 300;
    position: relative;
  }

  .order-body { padding: 24px 28px; }

  .order-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    animation: itemIn .4s ease both;
  }

  .order-item:last-child { border-bottom: none; }

  @keyframes itemIn {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }

  .item-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 20px;
  }

  .item-info { flex: 1; }

  .item-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 2px;
  }

  .item-desc {
    font-size: 12px;
    color: var(--ink-4);
    font-weight: 400;
  }

  .item-price {
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
  }

  .order-divider {
    height: 1px;
    background: var(--border);
    margin: 4px 0 16px;
  }

  .order-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 13px;
  }

  .order-row .label { color: var(--ink-3); font-weight: 400; }
  .order-row .value { color: var(--ink-2); font-weight: 500; }
  .order-row.discount .value { color: var(--success); }

  .order-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
    margin-top: 14px;
  }

  .total-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink-2);
    text-transform: uppercase;
    letter-spacing: .06em;
  }

  .total-amount {
    font-family: 'Syne', sans-serif;
    font-size: 24px;
    font-weight: 800;
    color: var(--rz-dark);
  }

  .secure-note {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11.5px;
    color: var(--ink-4);
    margin-top: 16px;
    justify-content: center;
  }

  /* ── FORM CARD ── */
  .form-col {}

  .form-topbar {
    padding: 15px 18px 15px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .form-heading {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
  }

  .rzp-logo {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--ink-4);
    letter-spacing: .05em;
  }

  .rzp-logo-mark {
    background: var(--rz-blue);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 4px;
    letter-spacing: .02em;
  }

  /* TAB SWITCHER */
  .pay-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    padding: 6px 8px 0;
    border-bottom: 1px solid var(--border);
  }

  .pay-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 5px 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-4);
    position: relative;
    transition: color .2s;
  }

  .pay-tab.active { color: var(--rz-blue); }

  .pay-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--rz-blue);
    border-radius: 2px 2px 0 0;
  }

  .tab-icon {
    width: 34px; height: 34px;
    border-radius: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: background .2s, border-color .2s;
  }

  .pay-tab.active .tab-icon {
    background: rgba(51,149,255,.08);
    border-color: rgba(51,149,255,.25);
  }

  /* FORM BODY */
  .form-body { padding: 14px 28px 15px; }

  /* ── FIELDS ── */
  .field-row {
    display: grid;
    gap: 14px;
    margin-bottom: 14px;
  }

  .field-row.cols-2 { grid-template-columns: 1fr 1fr; }

  .field { display: flex; flex-direction: column; gap: 2px; }

  .field-label {
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--ink-3);
  }

  .field-wrap { position: relative;margin-top:10px }

  .field-icon {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    color: var(--ink-4);
    pointer-events: none;
    display: flex;
    transition: color .2s;
  }

  .field-wrap:focus-within .field-icon { color: var(--rz-blue); }

  .field-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: var(--ink);
    background: var(--surface);
    outline: none;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .field-input::placeholder { color: #cbd5e1; }

  .field-input:focus {
    border-color: var(--rz-blue);
    background: #fff;
    box-shadow: 0 0 0 3.5px rgba(51,149,255,.12);
  }

  .field-input.error {
    border-color: var(--error);
    background: #fff5f5;
  }

  .field-input.error:focus {
    box-shadow: 0 0 0 3.5px rgba(239,68,68,.1);
  }

  .field-input.no-icon { padding-left: 14px; }

  .field-err {
    font-size: 11px;
    color: var(--error);
    display: flex;
    align-items: center;
    gap: 4px;
    animation: errIn .2s ease both;
  }

  @keyframes errIn {
    from { opacity:0; transform:translateY(-3px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* card number segments */
  .card-segments {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
.card-seg-input::placeholder { color: #cbd5e1; }

  .card-seg-input {
    width: 100%;
    padding: 12px 8px;
    border: 1.5px solid var(--border);
    border-radius: var(--radius);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    background: var(--surface);
    outline: none;
    text-align: center;
    letter-spacing: .12em;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }

  .card-seg-input:focus {
    border-color: var(--rz-blue);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(51,149,255,.12);
  }

  .card-seg-input.error { border-color: var(--error); background: #fff5f5; }

  /* card brand badge */
  .card-brand {
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    padding: 2px 8px;
    border-radius: 4px;
    opacity: 0;
    transition: opacity .3s;
  }

  .card-brand.visa    { background: #1a1f71; color:#fff; opacity:1; }
  .card-brand.mc      { background: #eb001b; color:#fff; opacity:1; }
  .card-brand.rupay   { background: #0066a3; color:#fff; opacity:1; }
  .card-brand.amex    { background: #007bc1; color:#fff; opacity:1; }

  /* UPI FIELD */
  .upi-hint {
    font-size: 11px;
    color: var(--ink-4);
    margin-top: 12px;
    padding: 10px 10px;
    background: var(--surface);
    border-radius: 10px;
    border: 1px solid var(--border);
    line-height: 1.5;
  }

  .upi-providers {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .upi-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border: 1.5px solid var(--border);
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-2);
    background: var(--white);
    cursor: pointer;
    transition: border-color .18s, background .18s, transform .15s;
    user-select: none;
  }

  .upi-chip:hover {
    border-color: var(--rz-blue);
    background: rgba(51,149,255,.04);
    transform: translateY(-1px);
  }

  .upi-chip.selected {
    border-color: var(--rz-blue);
    background: rgba(51,149,255,.07);
    color: var(--rz-blue);
  }

  /* NETBANKING */
  .bank-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 14px;
  }

  .bank-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 14px 8px;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    background: var(--white);
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    color: var(--ink-3);
    text-align: center;
    transition: border-color .18s, background .18s, transform .15s, color .18s;
    user-select: none;
  }

  .bank-chip:hover {
    border-color: var(--rz-blue);
    background: rgba(51,149,255,.04);
    transform: translateY(-2px);
    color: var(--ink);
  }

  .bank-chip.selected {
    border-color: var(--rz-blue);
    background: rgba(51,149,255,.07);
    color: var(--rz-blue);
  }

  .bank-emoji { font-size: 22px; }

  /* ── SUBMIT BUTTON ── */
  .btn-pay {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: var(--radius);
    background: linear-gradient(135deg, #3395ff 0%, #1d6de5 100%);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    letter-spacing: .03em;
    position: relative;
    overflow: hidden;
    transition: transform .18s, box-shadow .2s, opacity .2s;
    box-shadow: 0 6px 20px rgba(51,149,255,.35);
    margin-top: 20px;
  }

  .btn-pay::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.14) 0%, transparent 60%);
    pointer-events: none;
  }

  .btn-pay:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(51,149,255,.42);
  }

  .btn-pay:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(51,149,255,.25);
  }

  .btn-pay:disabled { opacity: .65; cursor: not-allowed; }

  .btn-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .65s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .pay-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .footer-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: var(--ink-4);
    font-weight: 500;
  }

  /* ── SUCCESS ── */
  .success-screen {
    padding: 48px 28px 52px;
    text-align: center;
    animation: successIn .45s cubic-bezier(.34,1.56,.64,1) both;
  }

  @keyframes successIn {
    from { opacity:0; transform:scale(.9); }
    to   { opacity:1; transform:scale(1); }
  }

  .success-ring {
    width: 76px; height: 76px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #059669);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 22px;
    box-shadow: 0 10px 30px rgba(16,185,129,.3);
    animation: popIn .5s cubic-bezier(.34,1.56,.64,1) .1s both;
  }

  @keyframes popIn {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }

  .success-title {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .success-msg {
    font-size: 14px;
    color: var(--ink-3);
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 6px;
  }

  .success-txn {
    font-size: 12px;
    color: var(--ink-4);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px 16px;
    display: inline-block;
    margin: 12px 0 28px;
    font-family: monospace;
    letter-spacing: .06em;
  }

  .success-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
    text-align: left;
  }

  .detail-box {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 16px;
  }

  .detail-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: var(--ink-4);
    margin-bottom: 4px;
  }

  .detail-val {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  .btn-done {
    padding: 13px 36px;
    border-radius: 100px;
    border: 1.5px solid var(--border);
    background: var(--white);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink-2);
    cursor: pointer;
    transition: background .18s, border-color .18s, transform .15s;
  }

  .btn-done:hover {
    background: var(--surface);
    border-color: #c8d4e0;
    transform: translateY(-1px);
  }
`;
