<script lang="ts">
	import { onMount } from 'svelte';

	// ── State ──────────────────────────────────────────────────────────────────
	let stage = $state(0);
	let reqItems = $state(0);
	let typedCode = $state('');
	let countActive = $state(0);
	let countMrr = $state(0);
	let countSignups = $state(0);
	let progress = $state(0);
	let showPreview = $state(false);

	// ── Code snippets ──────────────────────────────────────────────────────────
	const CODE_HOOK = `// lib/useSalesforceStats.ts
const SF_URL   = process.env.SF_INSTANCE_URL;
const SF_TOKEN = process.env.SF_ACCESS_TOKEN;

async function fetchFromSalesforce() {
  // Query Salesforce REST API via SOQL
  const soql = encodeURIComponent(
    \`SELECT ActiveUsers__c, MRR__c, NewSignups__c
     FROM DashboardStats__c
     ORDER BY CreatedDate DESC LIMIT 1\`
  );
  const res = await fetch(
    \`\${SF_URL}/services/data/v59.0/query?q=\${soql}\`,
    { headers: { Authorization: \`Bearer \${SF_TOKEN}\` } }
  );
  const json = await res.json();
  const rec  = json.records[0];
  // Map Salesforce fields → app shape
  return {
    activeUsers: rec.ActiveUsers__c,
    mrr:         rec.MRR__c,
    signups:     rec.NewSignups__c,
  };
}

export function useSalesforceStats() {
  const [data, setData]      = useState(null);
  const [isLoading, setLoad] = useState(true);
  const [error, setError]    = useState(null);

  useEffect(() => {
    fetchFromSalesforce()
      .then(d => { setData(d); setLoad(false); })
      .catch(e => { setError(e); setLoad(false); });
  }, []);

  return { data, isLoading, error };
}`;

	const CODE_CARD = `// components/StatCard.tsx
interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
}

function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-value">
        {value}
      </span>
      <span className="stat-label">
        {label}
      </span>
      {trend && (
        <span className="stat-trend">
          ▲ {trend}
        </span>
      )}
    </div>
  );
}`;

	const CODE_WIDGET = `// components/UserStats.tsx
function UserStats() {
  const { data, isLoading, error } = useSalesforceStats();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorBanner msg={error.message} />;

  return (
    <div className="stats-grid">
      <StatCard
        label="Active Users"
        value={data.activeUsers}
        trend="+12% this week"
      />
      <StatCard
        label="MRR"
        value={\`$\${data.mrr.toLocaleString()}\`}
        trend="+8.3%"
      />
      <StatCard
        label="New Signups"
        value={data.signups}
        trend="+23%"
      />
    </div>
  );
}`;

	const REQS = [
		'Connect to Salesforce REST API via SOQL',
		'Map SF custom fields → app data shape',
		'Build reusable StatCard component',
		'Wire into UserStats with loading + error states'
	];

	// ── Syntax highlighter ─────────────────────────────────────────────────────
	function highlight(code: string): string {
		const e = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		return (
			e
				// template literals (must be first to avoid conflicts)
				.replace(/(`(?:[^`\\]|\\.)*`)/g, '$1')
				// line comments
				.replace(/(\/\/.*)/g, '<span class="hl-cm">$1</span>')
				// strings
				.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '$1')
				// TS types / interfaces
				.replace(
					/\b(interface|type|string|number|boolean|null|undefined|void)\b/g,
					'<span class="hl-type">$1</span>'
				)
				// keywords
				.replace(
					/\b(function|const|let|var|if|return|import|export|default|from|async|await|throw|new)\b/g,
					'<span class="hl-kw">$1</span>'
				)
				// JSX tags
				.replace(/(&lt;\/?[A-Z][A-Za-z]*)/g, '<span class="hl-jsx">$1</span>')
				.replace(/(&lt;\/?(?:div|span|p)(?=[\s/>]))/g, '<span class="hl-tag">$1</span>')
				// JSX props
				.replace(/\b(className|label|value|trend|msg)=/g, '<span class="hl-attr">$1</span>=')
				// React hooks
				.replace(/\b(useState|useEffect|useStats)\b/g, '<span class="hl-fn">$1</span>')
				// other function calls
				.replace(/\b([a-z][A-Za-z]*)\s*(?=\()/g, '<span class="hl-fn2">$1</span>')
		);
	}

	let highlightedCode = $derived(highlight(typedCode));
	let lineCount = $derived(typedCode.split('\n').length);

	// ── Helpers ────────────────────────────────────────────────────────────────
	function easeOutQuart(t: number) {
		return 1 - Math.pow(1 - t, 4);
	}

	function formatNumber(n: number) {
		return n.toLocaleString();
	}

	// ── Cleanup ────────────────────────────────────────────────────────────────
	const handles = {
		timeouts: [] as ReturnType<typeof setTimeout>[],
		intervals: [] as ReturnType<typeof setInterval>[],
		rafs: [] as number[]
	};

	function clearAll() {
		handles.timeouts.forEach(clearTimeout);
		handles.intervals.forEach(clearInterval);
		handles.rafs.forEach(cancelAnimationFrame);
		handles.timeouts = [];
		handles.intervals = [];
		handles.rafs = [];
	}

	function later(fn: () => void, ms: number) {
		const id = setTimeout(fn, ms);
		handles.timeouts.push(id);
	}

	function every(fn: () => void, ms: number): ReturnType<typeof setInterval> {
		const id = setInterval(fn, ms);
		handles.intervals.push(id);
		return id;
	}

	function cancelIv(id: ReturnType<typeof setInterval>) {
		clearInterval(id);
		handles.intervals = handles.intervals.filter((x) => x !== id);
	}

	// ── Progress bar ───────────────────────────────────────────────────────────
	function animateProgress(durationMs: number) {
		progress = 0;
		let start: number | null = null;
		function tick(ts: number) {
			if (!start) start = ts;
			const t = Math.min((ts - start) / durationMs, 1);
			progress = t * 100;
			if (t < 1) handles.rafs.push(requestAnimationFrame(tick));
		}
		handles.rafs.push(requestAnimationFrame(tick));
	}

	// ── Typewriter ─────────────────────────────────────────────────────────────
	function typeCode(code: string, msPerChar: number, onDone: () => void) {
		typedCode = '';
		let i = 0;
		const iv = every(() => {
			if (i < code.length) {
				typedCode += code[i++];
			} else {
				cancelIv(iv);
				onDone();
			}
		}, msPerChar);
	}

	// ── Stage machine ──────────────────────────────────────────────────────────
	const STAGE_DURATIONS = [7000, 8000, 0, 0, 0, 7000]; // 0 = typewriter-driven

	function runStage(s: number) {
		clearAll();
		stage = s;
		reqItems = 0;
		typedCode = '';
		showPreview = false;

		if (s === 0) {
			// Client request
			animateProgress(STAGE_DURATIONS[0]);
			later(() => runStage(1), STAGE_DURATIONS[0]);
		} else if (s === 1) {
			// Requirements
			animateProgress(STAGE_DURATIONS[1]);
			let count = 0;
			const iv = every(() => {
				count++;
				reqItems = count;
				if (count >= REQS.length) cancelIv(iv);
			}, 1200);
			later(() => runStage(2), STAGE_DURATIONS[1]);
		} else if (s === 2) {
			// Data layer: useStats hook
			const totalMs = CODE_HOOK.length * 22 + 1800;
			animateProgress(totalMs);
			typeCode(CODE_HOOK, 22, () => {});
			later(() => runStage(3), totalMs);
		} else if (s === 3) {
			// StatCard component
			const totalMs = CODE_CARD.length * 22 + 1800;
			animateProgress(totalMs);
			typeCode(CODE_CARD, 22, () => {});
			later(() => runStage(4), totalMs);
		} else if (s === 4) {
			// UserStats assembly
			const totalMs = CODE_WIDGET.length * 22 + 1800;
			animateProgress(totalMs);
			typeCode(CODE_WIDGET, 22, () => {
				later(() => {
					showPreview = true;
				}, 400);
			});
			later(() => runStage(5), totalMs);
		} else if (s === 5) {
			// Result
			countActive = 0;
			countMrr = 0;
			countSignups = 0;
			animateProgress(STAGE_DURATIONS[5]);
			let startTs: number | null = null;
			function counterTick(ts: number) {
				if (!startTs) startTs = ts;
				const t = Math.min((ts - startTs) / 1400, 1);
				const e = easeOutQuart(t);
				countActive = Math.round(2847 * e);
				countMrr = Math.round(12400 * e);
				countSignups = Math.round(143 * e);
				if (t < 1) handles.rafs.push(requestAnimationFrame(counterTick));
			}
			handles.rafs.push(requestAnimationFrame(counterTick));
			later(() => runStage(0), STAGE_DURATIONS[5]);
		}
	}

	onMount(() => {
		runStage(0);
		return () => clearAll();
	});

	// Stage labels
	const LABELS = [
		'📧 Client Request',
		'📋 Requirements',
		'🔌 Salesforce Integration',
		'🧩 StatCard Component',
		'🔧 Assembling Widget',
		'✅ Shipped'
	];
</script>

/* eslint-disable @typescript-eslint/no-unused-vars */
<div class="container">
	<!-- Stage 0: Client Request -->
	<div class="stage" class:active={stage === 0}>
		<div class="stage-inner center-col">
			<div class="stage-label">{LABELS[0]}</div>
			<div class="chat-window">
				<div class="chat-msg">
					<div class="avatar">C</div>
					<div class="bubble">
						All our data lives in <strong>Salesforce</strong>. Can you pull active users, MRR, and
						new signups into the website dashboard?
					</div>
				</div>
				<div class="chat-msg dev delay-in">
					<div class="bubble dev-bubble">
						Sure — I'll build a Salesforce integration, a reusable StatCard, then wire it all
						together. 👍
					</div>
					<div class="avatar dev-avatar">D</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Stage 1: Requirements -->
	<div class="stage" class:active={stage === 1}>
		<div class="stage-inner center-col">
			<div class="stage-label">{LABELS[1]}</div>
			<div class="req-card">
				<div class="req-title">UserStats — Scope</div>
				<ul class="req-list">
					{#each REQS as req, i (i)}
						<li class="req-item" class:visible={reqItems > i}>
							<span class="checkbox">{reqItems > i ? '✓' : '○'}</span>
							{req}
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Stages 2, 3, 4: Code editor (shared layout) -->
	{#each [2, 3, 4] as s (s)}
		<div class="stage" class:active={stage === s}>
			<div class="stage-inner editor-layout">
				<div class="editor-pane">
					<div class="editor-titlebar">
						<div class="editor-dot red"></div>
						<div class="editor-dot yellow"></div>
						<div class="editor-dot green"></div>
						<span class="editor-title">VS Code</span>
					</div>
					<div class="editor-tabs">
						<div class="tab" class:active-tab={s === 2}>useSalesforceStats.ts</div>
						<div class="tab" class:active-tab={s === 3}>StatCard.tsx</div>
						<div class="tab" class:active-tab={s === 4}>UserStats.tsx</div>
					</div>
					<div class="editor-body">
						<div class="line-numbers">
							{#each Array(lineCount) as _ln, i (i)}
								<div class="line-num">{i + 1}</div>
							{/each}
						</div>
						<pre class="code-area"><code>{@html highlightedCode}<span class="cursor">▋</span></code></pre>
					</div>
				</div>
				{#if s === 4}
					<div class="preview-pane">
						<div class="preview-header">Preview</div>
						{#if !showPreview}
							<div class="spinner-wrap">
								<div class="spinner"></div>
								<div class="spinner-label">Compiling…</div>
							</div>
						{:else}
							<div class="mini-widget fadein">
								<div class="mini-header">UserStats</div>
								<div class="mini-cards">
									{#each ['Active Users', 'MRR', 'Signups'] as lbl (lbl)}
										<div class="mini-card">
											<div class="mini-val">—</div>
											<div class="mini-key">{lbl}</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	{/each}

	<!-- Stage 5: Result -->
	<div class="stage" class:active={stage === 5}>
		<div class="stage-inner center-col">
			<div class="stage-label">{LABELS[5]}</div>
			<div class="result-widget">
				<div class="result-header">
					<span class="result-title">UserStats</span>
					<span class="live-dot"><span class="dot-pulse"></span>Live</span>
				</div>
				<div class="result-cards">
					<div class="stat-card">
						<div class="stat-val">{formatNumber(countActive)}</div>
						<div class="stat-label">Active Users</div>
						<div class="stat-trend">▲ +12% this week</div>
					</div>
					<div class="stat-card">
						<div class="stat-val">${formatNumber(countMrr)}</div>
						<div class="stat-label">MRR</div>
						<div class="stat-trend">▲ +8.3%</div>
					</div>
					<div class="stat-card">
						<div class="stat-val">{formatNumber(countSignups)}</div>
						<div class="stat-label">New Signups</div>
						<div class="stat-trend">▲ +23%</div>
					</div>
				</div>
				<div class="result-footer">
					<span class="file-badge">useSalesforceStats.ts</span>
					<span class="file-badge">StatCard.tsx</span>
					<span class="file-badge">UserStats.tsx</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Stage indicator -->
	<div class="stage-dots">
		{#each { length: LABELS.length } as _label, i (i)}
			<div class="dot" class:dot-active={stage === i}></div>
		{/each}
	</div>

	<!-- Progress bar -->
	<div class="progress-track">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>
</div>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	:global(html, body) {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #1e1e2e;
		font-family:
			'Segoe UI',
			system-ui,
			-apple-system,
			sans-serif;
		color: #cdd6f4;
	}
	:global(button[aria-label*='Switch to']) {
		display: none !important;
	}

	.container {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: #1e1e2e;
		overflow: hidden;
	}

	/* ── Stages ── */
	.stage {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 0.45s ease;
		pointer-events: none;
	}
	.stage.active {
		opacity: 1;
		pointer-events: auto;
	}

	.stage-inner {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20px 28px 40px;
	}
	.center-col {
		align-items: center;
		justify-content: center;
	}

	.stage-label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #6495ed;
		margin-bottom: 18px;
		opacity: 0.9;
	}

	/* ── Stage 0: Chat ── */
	.chat-window {
		width: 100%;
		max-width: 580px;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.chat-msg {
		display: flex;
		align-items: flex-end;
		gap: 10px;
		animation: fadeUp 0.4s ease forwards;
	}
	.chat-msg.delay-in {
		opacity: 0;
		animation: fadeUp 0.4s ease 2s forwards;
	}
	.chat-msg.dev {
		flex-direction: row-reverse;
	}
	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #313244;
		border: 2px solid #45475a;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
		flex-shrink: 0;
	}
	.dev-avatar {
		background: #6495ed1a;
		border-color: #6495ed55;
		color: #6495ed;
	}
	.bubble {
		background: #313244;
		border: 1px solid #45475a;
		border-radius: 14px 14px 14px 4px;
		padding: 11px 15px;
		font-size: 14px;
		line-height: 1.55;
		max-width: 440px;
		color: #e0e4f4;
	}
	.bubble strong {
		color: #89b4fa;
	}
	.dev-bubble {
		background: #6495ed18;
		border-color: #6495ed44;
		border-radius: 14px 14px 4px 14px;
		color: #e0e4f4;
	}

	/* ── Stage 1: Requirements ── */
	.req-card {
		background: #313244;
		border: 1px solid #45475a;
		border-radius: 12px;
		padding: 22px 26px;
		width: 100%;
		max-width: 520px;
	}
	.req-title {
		font-size: 14px;
		font-weight: 700;
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid #45475a;
		color: #e0e4f4;
	}
	.req-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 11px;
	}
	.req-item {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13px;
		color: #585b70;
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease,
			color 0.3s ease;
	}
	.req-item.visible {
		opacity: 1;
		transform: translateX(0);
		color: #cdd6f4;
	}
	.checkbox {
		font-size: 14px;
		width: 20px;
		color: #6495ed;
		font-weight: 700;
	}

	/* ── Stages 2-4: Editor ── */
	.editor-layout {
		flex-direction: row;
		gap: 0;
		padding: 0;
		align-items: stretch;
	}
	.editor-pane {
		flex: 1.5;
		display: flex;
		flex-direction: column;
		border-right: 1px solid #181825;
		overflow: hidden;
	}
	.editor-titlebar {
		background: #11111b;
		padding: 7px 12px;
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.editor-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.editor-dot.red {
		background: #f38ba8;
	}
	.editor-dot.yellow {
		background: #f9e2af;
	}
	.editor-dot.green {
		background: #a6e3a1;
	}
	.editor-title {
		font-size: 11px;
		color: #585b70;
		margin-left: 8px;
		font-family: 'Segoe UI', system-ui, sans-serif;
	}
	.editor-tabs {
		background: #181825;
		display: flex;
		border-bottom: 1px solid #11111b;
	}
	.tab {
		padding: 7px 14px;
		font-size: 12px;
		color: #585b70;
		cursor: default;
		border-right: 1px solid #11111b;
		font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
		transition:
			color 0.2s,
			background 0.2s;
	}
	.tab.active-tab {
		color: #cdd6f4;
		background: #1e1e2e;
		border-bottom: 2px solid #6495ed;
	}
	.editor-body {
		flex: 1;
		display: flex;
		overflow: auto;
		background: #1e1e2e;
		padding: 10px 0;
	}
	.line-numbers {
		padding: 0 10px 0 14px;
		display: flex;
		flex-direction: column;
		user-select: none;
		flex-shrink: 0;
	}
	.line-num {
		font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
		font-size: 12px;
		line-height: 1.65;
		color: #45475a;
		text-align: right;
	}
	.code-area {
		flex: 1;
		font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
		font-size: 12px;
		line-height: 1.65;
		color: #cdd6f4;
		white-space: pre;
		padding-right: 14px;
		overflow: visible;
	}
	.cursor {
		display: inline;
		color: #6495ed;
		animation: blink 1s step-end infinite;
	}
	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	/* Syntax colors */
	:global(.hl-kw) {
		color: #cba6f7;
	}
	:global(.hl-type) {
		color: #f9e2af;
	}
	:global(.hl-fn) {
		color: #89b4fa;
	}
	:global(.hl-fn2) {
		color: #89dceb;
	}
	:global(.hl-jsx) {
		color: #f38ba8;
	}
	:global(.hl-tag) {
		color: #f38ba8;
	}
	:global(.hl-attr) {
		color: #89dceb;
	}
	:global(.hl-cm) {
		color: #585b70;
		font-style: italic;
	}

	/* Preview pane (stage 4 only) */
	.preview-pane {
		flex: 0 0 240px;
		display: flex;
		flex-direction: column;
		background: #181825;
	}
	.preview-header {
		padding: 7px 14px;
		font-size: 12px;
		color: #585b70;
		border-bottom: 1px solid #11111b;
		font-family: 'Cascadia Code', 'Fira Code', monospace;
	}
	.spinner-wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.spinner {
		width: 28px;
		height: 28px;
		border: 3px solid #313244;
		border-top-color: #6495ed;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	.spinner-label {
		font-size: 11px;
		color: #585b70;
	}
	.mini-widget {
		padding: 14px;
	}
	.mini-header {
		font-size: 12px;
		font-weight: 700;
		color: #6495ed;
		margin-bottom: 10px;
	}
	.mini-cards {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.mini-card {
		background: #313244;
		border-radius: 6px;
		padding: 8px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.mini-val {
		font-size: 16px;
		font-weight: 700;
	}
	.mini-key {
		font-size: 10px;
		color: #585b70;
	}

	/* ── Stage 5: Result ── */
	.result-widget {
		background: #313244;
		border: 1px solid #45475a;
		border-radius: 14px;
		padding: 22px 26px;
		width: 100%;
		max-width: 620px;
		box-shadow: 0 8px 32px #00000050;
	}
	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 18px;
		padding-bottom: 12px;
		border-bottom: 1px solid #45475a;
	}
	.result-title {
		font-size: 15px;
		font-weight: 700;
	}
	.live-dot {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: #a6e3a1;
	}
	.dot-pulse {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #a6e3a1;
		animation: pulse 2s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.85);
		}
	}
	.result-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
	.stat-card {
		background: #1e1e2e;
		border: 1px solid #45475a;
		border-radius: 10px;
		padding: 14px 12px;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.stat-val {
		font-size: 24px;
		font-weight: 800;
		line-height: 1;
		color: #cdd6f4;
		font-variant-numeric: tabular-nums;
	}
	.stat-label {
		font-size: 11px;
		color: #585b70;
		margin-top: 3px;
	}
	.stat-trend {
		font-size: 11px;
		color: #a6e3a1;
		font-weight: 600;
		margin-top: 5px;
	}
	.result-footer {
		display: flex;
		gap: 8px;
		margin-top: 16px;
		padding-top: 12px;
		border-top: 1px solid #45475a;
	}
	.file-badge {
		font-size: 11px;
		background: #1e1e2e;
		border: 1px solid #45475a;
		border-radius: 4px;
		padding: 2px 8px;
		color: #6495ed;
		font-family: 'Cascadia Code', 'Fira Code', monospace;
	}

	/* ── Stage dots ── */
	.stage-dots {
		position: absolute;
		bottom: 16px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 6px;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #45475a;
		transition: background 0.3s;
	}
	.dot.dot-active {
		background: #6495ed;
	}

	/* ── Progress bar ── */
	.progress-track {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: #313244;
	}
	.progress-fill {
		height: 100%;
		background: #6495ed;
		transition: width 0.1s linear;
	}

	/* ── Animations ── */
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.fadein {
		animation: fadeUp 0.35s ease forwards;
	}
</style>
