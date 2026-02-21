<script lang="ts">
	const manifestPoints = [
		'Performance and accessibility first. No decorative JS at the cost of core content.',
		'Data-driven UI: content and config live outside components. Components render; they do not own copy.',
		'Strict typography and layout rules (e.g. blueprint) applied via design tokens. No one-off styling.',
		'Runes and reactive primitives over ad-hoc lifecycle. Clear data flow, testable logic.',
	];

	const logEntries = [
		{ period: '2024–', role: 'Senior Engineer', org: 'Current', spec: 'Web systems, tooling, architecture' },
		{ period: '2021–2024', role: 'Software Engineer', org: 'Previous', spec: 'Frontend, design systems, A11Y' },
		{ period: '2019–2021', role: 'Developer', org: 'Earlier', spec: 'Full-stack, APIs, delivery' },
	];
</script>

<div class="about-sheet">
	<section class="block block-manifest" aria-labelledby="manifest-heading">
		<span class="corner-tl">M1</span>
		<span class="corner-br">MANIFEST</span>
		<div class="block-inner">
			<h2 id="manifest-heading">ENGINEERING_MANIFEST</h2>
			<p class="block-desc">Approach to code and delivery.</p>
			<ul class="manifest-list">
				{#each manifestPoints as point}
					<li>{point}</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="block block-log" aria-labelledby="log-heading">
		<span class="corner-tl">L1</span>
		<span class="corner-br">LOG</span>
		<div class="block-inner">
			<h2 id="log-heading">PROFESSIONAL_LOG</h2>
			<p class="block-desc">Timeline of experience.</p>
			<table class="log-table" aria-label="Professional log">
				<thead>
					<tr>
						<th>PERIOD</th>
						<th>ROLE</th>
						<th>ORG</th>
						<th>SPEC</th>
					</tr>
				</thead>
				<tbody>
					{#each logEntries as entry}
						<tr>
							<td>{entry.period}</td>
							<td>{entry.role}</td>
							<td>{entry.org}</td>
							<td>{entry.spec}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

<style>
	.about-sheet {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.block {
		position: relative;
		border: 1px solid var(--blueprint-border);
		background: var(--blueprint-surface);
		padding: 1.25rem 1.25rem 1.5rem;
	}

	.block::before,
	.block::after {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border: 1px solid var(--blueprint-border);
		background: var(--blueprint-surface-corner);
	}

	.block::before {
		top: -1px;
		left: 10px;
		border-right: none;
		border-bottom: none;
	}

	.block::after {
		top: -1px;
		right: 10px;
		border-left: none;
		border-bottom: none;
	}

	.corner-tl,
	.corner-br {
		position: absolute;
		font-size: 0.65rem;
		font-weight: 400;
		letter-spacing: 0.08em;
		color: var(--blueprint-text-muted);
	}

	.corner-tl {
		top: 0.4rem;
		left: 0.6rem;
	}

	.corner-br {
		bottom: 0.4rem;
		right: 0.6rem;
	}

	.block-inner {
		position: relative;
	}

	.block h2 {
		font-family: 'JetBrains Mono', 'Courier New', monospace;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin: 0 0 0.5rem 0;
		color: var(--blueprint-text-secondary);
		border-bottom: 1px solid var(--blueprint-border-light);
		padding-bottom: 0.4rem;
	}

	.block-desc {
		font-size: 0.75rem;
		color: var(--blueprint-text-muted);
		margin: 0 0 0.75rem 0;
		letter-spacing: 0.04em;
	}

	.manifest-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.manifest-list li {
		font-size: 0.85rem;
		line-height: 1.6;
		color: var(--blueprint-text);
		letter-spacing: 0.02em;
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--blueprint-border-light);
	}

	.manifest-list li:last-child {
		border-bottom: none;
	}

	.log-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.7rem;
		letter-spacing: 0.04em;
		margin: 0;
	}

	.log-table th,
	.log-table td {
		padding: 0.4rem 0.75rem 0.4rem 0;
		text-align: left;
		border-bottom: 1px solid var(--blueprint-border-light);
	}

	.log-table thead th {
		font-weight: 500;
		letter-spacing: 0.1em;
		color: var(--blueprint-text-secondary);
	}

	.log-table tbody td {
		color: var(--blueprint-text);
	}

	.log-table tbody tr:last-child td {
		border-bottom: none;
	}
</style>
