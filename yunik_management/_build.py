"""_src/*.html 의 {{HEAD}} {{HEADER}} {{FOOTER}} 를 _partials.html 로 치환해 루트에 출력."""
import re, os, glob
root = os.path.dirname(os.path.abspath(__file__))
p = open(os.path.join(root, "_partials.html"), encoding="utf-8").read()
def block(name):
    m = re.search(rf"<!-- ===== {name}.*?-->\n(.*?)(?=\n<!-- =====|\Z)", p, re.S)
    return m.group(1).strip()
parts = {"HEAD": block("HEAD"), "HEADER": block("HEADER"), "FOOTER": block("FOOTER")}
for src in glob.glob(os.path.join(root, "_src", "*.html")):
    html = open(src, encoding="utf-8").read()
    for k, v in parts.items():
        html = html.replace("{{" + k + "}}", v)
    out = os.path.join(root, os.path.basename(src))
    open(out, "w", encoding="utf-8").write(html)
    print("built", os.path.basename(out))
