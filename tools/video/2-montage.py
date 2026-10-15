"""Monte la video de presentation d'Elykia.

   Enchaine trois etapes :
     1. capture des visuels (Chrome, 1920x1080)
     2. fabrication des bandeaux de titre (PNG transparents)
     3. assemblage : mouvement d'image, fondus, voix off

   Prerequis : avoir lance 1-narration.py (voix off + build/scenes.json),
   ffmpeg et Google Chrome installes.

   Usage :  python tools/video/2-montage.py
"""
import json
import subprocess
import sys
import urllib.parse
from pathlib import Path

ICI = Path(__file__).resolve().parent          # tools/video
SITE = ICI.parent.parent                       # racine du site
BUILD = ICI / "build"
IMG = BUILD / "img"
OVL = BUILD / "ovl"
CLIPS = BUILD / "clips"
for d in (IMG, OVL, CLIPS):
    d.mkdir(parents=True, exist_ok=True)

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
FPS = 30
SORTIE = SITE / "media" / "elykia-presentation.mp4"

# Visuel de chaque scene : page du site, ancre et decalage vertical
VISUELS = {
    "01-intro":        ("slide", ""),
    "02-accueil":      ("page",  "index.html"),
    "03-apropos":      ("page",  "a-propos.html#equipe"),
    "04-programmes":   ("page",  "programmes.html#education"),
    "05-realisations": ("page",  "realisations.html#photos&dy=320"),
    "06-evenements":   ("page",  "evenements.html#concert"),
    "07-partenaires":  ("page",  "partenaires.html#formules-title"),
    "08-transparence": ("page",  "transparence.html#documents"),
    "09-don":          ("page",  "don.html#impact-don"),
    "10-outro":        ("slide", "t=Rejoignez-nous&s=Elykia — Pointe-Noire, République du Congo&i=+242 06 829 3933"),
}


def lancer(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(" ".join(str(c) for c in cmd[:6]), "…")
        print(r.stderr[-1500:])
        sys.exit("echec de la commande")


def chrome(url, sortie, transparent=False, attente=9000):
    cmd = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
           "--allow-file-access-from-files",
           "--user-data-dir=" + str(BUILD / ("u-" + sortie.stem)),
           "--virtual-time-budget=" + str(attente),
           "--window-size=1920,1080",
           "--screenshot=" + str(sortie)]
    if transparent:
        cmd.insert(1, "--default-background-color=00000000")
    lancer(cmd + [url])


def fichier_url(chemin):
    return "file:///" + str(chemin).replace("\\", "/")


def duree(fichier):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                          "format=duration", "-of", "csv=p=0", str(fichier)],
                         capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


scenes = json.loads((BUILD / "scenes.json").read_text(encoding="utf-8"))

# ------------------------------------------------ 1. Visuels
for sc in scenes:
    image = IMG / f"{sc['nom']}.png"
    if image.exists():
        print("visuel", sc["nom"], ": deja present")
        continue

    genre, cible = VISUELS[sc["nom"]]
    if genre == "slide":
        url = fichier_url(ICI / "slide.html") + ("?" + urllib.parse.quote(cible, safe="=&+—·") if cible else "")
    else:
        url = fichier_url(ICI / "capture.html") + "?p=" + urllib.parse.quote(cible, safe="&=")

    chrome(url, image, attente=14000)
    print("visuel", sc["nom"], ":", image.stat().st_size, "octets")

# ------------------------------------------------ 2. Bandeaux de titre
for sc in scenes:
    if sc["nom"].startswith(("01", "10")):      # intro et fin : deja titrees
        continue
    bandeau = OVL / f"{sc['nom']}.png"
    url = (fichier_url(ICI / "lower-third.html") +
           "?t=" + urllib.parse.quote(sc["titre"]) +
           "&s=" + urllib.parse.quote(sc["sous_titre"]))
    chrome(url, bandeau, transparent=True, attente=6000)
    print("bandeau", sc["nom"], ":", bandeau.stat().st_size, "octets")

# ------------------------------------------------ 3. Clips
lignes = []
for i, sc in enumerate(scenes):
    audio = BUILD / sc["audio"]
    image = IMG / f"{sc['nom']}.png"
    bandeau = OVL / f"{sc['nom']}.png"
    clip = CLIPS / f"{sc['nom']}.mp4"

    d = round(duree(audio) + 1.5, 2)      # 0,5 s avant la voix, 1 s apres
    images = int(d * FPS)

    # Mouvement lent, alterne : zoom avant / zoom arriere
    z = "min(1.0+0.00055*on,1.09)" if i % 2 == 0 else "max(1.09-0.00055*on,1.0)"

    chaine = (f"[0:v]scale=2880:1620:flags=lanczos,"
              f"zoompan=z='{z}':d={images}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':"
              f"s=1920x1080:fps={FPS}[bg];")

    entrees = ["-loop", "1", "-framerate", str(FPS), "-i", str(image)]

    if bandeau.exists():
        # Image bouclee, sinon le fondu alpha ne s-applique qu-a la 1re image
        entrees += ["-loop", "1", "-framerate", str(FPS), "-i", str(bandeau)]
        chaine += (f"[1:v]format=rgba,fade=in:st=0.5:d=0.6:alpha=1,"
                   f"fade=out:st={d-1.1:.2f}:d=0.6:alpha=1[ov];"
                   f"[bg][ov]overlay=0:0:format=auto[v0];")
        piste_audio = 2
    else:
        chaine += "[bg]null[v0];"
        piste_audio = 1

    chaine += (f"[v0]fade=in:st=0:d=0.5,fade=out:st={d-0.6:.2f}:d=0.6,format=yuv420p[v];"
               f"[{piste_audio}:a]adelay=500|500,apad=whole_dur={d},atrim=0:{d},"
               f"afade=t=in:st=0:d=0.3,afade=t=out:st={d-0.5:.2f}:d=0.5[a]")

    lancer(["ffmpeg", "-y", "-v", "error", *entrees, "-i", str(audio),
            "-filter_complex", chaine, "-map", "[v]", "-map", "[a]",
            "-c:v", "libx264", "-preset", "medium", "-crf", "19",
            "-pix_fmt", "yuv420p", "-r", str(FPS),
            "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
            "-t", str(d), str(clip)])
    print(f"clip {sc['nom']} : {d:.2f}s")
    lignes.append(f"file '{clip.as_posix()}'")

liste = BUILD / "liste.txt"
liste.write_text("\n".join(lignes) + "\n", encoding="utf-8")

# ------------------------------------------------ 4. Assemblage + niveau sonore
brut = BUILD / "brut.mp4"
lancer(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
        "-i", str(liste), "-c", "copy", str(brut)])

SORTIE.parent.mkdir(exist_ok=True)
lancer(["ffmpeg", "-y", "-v", "error", "-i", str(brut),
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,aresample=48000",
        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-ar", "48000",
        "-movflags", "+faststart", str(SORTIE)])

print("\nVIDEO :", SORTIE)
print("duree :", round(duree(SORTIE), 2), "s")
print("poids :", round(SORTIE.stat().st_size / 1024 / 1024, 1), "Mo")
