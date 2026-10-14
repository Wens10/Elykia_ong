"""Genere le feuillage decoratif du hero (assets/images/hero-garden.svg).

   Trois plans de palmes + quelques fleurs, ancres en bas de l'image.
   Tirage aleatoire a graine fixe : le resultat est reproductible.
"""
import math
import random
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "assets" / "images" / "hero-garden.svg"
W, H = 1440, 900
random.seed(7)


def feuille(longueur, largeur):
    """Trace une feuille pointant vers le haut, base en (0,0)."""
    l, w = longueur, largeur / 2
    return (f"M0 0 C{w:.1f} {-l * 0.30:.1f} {w * 0.85:.1f} {-l * 0.72:.1f} 0 {-l:.1f} "
            f"C{-w * 0.85:.1f} {-l * 0.72:.1f} {-w:.1f} {-l * 0.30:.1f} 0 0 Z")


def palme(x, base_y, hauteur, inclinaison, couleur, opacite, n_feuilles):
    """Une tige courbe garnie de feuilles alternees."""
    courbure = inclinaison * hauteur * 0.45
    sommet_x = x + inclinaison * hauteur * 0.55
    sommet_y = base_y - hauteur
    ctrl_x = x + courbure * 0.4
    ctrl_y = base_y - hauteur * 0.55

    parties = [
        f'<path d="M{x:.0f} {base_y:.0f} Q{ctrl_x:.0f} {ctrl_y:.0f} {sommet_x:.0f} {sommet_y:.0f}" '
        f'fill="none" stroke="{couleur}" stroke-width="{max(2, hauteur * 0.012):.1f}" '
        f'stroke-linecap="round" opacity="{opacite:.2f}"/>'
    ]

    for i in range(n_feuilles):
        t = 0.22 + 0.78 * (i / max(1, n_feuilles - 1))
        # point sur la courbe de Bezier quadratique
        px = (1 - t) ** 2 * x + 2 * (1 - t) * t * ctrl_x + t ** 2 * sommet_x
        py = (1 - t) ** 2 * base_y + 2 * (1 - t) * t * ctrl_y + t ** 2 * sommet_y

        cote = -1 if i % 2 else 1
        angle = cote * (58 - 26 * t) + inclinaison * 22
        longueur = hauteur * (0.40 - 0.16 * t) * random.uniform(0.85, 1.15)
        largeur = longueur * random.uniform(0.30, 0.42)

        parties.append(
            f'<path d="{feuille(longueur, largeur)}" fill="{couleur}" opacity="{opacite:.2f}" '
            f'transform="translate({px:.0f} {py:.0f}) rotate({angle:.0f})"/>'
        )

    # feuille terminale
    longueur = hauteur * 0.26
    parties.append(
        f'<path d="{feuille(longueur, longueur * 0.34)}" fill="{couleur}" opacity="{opacite:.2f}" '
        f'transform="translate({sommet_x:.0f} {sommet_y:.0f}) rotate({inclinaison * 26:.0f})"/>'
    )
    return "\n    ".join(parties)


def fleur(x, y, rayon, coeur, petale, opacite):
    petales = []
    for k in range(5):
        a = k * 72
        petales.append(
            f'<ellipse cx="0" cy="{-rayon * 0.78:.1f}" rx="{rayon * 0.62:.1f}" ry="{rayon * 0.80:.1f}" '
            f'fill="{petale}" transform="rotate({a})"/>'
        )
    return (f'<g transform="translate({x:.0f} {y:.0f})" opacity="{opacite:.2f}">\n      '
            + "\n      ".join(petales)
            + f'\n      <circle r="{rayon * 0.45:.1f}" fill="{coeur}"/>\n    </g>')


def plan(n, couleur, opacite, h_min, h_max, marge=90):
    elements = []
    for i in range(n):
        x = -marge + (W + 2 * marge) * (i + random.uniform(0.15, 0.85)) / n
        hauteur = random.uniform(h_min, h_max)
        inclinaison = random.uniform(-0.42, 0.42)
        base_y = H + random.uniform(10, 60)
        elements.append(palme(x, base_y, hauteur, inclinaison, couleur,
                              opacite * random.uniform(0.82, 1.0),
                              random.randint(5, 8)))
    return "\n    ".join(elements)


# --- Lianes suspendues aux angles superieurs ---
def liane(x, longueur, sens, couleur, opacite):
    parties = [
        f'<path d="M{x:.0f} -10 Q{x + sens * 70:.0f} {longueur * 0.45:.0f} '
        f'{x + sens * 30:.0f} {longueur:.0f}" fill="none" stroke="{couleur}" '
        f'stroke-width="3" stroke-linecap="round" opacity="{opacite:.2f}"/>'
    ]
    for i in range(7):
        t = 0.12 + i * 0.13
        px = (1 - t) ** 2 * x + 2 * (1 - t) * t * (x + sens * 70) + t ** 2 * (x + sens * 30)
        py = (1 - t) ** 2 * (-10) + 2 * (1 - t) * t * (longueur * 0.45) + t ** 2 * longueur
        cote = -1 if i % 2 else 1
        lg = 46 * random.uniform(0.75, 1.2)
        parties.append(
            f'<path d="{feuille(lg, lg * 0.46)}" fill="{couleur}" opacity="{opacite:.2f}" '
            f'transform="translate({px:.0f} {py:.0f}) rotate({cote * 115 + sens * 18:.0f})"/>'
        )
    return "\n    ".join(parties)


svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"
     preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
  <!-- Feuillage decoratif du hero Elykia - genere, modifiable a la main -->

  <!-- Lianes suspendues -->
  <g>
    {liane(52, 240, -1, "#2E5A42", 0.38)}
    {liane(1392, 215, 1, "#2E5A42", 0.34)}
  </g>

  <!-- Plan lointain -->
  <g>
    {plan(13, "#1F4030", 0.55, 230, 430)}
  </g>

  <!-- Plan eclaire (lumiere rasante) -->
  <g>
    {plan(7, "#4E8A68", 0.38, 210, 360)}
  </g>

  <!-- Plan median -->
  <g>
    {plan(11, "#2A5540", 0.72, 180, 330)}
  </g>

  <!-- Fleurs -->
  <g>
    {fleur(168, 812, 9, "#B5843E", "#EAD9B0", 0.70)}
    {fleur(1286, 846, 8, "#B5843E", "#EAD9B0", 0.60)}
    {fleur(436, 868, 7, "#EAD9B0", "#F3E6C8", 0.50)}
    {fleur(978, 828, 8, "#B5843E", "#EAD9B0", 0.58)}
    {fleur(640, 880, 7, "#B5843E", "#EAD9B0", 0.45)}
    {fleur(1130, 874, 6, "#EAD9B0", "#F3E6C8", 0.42)}
    {fleur(300, 886, 6, "#B5843E", "#EAD9B0", 0.40)}
  </g>

  <!-- Premier plan -->
  <g>
    {plan(10, "#132B1D", 0.92, 130, 265)}
  </g>
</svg>
'''

OUT.write_text(svg, encoding="utf-8")
print("hero-garden.svg genere :", len(svg), "octets")
