"""Genere la voix off francaise de la video de presentation (edge-tts)."""
import asyncio
import json
from pathlib import Path

import edge_tts

SORTIE = Path(__file__).resolve().parent / "build"
SORTIE.mkdir(exist_ok=True)

VOIX = "fr-FR-DeniseNeural"
DEBIT = "-4%"   # un peu posee
HAUTEUR = "+0Hz"

SCENES = [
    ("01-intro",
     "Elykia. Une fondation humanitaire née à Pointe-Noire, en République du Congo. "
     "Son nom signifie espoir.",
     "Elykia", "Une famille pour ceux qui en ont besoin"),

    ("02-accueil",
     "Son site officiel est en ligne. Neuf pages pour tout dire de la fondation : "
     "qui elle est, ce qu'elle fait, et comment l'aider.",
     "Le site officiel", "Neuf pages, une seule mission"),

    ("03-apropos",
     "À propos : l'histoire, la vision, la mission. Et le bureau qui la porte, "
     "neuf bénévoles engagés autour de la présidente.",
     "À propos", "Histoire, vision, mission et équipe"),

    ("04-programmes",
     "Quatre programmes : l'éducation, l'aide humanitaire, l'action sociale, "
     "et l'autonomisation des communautés.",
     "Nos programmes", "Éducation · Humanitaire · Social · Autonomisation"),

    ("05-realisations",
     "Les réalisations : les actions déjà menées, en photos, en chiffres et en bilans.",
     "Nos réalisations", "Actions, photos et bilans"),

    ("06-evenements",
     "Les événements : le concert évangélique de Dan Carel, le dimanche vingt-deux novembre "
     "deux mille vingt-six à quatorze heures trente, à l'église Nazareth. "
     "Puis la Grande Célébration, en deux mille vingt-sept.",
     "Nos événements", "22 novembre 2026 · Église Nazareth"),

    ("07-partenaires",
     "Pour les entreprises : quatre formules de partenariat, des besoins chiffrés, "
     "et un dossier de sponsoring envoyé sur demande.",
     "Devenir partenaire", "Bronze · Argent · Or · Platine"),

    ("08-transparence",
     "La transparence : documents officiels, rapports d'activité et bilans financiers, "
     "accessibles à tous.",
     "Transparence", "Rendre des comptes, toujours"),

    ("09-don",
     "Faire un don prend une minute : WhatsApp, Mobile Money ou virement. "
     "Chaque geste devient un kit scolaire, un repas, une famille soutenue.",
     "Faire un don", "WhatsApp · Mobile Money · Virement"),

    ("10-outro",
     "Elykia. Une famille pour ceux qui en ont besoin. Rejoignez-nous.",
     "Rejoignez-nous", "elykia.org · +242 06 829 3933"),
]


async def principal():
    fiche = []
    for nom, texte, titre, sous_titre in SCENES:
        chemin = SORTIE / f"{nom}.mp3"
        tts = edge_tts.Communicate(texte, VOIX, rate=DEBIT, pitch=HAUTEUR)
        await tts.save(str(chemin))
        print(nom, ":", chemin.stat().st_size, "octets")
        fiche.append({"nom": nom, "titre": titre, "sous_titre": sous_titre,
                      "audio": chemin.name, "texte": texte})

    (SORTIE / "scenes.json").write_text(
        json.dumps(fiche, ensure_ascii=False, indent=2), encoding="utf-8")
    print("\nscenes.json ecrit —", len(fiche), "scenes")


asyncio.run(principal())
