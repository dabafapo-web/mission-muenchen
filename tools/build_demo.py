from pathlib import Path
import re
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
for name in ['data.js','engine.js','map.js','quiz.js']:
    # Inline scripts at the end of the body so the DOM exists (defer is ignored inline).
    html=html.replace(f'<script defer src="{name}"></script>','')
    code=(root/name).read_text().replace('</script','<\\/script')
    html=html.replace('</body>',f'<script>{code}</script></body>')
html=html.replace('href="index.html"','href="#"')
(root/'demo.html').write_text(html)
print(root/'demo.html')
