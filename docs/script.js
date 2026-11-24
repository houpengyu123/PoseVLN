const benchmarks = {
  r2r: { name: 'R2R-CE', metric: 'OS ↑', rows: [
    ['NaVILA',5.22,62.5,54.0,49.0],['StreamVLN',4.98,64.2,56.9,51.9],['IDEAL-VLN',4.62,64.9,59.8,52.9],['JanusVLN',4.78,65.2,60.5,56.8],['LatentPilot',4.41,66.3,62.0,58.0],['PoseVLN',4.01,69.4,64.6,59.4]
  ], insight: 'PoseVLN achieves <strong>64.6% SR</strong> and <strong>59.4% SPL</strong>, improving over its StreamVLN backbone by <strong>7.7</strong> and <strong>7.5</strong> percentage points, respectively.' },
  rxr: { name: 'RxR-CE', metric: 'nDTW ↑', rows: [
    ['NaVILA',6.77,58.8,49.3,44.0],['StreamVLN',6.22,61.9,52.9,46.0],['IDEAL-VLN',5.23,64.5,59.1,50.7],['JanusVLN',6.06,62.1,56.2,47.5],['LatentPilot',5.19,67.5,58.2,49.9],['PoseVLN',4.76,70.5,62.0,53.5]
  ], insight: 'PoseVLN achieves <strong>62.0% SR</strong>, <strong>53.5% SPL</strong>, and <strong>70.5 nDTW</strong>, improving SR over StreamVLN by <strong>9.1 percentage points</strong>.' }
};
const tabs = [...document.querySelectorAll('[data-dataset]')];
function selectBenchmark(key) {
  const data = benchmarks[key];
  tabs.forEach(tab => { const active = tab.dataset.dataset === key; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
  document.querySelector('#results').setAttribute('aria-labelledby', 'tab-' + key);
  document.querySelector('caption').textContent = data.name + ' Val-Unseen results for single-RGB methods';
  document.querySelector('#metric-two').textContent = data.metric;
  document.querySelector('#results-body').innerHTML = data.rows.map(row => '<tr' + (row[0] === 'PoseVLN' ? ' class="ours"' : '') + '><td>' + row[0] + (row[0] === 'PoseVLN' ? '<span>OURS</span>' : '') + '</td>' + row.slice(1).map((value,index) => '<td>' + value.toFixed(index === 0 ? 2 : 1) + '</td>').join('') + '</tr>').join('');
  document.querySelector('#result-insight').innerHTML = data.insight;
}
tabs.forEach((tab,index) => { tab.addEventListener('click', () => selectBenchmark(tab.dataset.dataset)); tab.addEventListener('keydown', event => { if (['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length-1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; selectBenchmark(tabs[next].dataset.dataset); tabs[next].focus(); } }); });
selectBenchmark('r2r');
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click', () => { const image = button.querySelector('img'); const target = document.querySelector('#dialog-image'); target.src = image.src; target.alt = image.alt; dialog.showModal(); }));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
